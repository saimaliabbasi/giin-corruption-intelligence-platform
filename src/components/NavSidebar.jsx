import React from 'react';
import {
  Globe, FileText, DollarSign, Share2, Satellite,
  TrendingUp, Folder, Shield, Bell, Search, Settings,
  User, ChevronRight, Activity, AlertTriangle, Zap
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: Globe, badge: null },
  { id: 'contracts', label: 'Contracts', icon: FileText, badge: 3 },
  { id: 'finance', label: 'Finance', icon: DollarSign, badge: 2 },
  { id: 'network', label: 'Network Graph', icon: Share2, badge: null },
  { id: 'satellite', label: 'Satellite Verify', icon: Satellite, badge: 1 },
  { id: 'predictive', label: 'Predictive Risk', icon: TrendingUp, badge: null },
  { id: 'investigations', label: 'Investigations', icon: Folder, badge: 2 },
];

export default function NavSidebar({ activeModule, setActiveModule }) {
  return (
    <nav className="nav-sidebar">
      {/* Logo */}
      <div className="nav-logo">
        <div className="nav-logo-icon">
          <Shield size={18} color="#fff" />
        </div>
        <div className="nav-logo-text">
          <div className="nav-logo-title">GIIN</div>
          <div className="nav-logo-sub">Integrity Intelligence</div>
        </div>
      </div>

      {/* Core Modules */}
      <div className="nav-section">
        <div className="nav-section-label">Core Modules</div>
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`nav-item ${activeModule === item.id ? 'active' : ''}`}
              onClick={() => setActiveModule(item.id)}
            >
              <div className="nav-item-icon">
                <Icon size={16} />
              </div>
              {item.label}
              {item.badge && (
                <span className="nav-item-badge">{item.badge}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Analysis Tools */}
      <div className="nav-section">
        <div className="nav-section-label">Analysis</div>
        <div className="nav-item">
          <div className="nav-item-icon"><Activity size={16} /></div>
          Live Feed
        </div>
        <div className="nav-item">
          <div className="nav-item-icon"><AlertTriangle size={16} /></div>
          Anomaly Log
        </div>
        <div className="nav-item">
          <div className="nav-item-icon"><Zap size={16} /></div>
          AI Engine
        </div>
      </div>

      {/* Bottom */}
      <div className="nav-bottom">
        <div className="nav-item">
          <div className="nav-item-icon"><Settings size={16} /></div>
          Settings
        </div>
        <div className="nav-system-status">
          <div className="status-dot online" />
          <span>AI Engine Online</span>
          <ChevronRight size={10} style={{ marginLeft: 'auto', opacity: 0.4 }} />
        </div>
        <div className="nav-system-status">
          <div className="status-dot processing" />
          <span>Scanning 14 feeds</span>
        </div>
      </div>
    </nav>
  );
}
