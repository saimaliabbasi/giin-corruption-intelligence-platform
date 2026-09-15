// Mock data for the GIIN system

export const mockAlerts = [
  {
    id: 'ALT-001',
    severity: 'critical',
    title: 'Shell Company Network Detected',
    desc: 'Ministry of Infrastructure awarded $47M contract to Nexus Holdings — 3rd shell layer traced to VP\'s brother-in-law.',
    time: '2m ago',
    module: 'network',
    entities: ['Nexus Holdings Ltd', 'Min. Tariq Bashir', 'Al-Fajr Consultants']
  },
  {
    id: 'ALT-002',
    severity: 'critical',
    title: 'Satellite Verification Failed',
    desc: 'Claimed 78% road completion in Sector 7. Satellite imagery confirms 12% actual construction. Discrepancy: $31M.',
    time: '8m ago',
    module: 'satellite',
    entities: ['RoadBuild Corp', 'Punjab PWD', 'Contract PRJ-2024-118']
  },
  {
    id: 'ALT-003',
    severity: 'high',
    title: 'Split Transaction Pattern',
    desc: 'Same vendor received 14 separate payments of $499K over 6 days — structured to avoid $500K audit threshold.',
    time: '22m ago',
    module: 'finance',
    entities: ['TechServ Global', 'Finance Ministry']
  },
  {
    id: 'ALT-004',
    severity: 'high',
    title: 'Accelerated Approval Anomaly',
    desc: 'Procurement officer approved $12M tender in 4 hours vs. standard 21-day review. Same vendor 6th consecutive award.',
    time: '1h ago',
    module: 'contracts',
    entities: ['Apex Infrastructure', 'Col. Raza Ahmad']
  },
  {
    id: 'ALT-005',
    severity: 'medium',
    title: 'Circular Payment Flow',
    desc: 'Funds traced: Treasury → Vendor A → Vendor B → Offshore Account → related official\'s spouse account.',
    time: '2h ago',
    module: 'finance',
    entities: ['Vendor A Corp', 'Vendor B Ltd', 'Offshore FZC']
  },
  {
    id: 'ALT-006',
    severity: 'medium',
    title: 'Duplicate Invoice Detected',
    desc: 'Invoice #INV-2024-8871 submitted twice by two different entities for identical service dates — $2.3M.',
    time: '3h ago',
    module: 'finance',
    entities: ['BuildRight Co', 'National Roads Agency']
  },
  {
    id: 'ALT-007',
    severity: 'low',
    title: 'New Media Corroboration',
    desc: 'Local journalists confirmed "ghost workers" at Karachi Dam project correlating with payroll anomalies flagged yesterday.',
    time: '5h ago',
    module: 'osint',
    entities: ['Karachi Dam Project', 'Water Management Dept']
  }
];

export const mockContracts = [
  {
    id: 'PRJ-2024-118',
    title: 'National Highway Extension Phase III',
    vendor: 'RoadBuild Corp',
    dept: 'Punjab PWD',
    value: 47200000,
    claimed: 78,
    actual: 12,
    riskScore: 94,
    risk: 'critical',
    date: '2024-03-15',
    flags: ['Satellite mismatch', 'Shell company', 'Accelerated approval']
  },
  {
    id: 'PRJ-2024-095',
    title: 'Sindh Healthcare Infrastructure',
    vendor: 'MediCon International',
    dept: 'Health Ministry',
    value: 12800000,
    claimed: 45,
    actual: 38,
    riskScore: 71,
    risk: 'high',
    date: '2024-01-22',
    flags: ['Inflated contract', 'Related-party vendor']
  },
  {
    id: 'PRJ-2024-077',
    title: 'Digital Governance Platform',
    vendor: 'TechServ Global',
    dept: 'Finance Ministry',
    value: 6930000,
    claimed: 90,
    actual: 90,
    riskScore: 68,
    risk: 'high',
    date: '2024-02-08',
    flags: ['Split payments', 'Threshold structuring']
  },
  {
    id: 'PRJ-2024-051',
    title: 'Karachi Water Treatment Expansion',
    vendor: 'AquaPure Solutions',
    dept: 'Water Mgmt Board',
    value: 31500000,
    claimed: 55,
    actual: 49,
    riskScore: 48,
    risk: 'medium',
    date: '2023-11-30',
    flags: ['Ghost workers', 'Payroll anomaly']
  },
  {
    id: 'PRJ-2024-033',
    title: 'Military Housing Complex B',
    vendor: 'Apex Infrastructure',
    dept: 'Defence Housing',
    value: 22100000,
    claimed: 62,
    actual: 58,
    riskScore: 39,
    risk: 'medium',
    date: '2023-10-14',
    flags: ['Rapid approval cycle']
  },
  {
    id: 'PRJ-2024-012',
    title: 'Federal University Renovation',
    vendor: 'BuildRight Co',
    dept: 'Education Dept',
    value: 4600000,
    claimed: 100,
    actual: 97,
    riskScore: 18,
    risk: 'low',
    date: '2023-09-01',
    flags: ['Duplicate invoice']
  }
];

