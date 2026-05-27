/**
 * Electrolux Dashboard - Main JavaScript
 * 
 * This file handles:
 * - Navigation functionality
 * - Chart rendering (Chart.js integration)
 * - Data management and updates
 * - User interactions
 */

// ========================================
// Configuration
// ========================================
const CONFIG = {
    apiEndpoint: '/api/dashboard',
    refreshInterval: 300000, // 5 minutes
    charts: {
        colors: {
            primary: '#1a365d',
            secondary: '#2c5282',
            accent: '#ed8936',
            success: '#38a169',
            warning: '#d69e2e',
            danger: '#e53e3e'
        }
    }
};

// ========================================
// Data Store
// ========================================
const dashboardData = {
    kpis: {
        revenue: { current: 12500000, previous: 11160000, label: 'Total Revenue', format: 'currency' },
        unitsSold: { current: 45230, previous: 41880, label: 'Units Sold', format: 'number' },
        customerSatisfaction: { current: 4.2, previous: 4.2, label: 'Customer Satisfaction', format: 'rating' },
        operationalEfficiency: { current: 87, previous: 83, label: 'Operational Efficiency', format: 'percent' }
    },
    charts: {
        revenueTrend: [],
        salesByRegion: [],
        monthlyComparison: []
    }
};

// ========================================
// Utility Functions
// ========================================

/**
 * Format number based on type
 */
function formatValue(value, format) {
    switch (format) {
        case 'currency':
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value);
        case 'percent':
            return value + '%';
        case 'rating':
            return value + '/5';
        default:
            return new Intl.NumberFormat('en-US').format(value);
    }
}

/**
 * Calculate percentage change
 */
function calculateChange(current, previous) {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
}

/**
 * Get change class based on value
 */
function getChangeClass(change, inverse = false) {
    if (inverse) {
        return change > 0 ? 'negative' : change < 0 ? 'positive' : 'neutral';
    }
    return change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
}

// ========================================
// UI Rendering Functions
// ========================================

/**
 * Update KPI cards with data
 */
function updateKPIs() {
    const kpiGrid = document.querySelector('.kpi-grid');
    if (!kpiGrid) return;

    Object.entries(dashboardData.kpis).forEach(([key, data]) => {
        const card = kpiGrid.querySelector(`[data-kpi="${key}"]`);
        if (card) {
            const valueEl = card.querySelector('.kpi-value');
            const changeEl = card.querySelector('.kpi-change');
            
            if (valueEl) valueEl.textContent = formatValue(data.current, data.format);
            if (changeEl) {
                const change = calculateChange(data.current, data.previous);
                changeEl.textContent = `${change > 0 ? '+' : ''}${change}% vs last month`;
                changeEl.className = `kpi-change ${getChangeClass(parseFloat(change))}`;
            }
        }
    });
}

/**
 * Initialize navigation
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Get target section
            const target = this.getAttribute('href').replace('#', '');
            console.log('Navigating to:', target);
            
            // Show/hide sections based on navigation
            const overviewSection = document.querySelector('.kpi-grid');
            const dataSection = document.querySelector('.data-section');
            const chartsSection = document.querySelector('.charts-grid');
            const ganttSection = document.getElementById('projects-timeline');
            
            if (target === 'reports') {
                // Projects Timeline view
                if (overviewSection) overviewSection.style.display = 'none';
                if (dataSection) dataSection.style.display = 'none';
                if (chartsSection) chartsSection.style.display = 'none';
                if (ganttSection) ganttSection.style.display = 'block';
            } else {
                // Other views - show default dashboard
                if (overviewSection) overviewSection.style.display = 'grid';
                if (dataSection) dataSection.style.display = 'block';
                if (chartsSection) chartsSection.style.display = 'grid';
                if (ganttSection) ganttSection.style.display = 'none';
            }
        });
    });
}

/**
 * Initialize charts (placeholder for Chart.js)
 */
