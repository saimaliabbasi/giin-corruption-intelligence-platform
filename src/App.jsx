import React, { useState, useMemo } from 'react';
import {
  Globe, FileText, DollarSign, Share2, Satellite,
  TrendingUp, Folder, Shield, Bell, Search, Settings,
  ChevronRight, Activity, AlertTriangle, Zap, CheckCircle,
  X, ExternalLink, Eye, Filter, ArrowUpRight, Download,
  Layers, AlertOctagon, User, MapPin, Building, CreditCard
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend, LineChart, Line
} from 'recharts';

import NavSidebar from './components/NavSidebar';
import TopBar from './components/TopBar';
import {
  mockAlerts,
  mockContracts,
  mockFinancialFlows,
  mockRiskTimeline,
  mockNetworkNodes,
  mockNetworkEdges,
  mockInvestigations,
  mockPredictions,
  mockSatelliteProjects,
  anomalyTicker
} from './data/mockData';
import './App.css';

export default function App() {
  const [activeModule, setActiveModule] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(mockAlerts[0]);
  const [selectedCaseModal, setSelectedCaseModal] = useState(null);
  const [selectedNode, setSelectedNode] = useState(mockNetworkNodes[0]);

  // Format currency helper
  const formatCurrency = (amount) => {
    if (!amount) return '$0';
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount}`;
  };

  // Filtered contracts
  const filteredContracts = useMemo(() => {
    return mockContracts.filter(c => {
      const matchesSearch = searchQuery === '' || 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.dept.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRisk = riskFilter === 'all' || c.risk === riskFilter;
      return matchesSearch && matchesRisk;
    });
  }, [searchQuery, riskFilter]);

  return (
    <div className="app-shell">
      {/* Navigation Sidebar */}
      <NavSidebar activeModule={activeModule} setActiveModule={setActiveModule} />

      {/* Main Workspace */}
      <div className="main-workspace">
        {/* Top Header Bar */}
        <TopBar
          activeModule={activeModule}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Live Anomaly Ticker */}
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {anomalyTicker.concat(anomalyTicker).map((msg, i) => (
              <span key={i} className="ticker-item">
                {msg}
                <span className="ticker-sep">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Workspace Content Router */}
        <div className="workspace-content">
          <div className="section-wrapper">
            {activeModule === 'overview' && (
              <OverviewModule
                onSelectAlert={setSelectedItem}
                onSelectContract={setSelectedItem}
                formatCurrency={formatCurrency}
              />
            )}

            {activeModule === 'contracts' && (
              <ContractsModule
                contracts={filteredContracts}
                riskFilter={riskFilter}
                setRiskFilter={setRiskFilter}
                formatCurrency={formatCurrency}
                onSelectContract={setSelectedItem}
              />
            )}

            {activeModule === 'finance' && (
              <FinanceModule
                financialFlows={mockFinancialFlows}
                formatCurrency={formatCurrency}
                onSelectAlert={setSelectedItem}
              />
            )}

            {activeModule === 'network' && (
              <NetworkModule
                nodes={mockNetworkNodes}
                edges={mockNetworkEdges}
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
              />
            )}

            {activeModule === 'satellite' && (
              <SatelliteModule
                projects={mockSatelliteProjects}
                formatCurrency={formatCurrency}
              />
            )}

            {activeModule === 'predictive' && (
              <PredictiveModule
                predictions={mockPredictions}
                timeline={mockRiskTimeline}
              />
            )}

            {activeModule === 'investigations' && (
              <InvestigationsModule
                investigations={mockInvestigations}
                onOpenModal={setSelectedCaseModal}
              />
            )}
          </div>

          {/* Right Inspection & Intelligence Panel */}
          <RightInspectionPanel
            item={selectedItem}
            node={selectedNode}
            activeModule={activeModule}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>

      {/* Investigation Case Detail Modal */}
      {selectedCaseModal && (
        <CaseDetailModal
          caseItem={selectedCaseModal}
          onClose={() => setSelectedCaseModal(null)}
        />
      )}
    </div>
  );
}

/* ============================================================ MODULE: OVERVIEW */
function OverviewModule({ onSelectAlert, onSelectContract, formatCurrency }) {
  return (
    <div className="content-pad" style={{ overflowY: 'auto', height: '100%' }}>
      {/* Top Metrics Cards */}
      <div className="metrics-grid" style={{ padding: 0, marginBottom: 20 }}>
        <div className="metric-card critical">
          <div className="metric-label">Total Flagged Capital</div>
          <div className="metric-value">$472.4M</div>
          <div className="metric-sub">Across 14 public procurement tenders</div>
          <div className="metric-change up">+18.4%</div>
        </div>

        <div className="metric-card high">
          <div className="metric-label">Satellite Discrepancy</div>
          <div className="metric-value">$31.0M</div>
          <div className="metric-sub">Claimed vs satellite verified work</div>
          <div className="metric-change up">Critical</div>
        </div>

        <div className="metric-card medium">
          <div className="metric-label">High-Risk Shell Layer</div>
          <div className="metric-value">12 Nodes</div>
          <div className="metric-sub">Offshore FZC & nested proxies</div>
          <div className="metric-change up">+3 new</div>
        </div>

        <div className="metric-card safe">
          <div className="metric-label">Funds Recovered</div>
          <div className="metric-value">$21.8M</div>
          <div className="metric-sub">Freezed & recovered YTD</div>
          <div className="metric-change down">+12%</div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid-2" style={{ marginBottom: 20 }}>
        {/* Financial Flow Trend Chart */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">12-Month Financial Intelligence Flow ($M)</div>
            <div className="risk-pill high">Flagged vs Recovered</div>
          </div>
          <div style={{ height: 220, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockFinancialFlows}>
                <defs>
                  <linearGradient id="colorFlagged" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--risk-critical)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--risk-critical)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--risk-low)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--risk-low)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="flagged" stroke="var(--risk-critical)" fillOpacity={1} fill="url(#colorFlagged)" name="Flagged ($M)" />
                <Area type="monotone" dataKey="recovered" stroke="var(--risk-low)" fillOpacity={1} fill="url(#colorRec)" name="Recovered ($M)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Trend Timeline */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">National Risk Score Index</div>
            <div className="risk-pill critical">Score: 86/100</div>
          </div>
          <div style={{ height: 220, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockRiskTimeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="score" stroke="var(--accent-primary)" strokeWidth={2.5} dot={{ r: 4, fill: 'var(--accent-primary)' }} name="Risk Score Index" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Critical Anomaly Alerts & Recent Contracts */}
      <div className="grid-2">
        {/* Alerts List */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Priority Intelligence Alerts</div>
            <div className="live-indicator"><div className="status-dot online" /> REALTIME</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {mockAlerts.slice(0, 4).map(alert => (
              <div
                key={alert.id}
                className={`alert-item ${alert.severity}`}
                onClick={() => onSelectAlert(alert)}
              >
                <div className="alert-header">
                  <span className={`alert-badge ${alert.severity}`}>{alert.severity}</span>
                  <span className="alert-time">{alert.time}</span>
                </div>
                <div className="alert-title">{alert.title}</div>
                <div className="alert-desc">{alert.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contracts Table */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">High Risk Procurement Contracts</div>
            <button className="btn btn-ghost" style={{ fontSize: '0.7rem' }}>View All ({mockContracts.length})</button>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Contract</th>
                  <th>Vendor</th>
                  <th>Value</th>
                  <th>Risk Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockContracts.slice(0, 4).map(c => (
                  <tr key={c.id} onClick={() => onSelectContract(c)} style={{ cursor: 'pointer' }}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.id}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{c.title}</div>
                    </td>
                    <td>{c.vendor}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{formatCurrency(c.value)}</td>
                    <td>
                      <span className={`risk-pill ${c.risk}`}>{c.riskScore} / 100</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.68rem', color: c.claimed !== c.actual ? 'var(--risk-critical)' : 'var(--risk-low)' }}>
                        {c.claimed !== c.actual ? `${c.claimed - c.actual}% Discrepancy` : 'Verified'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ MODULE: CONTRACTS */
function ContractsModule({ contracts, riskFilter, setRiskFilter, formatCurrency, onSelectContract }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="section-header">
        <div>
          <div className="section-title">Public Procurement Audit</div>
          <div className="section-subtitle">Real-time tender risk scoring & physical discrepancy monitoring</div>
        </div>
        <div className="section-controls">
          <button className="btn btn-secondary">
            <Download size={14} /> Export Audit Log
          </button>
        </div>
      </div>

      <div className="filter-row">
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Risk Filter:</span>
        {['all', 'critical', 'high', 'medium', 'low'].map(r => (
          <div
            key={r}
            className={`filter-chip ${riskFilter === r ? 'active' : ''}`}
            onClick={() => setRiskFilter(r)}
          >
            {r.toUpperCase()}
          </div>
        ))}
      </div>

      <div className="content-pad" style={{ flex: 1, overflowY: 'auto' }}>
        <div className="card">
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID / Title</th>
                  <th>Department</th>
                  <th>Vendor</th>
                  <th>Contract Value</th>
                  <th>Progress (Claimed vs Actual)</th>
                  <th>Risk Score</th>
                  <th>Flags Identified</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.id}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{c.title}</div>
                    </td>
                    <td>{c.dept}</td>
                    <td style={{ fontWeight: 600 }}>{c.vendor}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-primary)' }}>
                      {formatCurrency(c.value)}
                    </td>
                    <td style={{ width: 180 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', marginBottom: 2 }}>
                        <span>Claimed: {c.claimed}%</span>
                        <span style={{ color: c.claimed !== c.actual ? 'var(--risk-critical)' : 'var(--risk-low)' }}>
                          Actual: {c.actual}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${c.actual}%`,
                            background: c.claimed !== c.actual ? 'var(--risk-critical)' : 'var(--risk-low)'
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <span className={`risk-pill ${c.risk}`}>{c.riskScore}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {c.flags.map((f, i) => (
                          <span key={i} className="entity-tag" style={{ fontSize: '0.62rem' }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '3px 8px', fontSize: '0.68rem' }}
                        onClick={() => onSelectContract(c)}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ MODULE: FINANCE */
function FinanceModule({ financialFlows, formatCurrency, onSelectAlert }) {
  return (
    <div className="content-pad" style={{ overflowY: 'auto', height: '100%' }}>
      <div className="section-header" style={{ padding: '0 0 16px' }}>
        <div>
          <div className="section-title">Financial Flow & Anomaly Intelligence</div>
          <div className="section-subtitle">Automated structuring detection & circular fund flow analysis</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-header">
            <div className="card-title">12 Month Financial Trace ($ Millions)</div>
          </div>
          <div style={{ height: 260, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialFlows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="legitimate" name="Legitimate ($M)" fill="#10b981" />
                <Bar dataKey="flagged" name="Flagged Anomaly ($M)" fill="var(--risk-critical)" />
                <Bar dataKey="recovered" name="Recovered ($M)" fill="var(--accent-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Detected Payment Structuring Patterns</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mockAlerts.filter(a => a.module === 'finance').map(alert => (
              <div
                key={alert.id}
                className={`alert-item ${alert.severity}`}
                onClick={() => onSelectAlert(alert)}
              >
                <div className="alert-header">
                  <span className={`alert-badge ${alert.severity}`}>{alert.severity}</span>
                  <span className="alert-time">{alert.time}</span>
                </div>
                <div className="alert-title">{alert.title}</div>
                <div className="alert-desc">{alert.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ MODULE: NETWORK */
function NetworkModule({ nodes, edges, selectedNode, setSelectedNode }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="section-header">
        <div>
          <div className="section-title">Entity Relationship & Shell Company Network</div>
          <div className="section-subtitle">Interactive node analysis tracing proxy directors & offshore bank accounts</div>
        </div>
      </div>

      <div className="content-pad" style={{ flex: 1, display: 'flex', gap: 12 }}>
        <div className="card graph-container" style={{ flex: 1, position: 'relative' }}>
          <div className="scanning-line" />
          <svg width="100%" height="100%" viewBox="0 0 800 500">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.3)" />
              </marker>
            </defs>

            {/* Render Edges */}
            {edges.map((e, idx) => {
              const fromNode = nodes.find(n => n.id === e.from);
              const toNode = nodes.find(n => n.id === e.to);
              if (!fromNode || !toNode) return null;
              const isSelected = selectedNode && (selectedNode.id === e.from || selectedNode.id === e.to);

              return (
                <g key={idx}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={isSelected ? 'var(--accent-primary)' : 'rgba(255,255,255,0.15)'}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeDasharray={e.type === 'ownership' ? '4 4' : 'none'}
                    markerEnd="url(#arrow)"
                  />
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2 - 4}
                    fill="var(--text-muted)"
                    fontSize="9"
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                  >
                    {e.label}
                  </text>
                </g>
              );
            })}

            {/* Render Nodes */}
            {nodes.map(n => {
              const isSelected = selectedNode && selectedNode.id === n.id;
              let fill = 'var(--accent-primary)';
              if (n.risk === 'critical') fill = 'var(--risk-critical)';
              if (n.risk === 'high') fill = 'var(--risk-high)';
              if (n.risk === 'medium') fill = 'var(--risk-medium)';

              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x}, ${n.y})`}
                  onClick={() => setSelectedNode(n)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    r={isSelected ? 18 : 14}
                    fill="var(--bg-panel)"
                    stroke={fill}
                    strokeWidth={isSelected ? 3 : 2}
                  />
                  <circle r={isSelected ? 6 : 4} fill={fill} />
                  <text
                    y="28"
                    fill="var(--text-primary)"
                    fontSize="10"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    textAnchor="middle"
                    fontFamily="var(--font-main)"
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map Legend */}
          <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 12, background: 'rgba(0,0,0,0.6)', padding: '6px 12px', borderRadius: 6, fontSize: '0.68rem' }}>
            <span style={{ color: 'var(--risk-critical)' }}>● Critical Shell Entity</span>
            <span style={{ color: 'var(--risk-high)' }}>● High Risk Official</span>
            <span style={{ color: 'var(--accent-primary)' }}>● Department</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ MODULE: SATELLITE */
function SatelliteModule({ projects, formatCurrency }) {
  const [selectedProj, setSelectedProj] = useState(projects[0]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="section-header">
        <div>
          <div className="section-title">Satellite Imagery & Radar Verification</div>
          <div className="section-subtitle">Ground truth radar verification vs. claimed construction progress</div>
        </div>
      </div>

      <div className="content-pad" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Project Selector Chips */}
        <div style={{ display: 'flex', gap: 10 }}>
          {projects.map(p => (
            <div
              key={p.id}
              className={`metric-card ${selectedProj.id === p.id ? 'accent' : ''}`}
              style={{ flex: 1, padding: '10px 14px' }}
              onClick={() => setSelectedProj(p)}
            >
              <div className="metric-label">{p.id}</div>
              <div className="metric-value" style={{ fontSize: '1.2rem' }}>{p.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--risk-critical)', marginTop: 4 }}>
                Variance: {p.variance}% (Discrepancy)
              </div>
            </div>
          ))}
        </div>

        {/* Satellite Pane Comparison */}
        <div className="satellite-compare" style={{ flex: 1 }}>
          {/* Claimed View */}
          <div className="satellite-pane">
            <div className="satellite-pane-label">Claimed Physical Progress: {selectedProj.claimed}%</div>
            <div style={{ flex: 1, background: '#0a1424', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyCenter: 'center', padding: 40, textAlign: 'center' }}>
              <Building size={48} color="var(--accent-primary)" style={{ marginBottom: 12 }} />
              <h3 style={{ color: 'var(--text-primary)' }}>Official Claimed Progress</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 8 }}>
                Submitted invoice claims {selectedProj.claimed}% complete on {selectedProj.verifiedDate}.
              </p>
              <div className="risk-pill low" style={{ marginTop: 16 }}>Status: Approved for Disbursement</div>
            </div>
          </div>

          {/* Satellite Radar View */}
          <div className="satellite-pane">
            <div className="satellite-pane-label" style={{ color: 'var(--risk-critical)' }}>
              Satellite Radar Ground Truth: {selectedProj.actual}%
            </div>
            <div style={{ flex: 1, background: '#120508', border: '1px solid var(--risk-critical-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyCenter: 'center', padding: 40, textAlign: 'center' }}>
              <Satellite size={48} color="var(--risk-critical)" style={{ marginBottom: 12 }} />
              <h3 style={{ color: 'var(--risk-critical)' }}>Physical Discrepancy Flagged</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 8 }}>
                Sentinel-2 Optical & SAR Synthetic Aperture Radar detects only {selectedProj.actual}% physical structure present.
              </p>
              <div className="risk-pill critical" style={{ marginTop: 16 }}>Variance: {selectedProj.variance}% ($31.0M Phantom Billing)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ MODULE: PREDICTIVE */
function PredictiveModule({ predictions, timeline }) {
  return (
    <div className="content-pad" style={{ overflowY: 'auto', height: '100%' }}>
      <div className="section-header" style={{ padding: '0 0 16px' }}>
        <div>
          <div className="section-title">AI Predictive Corruption Engine</div>
          <div className="section-subtitle">Forward-looking ML vulnerability scoring & early warning signals</div>
        </div>
      </div>

      <div className="grid-2">
        {/* Prediction Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {predictions.map(pred => (
            <div key={pred.id} className="pred-card">
              <div
                className="pred-risk-bar"
                style={{
                  background: pred.risk === 'critical' ? 'var(--risk-critical)' : 'var(--risk-high)'
                }}
              />
              <div className="pred-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="pred-name">{pred.entity}</span>
                  <span className={`risk-pill ${pred.risk}`}>{pred.timeframe}</span>
                </div>
                <div className="pred-sub" style={{ marginTop: 4 }}>
                  Signal Triggers:
                  <ul style={{ paddingLeft: 16, marginTop: 4 }}>
                    {pred.signals.map((sig, i) => (
                      <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.72rem' }}>{sig}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pred-score" style={{ color: pred.risk === 'critical' ? 'var(--risk-critical)' : 'var(--risk-high)' }}>
                {pred.predictedRisk}
              </div>
            </div>
          ))}
        </div>

        {/* Prediction Risk Trend */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Vulnerability Risk Index Forecast</div>
          </div>
          <div style={{ height: 320, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="score" stroke="var(--risk-critical)" fill="var(--risk-critical-bg)" name="Predicted Vulnerability Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ MODULE: INVESTIGATIONS */
function InvestigationsModule({ investigations, onOpenModal }) {
  return (
    <div className="content-pad" style={{ overflowY: 'auto', height: '100%' }}>
      <div className="section-header" style={{ padding: '0 0 16px' }}>
        <div>
          <div className="section-title">Active Case & Investigation Management</div>
          <div className="section-subtitle">Multi-jurisdictional evidence logs & prosecutor case files</div>
        </div>
        <button className="btn btn-primary">+ New Case File</button>
      </div>

      <div className="grid-2">
        {investigations.map(inv => (
          <div key={inv.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className={`risk-pill ${inv.priority}`}>{inv.priority}</span>
                <h3 style={{ color: 'var(--text-white)', marginTop: 6, fontSize: '1.05rem' }}>{inv.title}</h3>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Case ID: {inv.id} • Assigned: {inv.assignee}
                </div>
              </div>
              <span className={`risk-pill ${inv.status === 'active' ? 'critical' : 'low'}`}>
                {inv.status.toUpperCase()}
              </span>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {inv.summary}
            </p>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                <span>Investigation Progress</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{inv.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${inv.progress}%`, background: 'var(--accent-primary)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                📁 {inv.evidenceItems} Evidence Items • 🔗 {inv.entities} Network Entities
              </div>
              <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.7rem' }} onClick={() => onOpenModal(inv)}>
                View Case File
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ RIGHT PANEL */
function RightInspectionPanel({ item, node, activeModule, formatCurrency }) {
  return (
    <div className="right-panel">
      <div className="right-panel-header">
        <div className="right-panel-title">Intelligence Inspector</div>
        <div className="live-indicator"><div className="status-dot online" /> ACTIVE</div>
      </div>

      <div className="right-panel-body">
        {activeModule === 'network' && node ? (
          <div className="card">
            <div className="card-header">
              <div className="card-title">Entity Overview</div>
              <span className={`risk-pill ${node.risk}`}>{node.risk}</span>
            </div>
            <h3 style={{ color: 'var(--text-white)', fontSize: '1.1rem', marginBottom: 6 }}>{node.label}</h3>
            <div className="stat-row">
              <span className="stat-label">Entity Type</span>
              <span className="stat-value">{node.type.toUpperCase()}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Flagged Node ID</span>
              <span className="stat-value">NODE-00{node.id}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Network Coordinates</span>
              <span className="stat-value">X:{node.x}, Y:{node.y}</span>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: 14, justifyContent: 'center' }}>
              Subpoena Bank Records
            </button>
          </div>
        ) : item ? (
          <div className="card">
            <div className="card-header">
              <div className="card-title">SelectedItem Detail</div>
              {item.risk && <span className={`risk-pill ${item.risk}`}>{item.risk}</span>}
              {item.severity && <span className={`risk-pill ${item.severity}`}>{item.severity}</span>}
            </div>

            <h3 style={{ color: 'var(--text-white)', fontSize: '1rem', marginBottom: 8 }}>
              {item.title || item.name || item.id}
            </h3>

            {item.desc && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.4 }}>
                {item.desc}
              </p>
            )}

            {item.value && (
              <div className="stat-row">
                <span className="stat-label">Contract Value</span>
                <span className="stat-value" style={{ color: 'var(--accent-primary)' }}>{formatCurrency(item.value)}</span>
              </div>
            )}

            {item.vendor && (
              <div className="stat-row">
                <span className="stat-label">Awarded Vendor</span>
                <span className="stat-value">{item.vendor}</span>
              </div>
            )}

            {item.entities && (
              <div style={{ marginTop: 12 }}>
                <div className="stat-label" style={{ marginBottom: 6 }}>Linked Entities:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {item.entities.map((e, idx) => (
                    <span key={idx} className="entity-tag">{e}</span>
                  ))}
                </div>
              </div>
            )}

            <button className="btn btn-secondary" style={{ width: '100%', marginTop: 14, justifyContent: 'center' }}>
              Generate Full Intelligence Dossier
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 20 }}>
            Select an item or node to inspect intelligence telemetry.
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================ CASE DETAIL MODAL */
function CaseDetailModal({ caseItem, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">{caseItem.title}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Case Docket: {caseItem.id}</div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ marginBottom: 16 }}>
            <h4 style={{ color: 'var(--text-white)', marginBottom: 6 }}>Case Executive Summary</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{caseItem.summary}</p>
          </div>

          <h4 style={{ color: 'var(--text-white)', marginBottom: 12 }}>Chain of Evidence Audit Trail</h4>
          <div className="evidence-chain">
            <div className="evidence-node">
              <div className="evidence-dot satellite">SAT</div>
              <div className="evidence-content">
                <div className="evidence-label">Satellite Imagery Variance Flagged</div>
                <div className="evidence-text">Sentinel-2 Radar confirms 12% physical construction vs 78% invoice billing.</div>
                <div className="evidence-meta">2024-03-18 14:22 UTC • Sensor ID #SAT-001</div>
              </div>
            </div>

            <div className="evidence-node">
              <div className="evidence-dot financial">FIN</div>
              <div className="evidence-content">
                <div className="evidence-label">Offshore Fund Wire Traced</div>
                <div className="evidence-text">Treasury → RoadBuild Corp → Nexus Holdings → Offshore FZC Dubai ($18M).</div>
                <div className="evidence-meta">2024-03-19 09:15 UTC • SWIFT Trace #TR-9941</div>
              </div>
            </div>

            <div className="evidence-node">
              <div className="evidence-dot network">NET</div>
              <div className="evidence-content">
                <div className="evidence-label">Beneficial Ownership Correlation</div>
                <div className="evidence-text">Proxy director of Nexus Holdings confirmed as brother-in-law of Ministry official.</div>
                <div className="evidence-meta">2024-03-20 11:04 UTC • Registrar Audit DB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ CUSTOM TOOLTIP */
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className="label">{label}</div>
        {payload.map((p, i) => (
          <div key={i} className="value" style={{ color: p.color }}>
            {p.name}: ${p.value}M
          </div>
        ))}
      </div>
    );
  }
  return null;
}