export const mockFinancialFlows = [
  { month: 'Jan', legitimate: 128, flagged: 22, recovered: 4 },
  { month: 'Feb', legitimate: 142, flagged: 31, recovered: 8 },
  { month: 'Mar', legitimate: 119, flagged: 47, recovered: 12 },
  { month: 'Apr', legitimate: 156, flagged: 28, recovered: 9 },
  { month: 'May', legitimate: 134, flagged: 54, recovered: 21 },
  { month: 'Jun', legitimate: 149, flagged: 38, recovered: 14 },
  { month: 'Jul', legitimate: 161, flagged: 29, recovered: 11 },
  { month: 'Aug', legitimate: 138, flagged: 62, recovered: 18 },
  { month: 'Sep', legitimate: 172, flagged: 41, recovered: 16 },
  { month: 'Oct', legitimate: 145, flagged: 35, recovered: 13 },
  { month: 'Nov', legitimate: 158, flagged: 48, recovered: 22 },
  { month: 'Dec', legitimate: 167, flagged: 71, recovered: 31 }
];

export const mockRiskTimeline = [
  { date: 'Jan', score: 42 },
  { date: 'Feb', score: 48 },
  { date: 'Mar', score: 61 },
  { date: 'Apr', score: 55 },
  { date: 'May', score: 73 },
  { date: 'Jun', score: 68 },
  { date: 'Jul', score: 59 },
  { date: 'Aug', score: 77 },
  { date: 'Sep', score: 71 },
  { date: 'Oct', score: 82 },
  { date: 'Nov', score: 78 },
  { date: 'Dec', score: 86 }
];

export const mockNetworkNodes = [
  { id: '1', label: 'Min. Tariq Bashir', type: 'official', risk: 'critical', x: 400, y: 250 },
  { id: '2', label: 'Nexus Holdings Ltd', type: 'company', risk: 'critical', x: 250, y: 150 },
  { id: '3', label: 'Al-Fajr Consultants', type: 'company', risk: 'high', x: 150, y: 300 },
  { id: '4', label: 'RoadBuild Corp', type: 'company', risk: 'critical', x: 550, y: 150 },
  { id: '5', label: 'Offshore FZC Dubai', type: 'offshore', risk: 'critical', x: 200, y: 400 },
  { id: '6', label: 'Ahmed Bashir (Brother)', type: 'person', risk: 'high', x: 100, y: 150 },
  { id: '7', label: 'Col. Raza Ahmad', type: 'official', risk: 'high', x: 550, y: 380 },
  { id: '8', label: 'Apex Infrastructure', type: 'company', risk: 'medium', x: 680, y: 280 },
  { id: '9', label: 'Punjab PWD', type: 'department', risk: 'high', x: 400, y: 100 },
  { id: '10', label: 'TechServ Global', type: 'company', risk: 'high', x: 300, y: 380 },
  { id: '11', label: 'Finance Ministry', type: 'department', risk: 'medium', x: 480, y: 420 },
  { id: '12', label: 'Swiss Account #4421', type: 'offshore', risk: 'critical', x: 80, y: 270 }
];

export const mockNetworkEdges = [
  { from: '1', to: '2', label: 'Owns (hidden)', type: 'ownership' },
  { from: '1', to: '9', label: 'Controls', type: 'authority' },
  { from: '2', to: '3', label: 'Subcontracted', type: 'contract' },
  { from: '2', to: '5', label: 'Wire transfer $18M', type: 'financial' },
  { from: '3', to: '12', label: 'Wire transfer $9M', type: 'financial' },
  { from: '6', to: '2', label: 'Registered director', type: 'ownership' },
  { from: '1', to: '6', label: 'Brother', type: 'familial' },
  { from: '9', to: '4', label: 'Contract awarded', type: 'contract' },
  { from: '4', to: '2', label: 'Subcontracted 60%', type: 'contract' },
  { from: '7', to: '8', label: 'Approved tender', type: 'authority' },
  { from: '8', to: '5', label: 'Payment routed', type: 'financial' },
  { from: '10', to: '11', label: 'Contract holder', type: 'contract' },
  { from: '10', to: '3', label: 'Linked directors', type: 'ownership' }
];

