export interface LoanApplication {
  applicant_name: string;
  age: number;
  occupation: string;
  sub_county: string;
  loan_amount: number;
  loan_purpose: string;
  num_children: number;
  previous_repayment: boolean;
  member_sms?: string;
  language?: string;
}

export interface AgentResult {
  guard_checks_passed: boolean;
  scout_output: string;
  guardian_output: string;
  hunter_output: string;
  routing_decision: 'APPROVED' | 'DECLINED' | 'ESCALATED';
  credit_score?: number;
  officer_assigned?: string;
  briefing_packet: string;
  language: string;
}

export interface GuardCheckResult {
  proxy_block_fired: boolean;
  kill_switch_fired: boolean;
  dignity_filter_fired: boolean;
  unusual_pattern_fired: boolean;
  actions: string[];
  trigger_phrase?: string;
  all_clear: boolean;
}

export interface GraceData {
  name: string;
  age: number;
  occupation: string;
  sub_county: string;
  loan_amount: number;
  loan_purpose: string;
  num_children: number;
  dependant_ages: number[];
  weekly_inflows: number[];
  harvest_months: string[];
  lean_months: string[];
  average_weekly_inflow: number;
}

export interface AuditLogEntry {
  id: number;
  timestamp: string;
  applicant_name: string;
  loan_amount: number;
  credit_score?: number;
  routing_decision: string;
  officer_assigned: string;
  guard_checks_passed: number;
  dignity_filter_passed: number;
  provider: string;
}

export interface CycleMetrics {
  csat: number;
  escalation_rate: number;
  avg_resolution_mins: number;
  dignity_blocks: number;
  top_failure_mode: string;
  fix_deployed: string;
}
