import sqlite3
import os
from datetime import datetime

# Ensure the database is always stored in the project root, not the backend folder
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "decisions.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS decisions
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  timestamp TEXT,
                  applicant_name TEXT,
                  loan_amount REAL,
                  credit_score INTEGER,
                  routing_decision TEXT,
                  officer_assigned TEXT,
                  guard_checks_passed INTEGER,
                  dignity_filter_passed INTEGER,
                  provider TEXT)''')
                  
    c.execute("SELECT COUNT(*) FROM decisions")
    if c.fetchone()[0] == 0:
        seed_data = [
            ("2026-06-01 10:00:00", "Grace Achieng", 28000, 88, "ESCALATED", "Sarah", 1, 1, "gemini"),
            ("2026-06-02 11:30:00", "John Kamau", 5000, 92, "APPROVED", "None", 1, 1, "gemini"),
            ("2026-06-03 09:15:00", "Mary Wanjiku", 12000, 95, "APPROVED", "None", 1, 1, "gemini"),
            ("2026-06-04 14:20:00", "Peter Omondi", 40000, 75, "DECLINED", "None", 1, 1, "gemini"),
            ("2026-06-05 08:45:00", "Lucy Njoroge", 8000, 60, "DECLINED", "None", 1, 1, "gemini"),
            ("2026-06-06 16:10:00", "Alice Kinyua", 15000, None, "KILL SWITCH", "Supervisor", 0, 1, "gemini"),
            ("2026-06-07 12:05:00", "David Ochieng", 20000, None, "PROXY BLOCK", "None", 0, 1, "gemini")
        ]
        c.executemany("INSERT INTO decisions (timestamp, applicant_name, loan_amount, credit_score, routing_decision, officer_assigned, guard_checks_passed, dignity_filter_passed, provider) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", seed_data)
        conn.commit()
    conn.close()

def log_decision(application: dict, result: dict):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT INTO decisions (timestamp, applicant_name, loan_amount, credit_score, routing_decision, officer_assigned, guard_checks_passed, dignity_filter_passed, provider) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
              (datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 
               application.get("name"), 
               application.get("loan_amount_kes"), 
               result.get("credit_score"), 
               result.get("routing_decision"), 
               result.get("officer_assigned", "None"), 
               1 if result.get("guard_checks_passed", False) else 0,
               1, # assuming dignity_filter passes if it reaches here and doesn't raise exception
               os.getenv("LLM_PROVIDER", "gemini")))
    conn.commit()
    conn.close()

def get_recent_decisions(limit: int = 20):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM decisions ORDER BY id DESC LIMIT ?", (limit,))
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]