export const mockInvestigations = [
  {
    id: 'INV-2024-047',
    title: 'Operation Clean Roads',
    status: 'active',
    priority: 'critical',
    entities: 8,
    evidenceItems: 34,
    assignee: 'Sr. Investigator K. Malik',
    created: '2024-03-18',
    lastActivity: '2h ago',
    riskScore: 94,
    summary: 'Coordinated embezzlement through highway project — $47M procurement fraud with satellite-verified physical underdelivery.',
    progress: 62
  },
  {
    id: 'INV-2024-039',
    title: 'Ghost Workers — Karachi Dam',
    status: 'active',
    priority: 'high',
    entities: 5,
    evidenceItems: 18,
    assignee: 'Analyst M. Hussain',
    created: '2024-02-28',
    lastActivity: '6h ago',
    riskScore: 78,
    summary: 'Payroll fraud — 340 ghost employees on AquaPure Solutions payroll confirmed absent by ground-truth verification.',
    progress: 45
  },
  {
    id: 'INV-2024-031',
    title: 'Digital Platform Structuring',
    status: 'review',
    priority: 'high',
    entities: 4,
    evidenceItems: 22,
    assignee: 'Analyst R. Shah',
    created: '2024-02-10',
    lastActivity: '1d ago',
    riskScore: 68,
    summary: 'Split payments below audit threshold — TechServ Global received 14 payments totalling $6.93M in structured tranches.',
    progress: 80
  },
  {
    id: 'INV-2024-019',
    title: 'Defence Housing Kickbacks',
    status: 'closed',
    priority: 'medium',
    entities: 3,
    evidenceItems: 12,
    assignee: 'Sr. Investigator A. Khan',
    created: '2024-01-05',
    lastActivity: '3d ago',
    riskScore: 39,
    summary: 'Rapid tender approval for Apex Infrastructure resolved — insufficient evidence for prosecution. Monitoring continued.',
    progress: 100
  }
];

export const mockPredictions = [
  {
    id: 'PRED-001',
    entity: 'Federal Power Division',
    type: 'department',
    predictedRisk: 88,
    timeframe: 'Next 30 days',
    signals: ['3 new vendor registrations to related parties', 'Budget cycle end pressure', 'Procurement officer change'],
    risk: 'critical'
  },
  {
    id: 'PRED-002',
    entity: 'NovaBuild Contractors',
    type: 'company',
    predictedRisk: 74,
    timeframe: 'Next 45 days',
    signals: ['6th consecutive tender win', 'Shell ownership layer added', 'Offshore account activity spike'],
    risk: 'high'
  },
  {
    id: 'PRED-003',
    entity: 'KPK Transport Authority',
    type: 'department',
    predictedRisk: 61,
    timeframe: 'Next 60 days',
    signals: ['Delayed project reporting', 'Media coverage of construction halt', 'Inspector reassignment'],
    risk: 'high'
  },
  {
    id: 'PRED-004',
    entity: 'Dir. Farrukh Naeem',
    type: 'official',
    predictedRisk: 55,
    timeframe: 'Next 45 days',
    signals: ['Travel pattern change', 'Recent real estate acquisition', 'Approval speed deviation +340%'],
    risk: 'medium'
  }
];

export const mockSatelliteProjects = [
  {
    id: 'SAT-001',
    name: 'Punjab Highway Phase III',
    lat: 31.5, lng: 74.3,
    claimed: 78,
    actual: 12,
    variance: -66,
    risk: 'critical',
    contract: 'PRJ-2024-118',
    verifiedDate: '2024-04-01'
  },
  {
    id: 'SAT-002',
    name: 'Karachi Dam Expansion',
    lat: 24.8, lng: 67.0,
    claimed: 55,
    actual: 49,
    variance: -6,
    risk: 'medium',
    contract: 'PRJ-2024-051',
    verifiedDate: '2024-03-28'
  },
  {
    id: 'SAT-003',
    name: 'Sindh Hospital Block C',
    lat: 25.4, lng: 68.4,
    claimed: 45,
    actual: 38,
    variance: -7,
    risk: 'medium',
    contract: 'PRJ-2024-095',
    verifiedDate: '2024-03-25'
  },
  {
    id: 'SAT-004',
    name: 'Federal University Renovation',
    lat: 33.7, lng: 73.0,
    claimed: 100,
    actual: 97,
    variance: -3,
    risk: 'low',
    contract: 'PRJ-2024-012',
    verifiedDate: '2024-04-02'
  }
];

export const anomalyTicker = [
  '⚠ CRITICAL: Shell company chain detected — Nexus Holdings → Al-Fajr → Offshore FZC Dubai',
  '⚠ ALERT: Satellite mismatch $31M variance — Punjab Highway Sector 7',
  '⚠ HIGH: Split payment structuring — TechServ Global × 14 transactions below threshold',
  '⚠ CRITICAL: 94 risk score — Min. Tariq Bashir network flagged',
  '⚠ ALERT: Ghost worker payroll fraud — 340 confirmed absent — Karachi Dam',
  '⚠ MEDIUM: Duplicate invoice detected — BuildRight Co — $2.3M',
  '⚠ PREDICTION: Federal Power Division risk rising to 88 — monitoring escalated'
];