function initCharts() {
    // This is where you would integrate Chart.js or another charting library
    // Example: Chart.js integration would go here
    
    console.log('Charts initialized - Ready for data integration');
    
    // Placeholder: Render revenue chart
    const revenueChart = document.getElementById('revenue-chart');
    if (revenueChart) {
        revenueChart.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p style="color: var(--text-light); margin-bottom: 10px;">Revenue Trend</p>
                <div style="display: flex; align-items: flex-end; justify-content: center; gap: 10px; height: 150px;">
                    <div style="width: 30px; height: 60%; background: var(--primary-color); border-radius: 4px 4px 0 0;"></div>
                    <div style="width: 30px; height: 75%; background: var(--primary-color); border-radius: 4px 4px 0 0;"></div>
                    <div style="width: 30px; height: 65%; background: var(--primary-color); border-radius: 4px 4px 0 0;"></div>
                    <div style="width: 30px; height: 80%; background: var(--primary-color); border-radius: 4px 4px 0 0;"></div>
                    <div style="width: 30px; height: 90%; background: var(--primary-color); border-radius: 4px 4px 0 0;"></div>
                    <div style="width: 30px; height: 85%; background: var(--primary-color); border-radius: 4px 4px 0 0;"></div>
                </div>
                <p style="font-size: 12px; color: var(--text-light); margin-top: 10px;">Last 6 Months</p>
            </div>
        `;
    }
    
    // Placeholder: Render region chart
    const regionChart = document.getElementById('region-chart');
    if (regionChart) {
        regionChart.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p style="color: var(--text-light); margin-bottom: 10px;">Sales by Region</p>
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                    <div style="text-align: center;">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: conic-gradient(var(--primary-color) 0deg 126deg, var(--border-color) 126deg 360deg); margin: 0 auto 8px;"></div>
                        <span style="font-size: 12px;">North (35%)</span>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: conic-gradient(var(--accent-color) 0deg 90deg, var(--border-color) 90deg 360deg); margin: 0 auto 8px;"></div>
                        <span style="font-size: 12px;">South (25%)</span>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: conic-gradient(var(--success-color) 0deg 72deg, var(--border-color) 72deg 360deg); margin: 0 auto 8px;"></div>
                        <span style="font-size: 12px;">East (20%)</span>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: conic-gradient(var(--warning-color) 0deg 72deg, var(--border-color) 72deg 360deg); margin: 0 auto 8px;"></div>
                        <span style="font-size: 12px;">West (20%)</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// ========================================
// Data Integration (Power BI)
// ========================================

/**
 * Fetch data from Power BI (placeholder)
 * This function would connect to your Power BI dataset
 */
async function fetchPowerBIData() {
    // Placeholder for Power BI API integration
    // You would use the Power BI REST API or embedded dataset
    
    console.log('Fetching data from Power BI...');
    
    // Example structure for Power BI data:
    // const response = await fetch('https://api.powerbi.com/v1.0/myorg/datasets/{dataset-id}/rows');
    // const data = await response.json();
    
    return dashboardData;
}

/**
 * Update dashboard with fresh data
 */
async function refreshDashboard() {
    try {
        const data = await fetchPowerBIData();
        Object.assign(dashboardData, data);
        updateKPIs();
        console.log('Dashboard refreshed successfully');
    } catch (error) {
        console.error('Error refreshing dashboard:', error);
    }
}

// ========================================
// Initialization
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Electrolux Dashboard initializing...');
    
    // Initialize components
    initNavigation();
    initCharts();
    updateKPIs();
    
    // Initialize Gantt if present
    if (document.getElementById('gantt-content')) {
        initGanttChart();
    }
    
    // Set up auto-refresh
    // setInterval(refreshDashboard, CONFIG.refreshInterval);
    
    console.log('Dashboard ready!');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        dashboardData,
        formatValue,
        calculateChange,
        refreshDashboard
    };
}

// ========================================
// Gantt Chart (Projects Timeline)
// ========================================

// Raw data (same as React version)
const RAW_DATA = [
  {
    project: "Project 3", roadmap: "Identity", client: "WB&SDA", status: "Scheduled", locations: ["Shanghai","Stockholm"],
    phases: [
      { name: "[Non Phase Specific]",       start: "2026-01-05", end: "2026-10-30", hours: 177.6 },
      { name: "Management",                 start: "2026-01-26", end: "2026-12-15", hours: 501.6 },
      { name: "Identity Consolidation 2.0", start: "2026-05-01", end: "2026-08-31", hours: 256.0 },
      { name: "Frigidaire Identity",        start: "2026-10-02", end: "2026-12-14", hours: 166.4 },
    ],
  },
  {
    project: "Project 1", roadmap: "Innovation", client: "WB&SDA", status: "Scheduled", locations: ["Shanghai"],
    phases: [
      { name: "[Non Phase Specific]", start: "2026-01-05", end: "2026-11-13", hours: 412.0 },
    ],
  },
  {
    project: "Project 4", roadmap: "Implementation", client: "Packaging", status: "Scheduled", locations: ["Stockholm"],
    phases: [
      { name: "BOLD Pizza Oven Ember",           start: "2026-01-07", end: "2026-05-29", hours: 40.7 },
      { name: "BOLD Goreng Air Fryer",           start: "2026-01-07", end: "2026-05-29", hours: 40.7 },
      { name: "BOLD Kenya Espresso Coffee",      start: "2026-01-07", end: "2026-05-29", hours: 40.7 },
      { name: "Strawberry 2.0",                  start: "2026-01-14", end: "2026-04-10", hours: 56.1 },
      { name: "Melon 2.0",                       start: "2026-01-14", end: "2026-04-10", hours: 56.1 },
      { name: "BOLD Panama Kettle",              start: "2026-01-14", end: "2026-05-29", hours: 80.4 },
      { name: "BOLD Panama Toaster",             start: "2026-01-14", end: "2026-05-29", hours: 80.4 },
      { name: "BOLD Panama Drip Coffee",         start: "2026-01-14", end: "2026-05-29", hours: 80.4 },
      { name: "Guam (New portable garment steamer)", start: "2026-01-19", end: "2026-04-09", hours: 112.1 },
      { name: "Mali (Range, 3 products)",        start: "2026-04-01", end: "2026-06-30", hours: 141.7 },
      { name: "NVR Bucket SDA",                  start: "2026-06-01", end: "2026-12-17", hours: 135.3 },
      { name: "Thor Ice Cream maker",            start: "2026-08-03", end: "2026-11-20", hours: 80.1 },
      { name: "Lumi Glas Air Fryer",             start: "2026-08-10", end: "2026-09-30", hours: 60.0 },
    ],
  },
  {
    project: "Project 3", roadmap: "Identity", client: "Floor Care", status: "Scheduled", locations: ["Stockholm"],
    phases: [
      { name: "[Non Phase Specific]", start: "2026-01-12", end: "2026-12-15", hours: 1250.6 },
    ],
  },
  {
    project: "Project 5", roadmap: "Implementation", client: "Air Care", status: "Scheduled", locations: ["Stockholm"],
    phases: [
      { name: "DS-CPPF",   start: "2026-01-15", end: "2026-01-23", hours: 11.2 },
      { name: "CPPF-CP00", start: "2026-01-26", end: "2026-04-24", hours: 130.0 },
      { name: "CP00-CP0",  start: "2026-04-27", end: "2026-06-24", hours: 34.4 },
      { name: "After CP0", start: "2026-08-03", end: "2026-12-15", hours: 124.8 },
    ],
  },
  {
    project: "Project 2", roadmap: "Implementation", client: "Floor Care", status: "Scheduled", locations: ["Shanghai"],
    phases: [
      { name: "Pre DS",     start: "2026-01-21", end: "2026-09-30", hours: 79.2 },
      { name: "DS-CPPF/00", start: "2026-10-01", end: "2026-11-16", hours: 132.0 },
      { name: "CP00-CP0",   start: "2026-11-17", end: "2026-12-16", hours: 88.0 },
      { name: "After CP0",  start: "2026-12-17", end: "2026-12-31", hours: 22.0 },
    ],
  },
  {
    project: "Project 6", roadmap: "Implementation", client: "Air Care", status: "Scheduled", locations: [],
    phases: [
      { name: "[Non Phase Specific]", start: "2026-02-18", end: "2026-12-15", hours: 157.9 },
    ],
  },
  {
    project: "Project 8", roadmap: "Innovation", client: "WB&SDA", status: "Scheduled", locations: [],
    phases: [
      { name: "[Non Phase Specific]", start: "2026-02-18", end: "2026-12-17", hours: 388.0 },
    ],
  },
  {
    project: "Wellbeing Project 3", roadmap: "Identity", client: "WB&SDA", status: "Scheduled", locations: ["Shanghai","Stockholm"],
    phases: [
      { name: "Air Care Identity Evolution", start: "2026-03-02", end: "2026-05-04", hours: 343.2 },
    ],
  },
  {
    project: "Project 7", roadmap: "Implementation", client: "Packaging", status: "Scheduled", locations: ["Stockholm"],
    phases: [
      { name: "Koya wave 1",            start: "2026-03-02", end: "2026-05-22", hours: 111.6 },
      { name: "NVR Bucket Air Care",    start: "2026-06-01", end: "2026-12-17", hours: 97.6 },
      { name: "Baker",                  start: "2026-06-17", end: "2026-11-30", hours: 112.1 },
      { name: "Badger (Dehum)",         start: "2026-08-10", end: "2026-09-30", hours: 291.8 },
      { name: "Griffon (Dolomite Upgrade)", start: "2026-10-15", end: "2026-12-17", hours: 135.8 },
      { name: "Koya wave 2",            start: "2026-10-19", end: "2026-12-16", hours: 166.3 },
    ],
  },
  {
    project: "Project 9", roadmap: "Implementation", client: "SDA", status: "Scheduled", locations: [],
    phases: [
      { name: "OI-OA",      start: "2026-03-02", end: "2026-04-15", hours: 92.4 },
      { name: "DS-CPPF/00", start: "2026-04-16", end: "2026-06-02", hours: 204.0 },
      { name: "CP00-CP0",   start: "2026-06-03", end: "2026-07-01", hours: 131.2 },
      { name: "After CP0",  start: "2026-07-02", end: "2026-10-30", hours: 87.6 },
    ],
  },
  {
    project: "Project 11", roadmap: "Implementation", client: "Floor Care", status: "Scheduled", locations: [],
    phases: [
      { name: "[Non Phase Specific]", start: "2026-10-01", end: "2026-12-30", hours: 78.0 },
    ],
  },
  {
    project: "Project 10", roadmap: "Implementation", client: "Water Care", status: "Scheduled", locations: [],
    phases: [
      { name: "OI-OA",               start: "2026-10-01", end: "2026-12-18", hours: 68.4 },
      { name: "[Non Phase Specific]", start: "2026-11-02", end: "2026-12-18", hours: 28.0 },
    ],
  },
  {
    project: "Project 12", roadmap: "Implementation", client: "SDA", status: "Scheduled", locations: [],
    phases: [
      { name: "OI-OA", start: "2026-11-02", end: "2026-12-18", hours: 71.6 },
    ],
  },
];

// Phase colors
const PHASE_COLORS = {
  "Pre DS":                   { bg: "#8fafc8", text: "#1a2a3a" },
  "DS-CPPF":                  { bg: "#4e7fa0", text: "#ffffff" },
  "DS-CPPF/00":               { bg: "#3a6482", text: "#ffffff" },
  "CPPF-CP00":                { bg: "#2b4f6e", text: "#ffffff" },
  "CP00-CP0":                 { bg: "#1c3a54", text: "#ffffff" },
  "After CP0":                { bg: "#112233", text: "#ffffff" },
  "OI-OA":                    { bg: "#b8a87a", text: "#2a1f00" },
  "Management":               { bg: "#6b7c88", text: "#ffffff" },
  "Identity Consolidation 2.0":{ bg: "#9aabb5", text: "#1a2a35" },
  "[Non Phase Specific]":     { bg: "#c5c9cc", text: "#3a3f42" },
};

const DYNAMIC_PALETTE = [
  { bg: "#b8a87a", text: "#2a1f00" },
  { bg: "#9e8f65", text: "#ffffff" },
  { bg: "#c4b48e", text: "#2a1f00" },
  { bg: "#8a7d5a", text: "#ffffff" },
  { bg: "#d1c4a4", text: "#2a1f00" },
  { bg: "#7a6f50", text: "#ffffff" },
  { bg: "#6b7c88", text: "#ffffff" },
  { bg: "#5a6b77", text: "#ffffff" },
  { bg: "#8fafc8", text: "#1a2a3a" },
  { bg: "#4e7fa0", text: "#ffffff" },
  { bg: "#9aabb5", text: "#1a2a35" },
  { bg: "#3a6482", text: "#ffffff" },
];

const dynamicColorMap = {};
let dynamicIdx = 0;

function getPhaseColor(name) {
  if (PHASE_COLORS[name]) return PHASE_COLORS[name];
  if (!dynamicColorMap[name]) {
    dynamicColorMap[name] = DYNAMIC_PALETTE[dynamicIdx % DYNAMIC_PALETTE.length];
    dynamicIdx++;
  }
  return dynamicColorMap[name];
}

// Client colors
const CLIENT_COLORS = {
  "Floor Care":  "#3a6482",
  "WB&SDA":      "#b8a87a",
  "Packaging":   "#6b7c88",
  "Air Care":    "#8fafc8",
  "SDA":         "#9aabb5",
  "Water Care":  "#4e7fa0",
};

function clientColor(c) { return CLIENT_COLORS[c] || "#aaa"; }

// Date utilities
const d = (s) => new Date(s + "T00:00:00");
const msDay = 86400000;
const daysBetween = (a, b) => Math.round((d(b) - d(a)) / msDay);

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function fmt(dateStr) {
  const dt = d(dateStr);
  return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

function monthLabel(dateStr) {
  const dt = d(dateStr);
  return dt.toLocaleDateString("en-GB", { month: "short", year: "2-digit" });
}

// Gantt state
let ganttData = [...RAW_DATA];
let filterClients = ["All"];
let filterStatuses = ["All"];
let filterLocations = ["All"];
let filterRoadmaps = ["All"];
let rangeStart = "";
let rangeEnd = "";
let lastRefresh = null;

function initGanttChart() {
    // Compute global date range
    const allStarts = RAW_DATA.flatMap(p => p.phases.map(ph => ph.start)).sort();
    const allEnds = RAW_DATA.flatMap(p => p.phases.map(ph => ph.end)).sort().reverse();
    rangeStart = allStarts[0];
    rangeEnd = allEnds[0];
    
    // Set date inputs
    document.getElementById('range-start').value = rangeStart;
    document.getElementById('range-end').value = rangeEnd;
    
    // Populate multi-select filters
    populateMultiSelectFilters();
    
    // Set up event listeners
    document.getElementById('range-start').addEventListener('change', e => { rangeStart = e.target.value; renderGantt(); });
    document.getElementById('range-end').addEventListener('change', e => { rangeEnd = e.target.value; renderGantt(); });
    
    // CSV refresh button
    document.getElementById('refresh-data-btn').addEventListener('click', () => {
        const panel = document.getElementById('csv-panel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });
    
    // CSV file upload
    document.getElementById('csv-file-input').addEventListener('change', handleFileUpload);
    
    // Initial render
    renderGantt();
}

function populateMultiSelectFilters() {
    const clients = ["All", ...new Set(RAW_DATA.map(p => p.client))];
    const statuses = ["All", ...new Set(RAW_DATA.map(p => p.status))];
    const locations = ["All", ...new Set(RAW_DATA.flatMap(p => p.locations || []).filter(l => l && l !== "[none]"))];
    const roadmaps = ["All", "Identity", "Implementation", "Innovation"];
    
    createMultiSelect('filter-client', clients, filterClients, setFilterClients);
    createMultiSelect('filter-status', statuses, filterStatuses, setFilterStatuses);
    createMultiSelect('filter-location', locations, filterLocations, setFilterLocations);
    createMultiSelect('filter-roadmap', roadmaps, filterRoadmaps, setFilterRoadmaps);
}

function createMultiSelect(id, options, selected, onChange) {
    const btn = document.getElementById(id + '-btn');
    const dropdown = document.getElementById(id + '-dropdown');
    const display = document.getElementById(id + '-display');
    
    // Update display text
    const isAll = selected.includes("All");
    display.textContent = isAll ? "All" : selected.length === 1 ? selected[0] : `${selected.length} selected`;
    
    // Build dropdown HTML
    let html = '';
    options.forEach(opt => {
        const checked = opt === "All" ? isAll : selected.includes(opt);
        html += `
            <div class="multiselect-option" data-value="${opt}">
                <div class="multiselect-checkbox ${checked ? 'checked' : ''}">${checked ? '✓' : ''}</div>
                <span>${opt}</span>
            </div>
        `;
    });
    dropdown.innerHTML = html;
    
    // Toggle dropdown
    btn.onclick = (e) => {
        e.stopPropagation();
        document.querySelectorAll('.multiselect-dropdown').forEach(d => {
            if (d !== dropdown) d.style.display = 'none';
        });
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    };
    
    // Option clicks
    dropdown.querySelectorAll('.multiselect-option').forEach(opt => {
        opt.onclick = () => {
            const val = opt.dataset.value;
            if (val === "All") {
                onChange(["All"]);
            } else {
                const without = selected.filter(s => s !== "All");
                if (without.includes(val)) {
                    const next = without.filter(s => s !== val);
                    onChange(next.length === 0 ? ["All"] : next);
                } else {
                    onChange([...without, val]);
                }
            }
        };
    });
    
    // Close on outside click
    document.onclick = () => { dropdown.style.display = 'none'; };
}

function setFilterClients(val) { filterClients = val; populateMultiSelectFilters(); renderGantt(); }
function setFilterStatuses(val) { filterStatuses = val; populateMultiSelectFilters(); renderGantt(); }
function setFilterLocations(val) { filterLocations = val; populateMultiSelectFilters(); renderGantt(); }
function setFilterRoadmaps(val) { filterRoadmaps = val; populateMultiSelectFilters(); renderGantt(); }

function getFilteredData() {
  return ganttData.filter(p =>
    (filterClients.includes("All") || filterClients.includes(p.client)) &&
    (filterStatuses.includes("All") || filterStatuses.includes(p.status)) &&
    (filterLocations.includes("All") || (p.locations || []).some(loc => filterLocations.includes(loc))) &&
    (filterRoadmaps.includes("All") || filterRoadmaps.includes(p.roadmap))
  );
}

function renderGantt() {
  const filtered = getFilteredData();
  const totalDays = daysBetween(rangeStart, rangeEnd) || 1;
  
  // Update project count
  document.getElementById('project-count').textContent = filtered.length;
  
  // Update last refresh date
  const displayRefresh = lastRefresh || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const lastRefreshEl = document.getElementById('last-refresh-date');
  if (lastRefreshEl) lastRefreshEl.textContent = displayRefresh;
  
  // Render month ticks
  renderMonthTicks(totalDays);
  
  // Render rows
  renderGanttRows(filtered, totalDays);
}

function renderMonthTicks(totalDays) {
  const ticksContainer = document.getElementById('month-ticks');
  const ticks = [];
  let cur = rangeStart.slice(0, 7) + "-01";
  
  while (cur <= rangeEnd) {
    const offset = clamp(daysBetween(rangeStart, cur) / totalDays, 0, 1);
    ticks.push({ label: monthLabel(cur), offset });
    const [y, m] = cur.split("-").map(Number);
    const next = m === 12 ? `${y + 1}-01-01` : `${y}-${String(m + 1).padStart(2, "0")}-01`;
    cur = next;
  }
  
  // Today line
  const today = new Date().toISOString().slice(0, 10);
  const todayOffset = daysBetween(rangeStart, today) / totalDays;
  const showToday = today >= rangeStart && today <= rangeEnd;
  
  let html = '';
  ticks.forEach((t, i) => {
    html += `<div class="month-tick" style="left: ${t.offset * 100}%">${t.label}</div>`;
  });
  
  if (showToday && todayOffset >= 0 && todayOffset <= 1) {
    html += `<div class="today-line" style="left: ${todayOffset * 100}%"></div>`;
  }
  
  ticksContainer.innerHTML = html;
}

function renderGanttRows(filtered, totalDays) {
  const rowsContainer = document.getElementById('gantt-rows');
  
  if (filtered.length === 0) {
    rowsContainer.innerHTML = '<div class="gantt-empty">No projects match the current filters.</div>';
    return;
  }
  
  let html = '';
  filtered.forEach((proj, ri) => {
    const rowKey = `${proj.project}||${proj.client}`;
    const clientBorder = clientColor(proj.client);
    
    html += `
      <div class="gantt-row">
        <div class="gantt-row-label" style="border-left-color: ${clientBorder}">
          <div class="project-name">${proj.project}</div>
          <div class="client-name">${proj.client}</div>
        </div>
        <div class="gantt-row-track">
    `;
    
    // Grid lines
    const totalDays2 = daysBetween(rangeStart, rangeEnd) || 1;
    let cur = rangeStart.slice(0, 7) + "-01";
    let first = true;
    while (cur <= rangeEnd) {
      const offset = daysBetween(rangeStart, cur) / totalDays2;
      if (!first) {
        html += `<div class="gantt-grid-line" style="left: ${offset * 100}%"></div>`;
      }
      const [y, m] = cur.split("-").map(Number);
      const next = m === 12 ? `${y + 1}-01-01` : `${y}-${String(m + 1).padStart(2, "0")}-01`;
      cur = next;
      first = false;
    }
    
    // Phase bars
    proj.phases.forEach((ph, pi) => {
      const barStart = clamp(daysBetween(rangeStart, ph.start) / totalDays, 0, 1);
      const barEnd = clamp((daysBetween(rangeStart, ph.end) + 1) / totalDays, 0, 1);
      const barWidth = barEnd - barStart;
      if (barWidth <= 0) return;
      
      const col = getPhaseColor(ph.name);
      const showLabel = barWidth > 0.04;
      
      html += `
        <div class="phase-bar" 
             style="left: ${barStart * 100}%; width: ${barWidth * 100}%; background: ${col.bg};"
             data-phase="${ph.name}"
             data-start="${ph.start}"
             data-end="${ph.end}"
             data-hours="${ph.hours}"
             onmouseenter="showTooltip(event, '${ph.name}', '${ph.start}', '${ph.end}', ${ph.hours})"
             onmouseleave="hideTooltip()">
          ${showLabel ? `<span class="phase-bar-label" style="color: ${col.text}">${ph.name}</span>` : ''}
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  });
  
  rowsContainer.innerHTML = html;
}

