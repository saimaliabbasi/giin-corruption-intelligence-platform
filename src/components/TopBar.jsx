import React, { useState } from 'react';
import { Bell, Search, Settings, ChevronDown, RefreshCw } from 'lucide-react';

const moduleTitles = {
  overview: { label: 'Overview', sub: 'National Intelligence Dashboard' },
  contracts: { label: 'Contracts', sub: 'Procurement Anomaly Detection' },
  finance: { label: 'Finance', sub: 'Financial Flow Intelligence' },
  network: { label: 'Network Graph', sub: 'Entity Relationship Analysis' },
  satellite: { label: 'Satellite Verification', sub: 'Physical Reality vs. Claimed Progress' },
  predictive: { label: 'Predictive Risk', sub: 'AI Corruption Forecasting Engine' },
  investigations: { label: 'Investigations', sub: 'Active Case Management' },
};

export default function TopBar({ activeModule, searchQuery, setSearchQuery }) {
  const current = moduleTitles[activeModule] || moduleTitles.overview;

  return (
    <div className="topbar">
      {/* Breadcrumb */}
      <div className="topbar-breadcrumb">
        GIIN
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span>{current.label}</span>
      </div>

      {/* Subtitle */}
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 8 }}>
        — {current.sub}
      </div>

      {/* Search */}
      <div className="topbar-search">
        <Search size={13} color="var(--text-muted)" />
        <input
          type="text"
          placeholder="Search entities, contracts, transactions..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="topbar-actions">
        {/* Live indicator */}
        <div className="live-indicator" style={{ padding: '0 8px' }}>
          <div className="status-dot online" />
          LIVE
        </div>

        <button className="topbar-btn" title="Refresh data">
          <RefreshCw size={14} />
        </button>

        <button className="topbar-btn has-alert" title="Alerts">
          <Bell size={14} />
        </button>

        <button className="topbar-btn" title="Settings">
          <Settings size={14} />
        </button>

        <div className="topbar-user">
          <div className="user-avatar">KM</div>
          Sr. K. Malik
          <ChevronDown size={10} />
        </div>
      </div>
    </div>
  );
}
