import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { getHealth } from './api/client';

import HomePage from './pages/HomePage';
import DemoPage from './pages/DemoPage';
import BiasAuditPage from './pages/BiasAuditPage';
import DataStewardshipPage from './pages/DataStewardshipPage';
import GovernancePage from './pages/GovernancePage';

function Navigation() {
  const [provider, setProvider] = useState<string>('loading...');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    getHealth().then(res => setProvider(res.provider)).catch(() => setProvider('offline'));
  }, []);

  const links = [
    { path: '/', label: 'Home' },
    { path: '/demo', label: 'Live Demo' },
    { path: '/bias-audit', label: 'Bias Audit' },
    { path: '/data-stewardship', label: 'Data Stewardship' },
    { path: '/governance', label: 'Governance' },
  ];

  return (
    <nav style={{ backgroundColor: 'var(--primary-green)', color: 'white', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="flex justify-between items-center max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4">
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.25rem' }}>
            🦁 Fair Lending Guardian
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)', fontSize: '0.75rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: provider !== 'offline' && provider !== 'loading...' ? '#4ade80' : '#f87171' }} />
            {provider}
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:flex gap-6 items-center" style={{ display: 'flex' }}>
          {links.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              style={{ 
                color: 'white', 
                textDecoration: 'none', 
                opacity: location.pathname === link.path ? 1 : 0.7,
                fontWeight: location.pathname === link.path ? 600 : 400
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="sm:hidden" style={{ display: 'none' }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-4 pt-4 mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {links.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navigation />
        <main className="container" style={{ flex: 1, padding: '32px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/bias-audit" element={<BiasAuditPage />} />
            <Route path="/data-stewardship" element={<DataStewardshipPage />} />
            <Route path="/governance" element={<GovernancePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