function renderLegend() {
  const allPhaseNames = [...new Set(RAW_DATA.flatMap(p => p.phases.map(ph => ph.name)))];
  const legendContainer = document.getElementById('legend-items');
  
  let html = '';
  allPhaseNames.forEach(name => {
    const col = getPhaseColor(name);
    html += `
      <div class="legend-item">
        <div class="legend-color" style="background: ${col.bg}"></div>
        <span class="legend-label">${name}</span>
      </div>
    `;
  });
  
  legendContainer.innerHTML = html;
}

function showTooltip(event, name, start, end, hours) {
  const tooltip = document.getElementById('gantt-tooltip');
  tooltip.innerHTML = `
    <div class="tooltip-title">${name}</div>
    <div class="tooltip-dates">${fmt(start)} → ${fmt(end)}</div>
    <div class="tooltip-hours">${hours.toFixed(1)} h scheduled</div>
  `;
  tooltip.style.display = 'block';
  tooltip.style.left = (event.clientX + 12) + 'px';
  tooltip.style.top = (event.clientY - 10) + 'px';
}

function hideTooltip() {
  document.getElementById('gantt-tooltip').style.display = 'none';
}

function parseCsv(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
  const rows = lines.slice(1).map(line => {
    const cols = line.match(/(".*?"|[^,]+|(?<=,)(?=,)|(?<=,)$|^(?=,))/g) || [];
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (cols[i] || "").replace(/^"|"$/g, "").trim();
    });
    return obj;
  });

  const needed = ["Project","Client","Status","Phase Name","Start Date","End Date","Hours"];
  const missing = needed.filter(h => !headers.includes(h));
  if (missing.length) throw new Error(`Missing columns: ${missing.join(", ")}`);

  const projMap = {};
  rows.forEach(r => {
    const key = `${r.Project}||${r.Client}`;
    if (!projMap[key]) projMap[key] = { project: r.Project, client: r.Client, status: r.Status, phases: [], locations: [], roadmap: "Implementation" };
    projMap[key].phases.push({
      name: r["Phase Name"],
      start: r["Start Date"],
      end: r["End Date"],
      hours: parseFloat(r.Hours) || 0,
    });
  });
  return Object.values(projMap);
}

function handleCsvImport() {
  const csvText = document.getElementById('csv-input').value;
  const csvError = document.getElementById('csv-error');
  
  try {
    csvError.textContent = "";
    const parsed = parseCsv(csvText);
    ganttData = parsed;
    document.getElementById('csv-panel').style.display = 'none';
    document.getElementById('csv-input').value = "";
    populateFilters();
    renderGantt();
  } catch (e) {
    csvError.textContent = "⚠ " + e.message;
  }
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const csvError = document.getElementById('csv-error');
    csvError.textContent = "";
    
    const reader = new FileReader();
    reader.onload = (ev) => {
        try {
            const parsed = parseCsvText(ev.target.result);
            ganttData = parsed;
            const now = new Date();
            lastRefresh = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
            document.getElementById('last-refresh-date').textContent = lastRefresh;
            document.getElementById('csv-panel').style.display = 'none';
            populateMultiSelectFilters();
            renderGantt();
            // Reset file input so same file can be re-uploaded
            e.target.value = "";
        } catch (err) {
            csvError.textContent = "⚠ " + err.message;
        }
    };
    reader.readAsText(file);
}

function parseCsvText(text) {
    const lines = text.trim().split(/\r?\n/);
    const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
    const rows = lines.slice(1).map(line => {
        const cols = [];
        let current = "";
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '"') { inQuotes = !inQuotes; }
            else if (line[i] === "," && !inQuotes) { cols.push(current.trim()); current = ""; }
            else { current += line[i]; }
        }
        cols.push(current.trim());
        const obj = {};
        headers.forEach((h, i) => { obj[h] = (cols[i] || "").replace(/^"|"$/g, "").trim(); });
        return obj;
    }).filter(r => Object.values(r).some(v => v));

    const needed = ["Project","Client","Status","Phase Name","Start Date","End Date","Hours"];
    const missing = needed.filter(h => !headers.includes(h));
    if (missing.length) throw new Error(`Missing columns: ${missing.join(", ")}`);

    const projMap = {};
    rows.forEach(r => {
        const key = `${r.Project}||${r.Client}`;
        if (!projMap[key]) projMap[key] = {
            project: r.Project, client: r.Client, status: r.Status,
            roadmap: r.Roadmap || "Implementation",
            locations: r.Locations ? r.Locations.split(";").map(l => l.trim()).filter(Boolean) : [],
            phases: []
        };
        projMap[key].phases.push({
            name: r["Phase Name"], start: r["Start Date"], end: r["End Date"],
            hours: parseFloat(r.Hours) || 0,
        });
    });
    return Object.values(projMap);
}