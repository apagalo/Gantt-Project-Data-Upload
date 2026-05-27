import { useState, useMemo, useRef, useEffect } from "react";

// ── Raw data (fallback / paste-refreshable monthly) ──────────────────────────────────────
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

// ── Colour palette ────────────────────────────────────────────────────────────
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

// ── Utilities ─────────────────────────────────────────────────────────────────
const d = (s) => new Date(s + "T00:00:00");
const msDay = 86400000;
const daysBetween = (a, b) => Math.round((d(b) - d(a)) / msDay);
const fmt = (dateStr) => {
  const dt = d(dateStr);
  return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
};
const monthLabel = (dateStr) => {
  const dt = d(dateStr);
  return dt.toLocaleDateString("en-GB", { month: "short", year: "2-digit" });
};

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

const CLIENT_COLORS = {
  "Floor Care":  "#3a6482",
  "WB&SDA":      "#b8a87a",
  "Packaging":   "#6b7c88",
  "Air Care":    "#8fafc8",
  "SDA":         "#9aabb5",
  "Water Care":  "#4e7fa0",
};
function clientColor(c) { return CLIENT_COLORS[c] || "#aaa"; }

function cleanCsvValue(value) {
  if (!value) return "";
  const trimmed = value.trim();
  return trimmed === "[none]" ? "" : trimmed;
}

function splitCsvList(value) {
  return cleanCsvValue(value)
    .split(/[;,]/)
    .map(item => item.trim())
    .filter(Boolean);
}

function parseCsvNumber(value) {
  const normalized = cleanCsvValue(value).replace(/,/g, "");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseCsvDate(value) {
  const normalized = cleanCsvValue(value);
  if (!normalized) return null;
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}

function isNonPhaseSpecific(name) {
  const normalized = cleanCsvValue(name).toLowerCase();
  return normalized === "[non phase specific]" || normalized === "non phase specific";
}

function normalizeRoadmapValue(value) {
  return cleanCsvValue(value).toLowerCase().replace(/\s+/g, " ").trim();
}

function preventPhaseOverlaps(phases) {
  const sorted = [...phases].sort((a, b) => {
    if (a.start !== b.start) return a.start.localeCompare(b.start);
    if (a.end !== b.end) return a.end.localeCompare(b.end);
    return a.name.localeCompare(b.name);
  });

  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];
    if (current.end > next.start) {
      current.end = next.start;
    }
    if (current.end < current.start) {
      current.end = current.start;
    }
  }

  return sorted;
}

const ALLOWED_RECORD_TYPES = new Set(["Time & Fees"]);

function getDataBounds(projects) {
  const dates = projects.flatMap(project =>
    project.phases.flatMap(phase => [phase.start, phase.end]).filter(Boolean)
  ).sort();

  return {
    min: dates[0] || null,
    max: dates[dates.length - 1] || null,
  };
}

const DEFAULT_LEFT_COLUMN_WIDTHS = {
  priority: 50,
  project: 220,
};

const MIN_COLUMN_WIDTHS = {
  priority: 50,
  project: 160,
};

const UPLOADED_DATA_STORAGE_KEY = "gantt-uploaded-data-v1";

function mergeParsedProjects(projectGroups) {
  const mergedMap = {};

  projectGroups.flat().forEach((project) => {
    const key = `${project.project}||${project.client}`;

    if (!mergedMap[key]) {
      mergedMap[key] = {
        project: project.project,
        client: project.client,
        status: project.status || "Unassigned",
        roadmap: project.roadmap || "Other",
        priority: project.priority || "",
        locations: [...(project.locations || [])],
        phasesByName: {},
      };
    }

    if ((!mergedMap[key].status || mergedMap[key].status === "Unassigned") && project.status) {
      mergedMap[key].status = project.status;
    }
    if ((!mergedMap[key].roadmap || mergedMap[key].roadmap === "Other") && project.roadmap) {
      mergedMap[key].roadmap = project.roadmap;
    }
    if (!mergedMap[key].priority && project.priority) {
      mergedMap[key].priority = project.priority;
    }
    mergedMap[key].locations = [...new Set([...(mergedMap[key].locations || []), ...(project.locations || [])])];

    (project.phases || []).forEach((phase) => {
      const phaseKey = phase.name;
      if (!mergedMap[key].phasesByName[phaseKey]) {
        mergedMap[key].phasesByName[phaseKey] = { ...phase };
        return;
      }

      const existing = mergedMap[key].phasesByName[phaseKey];
      if (phase.start < existing.start) existing.start = phase.start;
      if (phase.end > existing.end) existing.end = phase.end;
      existing.hours += phase.hours || 0;
    });
  });

  return Object.values(mergedMap)
    .map((project) => ({
      project: project.project,
      client: project.client,
      status: project.status,
      roadmap: project.roadmap,
      priority: project.priority || "",
      locations: project.locations,
      phases: preventPhaseOverlaps(Object.values(project.phasesByName)),
    }))
    .filter((project) => project.phases.length > 0);
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const OverviewIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M7 16h2v-4H7v4z" />
    <path d="M12 16h2V8h-2v8z" />
    <path d="M17 16h2v-6h-2v6z" />
  </svg>
);

const TeamIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ReportsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

// ── Sidebar Component ───────────────────────────────────────────────────────
function Sidebar({ expanded, onExpand, activePage, onPageChange }) {
  const navItems = [
    { id: "overview", label: "Overview", icon: <OverviewIcon /> },
    { id: "projects", label: "Projects Timeline", icon: <ProjectsIcon /> },
    { id: "team", label: "Team", icon: <TeamIcon /> },
    { id: "reports", label: "Reports", icon: <ReportsIcon /> },
  ];

  return (
    <div
      onClick={onExpand}
      style={{
        width: expanded ? 200 : 56,
        background: "#0f2035",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{
        padding: expanded ? "20px 16px" : "20px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        minHeight: 64,
      }}>
        <div style={{
          width: 28,
          height: 28,
          background: "#7ab3d4",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ color: "#0f2035", fontWeight: 700, fontSize: 14 }}>E</span>
        </div>
        {expanded && (
          <span style={{
            color: "white",
            fontWeight: 600,
            fontSize: 14,
            whiteSpace: "nowrap",
            opacity: expanded ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}>
            Electrolux
          </span>
        )}
      </div>

      {/* Nav Items */}
      <div style={{ flex: 1, padding: "12px 0" }}>
        {navItems.map(item => (
          <div
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
              onPageChange(item.id);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: expanded ? "12px 16px" : "12px 14px",
              margin: "4px 8px",
              borderRadius: 8,
              background: activePage === item.id ? "#1c4a72" : "transparent",
              borderLeft: activePage === item.id ? "3px solid #7ab3d4" : "3px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ color: activePage === item.id ? "#7ab3d4" : "rgba(255,255,255,0.7)", flexShrink: 0 }}>
              {item.icon}
            </div>
            {expanded && (
              <span style={{
                color: activePage === item.id ? "white" : "rgba(255,255,255,0.7)",
                fontSize: 13,
                fontWeight: activePage === item.id ? 600 : 400,
                whiteSpace: "nowrap",
                opacity: expanded ? 1 : 0,
                transition: "opacity 0.2s ease",
              }}>
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div style={{
        padding: "12px 0",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}>
        {/* Settings */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: expanded ? "12px 16px" : "12px 14px",
          margin: "4px 8px",
          cursor: "pointer",
        }}>
          <div style={{ color: "rgba(255,255,255,0.7)", flexShrink: 0 }}>
            <SettingsIcon />
          </div>
          {expanded && (
            <span style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 13,
              whiteSpace: "nowrap",
              opacity: expanded ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}>
              Settings
            </span>
          )}
        </div>

        {/* Avatar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: expanded ? "12px 16px" : "12px 14px",
          margin: "4px 8px",
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#7ab3d4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ color: "#0f2035", fontWeight: 600, fontSize: 12 }}>A</span>
          </div>
          {expanded && (
            <span style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 13,
              whiteSpace: "nowrap",
              opacity: expanded ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}>
              Admin
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Placeholder Pages ─────────────────────────────────────────────────────────
function ComingSoon({ title }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      background: "#f0f1f2",
    }}>
      <div style={{
        background: "white",
        borderRadius: 12,
        padding: "40px 60px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        border: "1px solid #dde1e4",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#6b7c88", textTransform: "uppercase", marginBottom: 8 }}>
          Coming Soon
        </div>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#1c3a54" }}>
          {title}
        </h2>
        <p style={{ margin: "12px 0 0", fontSize: 13, color: "#6b7c88" }}>
          This section is under development.
        </p>
      </div>
    </div>
  );
}

// ── Gantt Chart Component (kept intact) ──────────────────────────────────────
function GanttChart() {
  const [filterClients, setFilterClients] = useState(["All"]);
  const [filterStatuses, setFilterStatuses] = useState(["All"]);
  const [filterLocations, setFilterLocations] = useState(["All"]);
  const [filterRoadmaps, setFilterRoadmaps] = useState(["All"]);
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [csvMode, setCsvMode] = useState(false);
  const [csvError, setCsvError] = useState("");
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ by: "chronological", direction: "asc" });
  const [lastRefresh, setLastRefresh] = useState(null);
  const [priorityWidth, setPriorityWidth] = useState(DEFAULT_LEFT_COLUMN_WIDTHS.priority);
  const [projectWidth, setProjectWidth] = useState(DEFAULT_LEFT_COLUMN_WIDTHS.project);
  const fileInputRef = useRef(null);

  const startColumnResize = (column, event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = column === "priority" ? priorityWidth : projectWidth;
    const minWidth = MIN_COLUMN_WIDTHS[column] || 120;

    const onMouseMove = (moveEvent) => {
      const nextWidth = Math.max(minWidth, startWidth + (moveEvent.clientX - startX));
      if (column === "priority") {
        setPriorityWidth(nextWidth);
      } else if (column === "project") {
        setProjectWidth(nextWidth);
      }
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Persist and restore the latest uploaded dataset in browser cache.
  useEffect(() => {
    try {
      const cached = localStorage.getItem(UPLOADED_DATA_STORAGE_KEY);
      if (!cached) return;
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setData(parsed);
      }
    } catch {
      // Ignore malformed cache.
    }
  }, []);

  const toggleSort = (field) => {
    setSortConfig((prev) => {
      if (prev.by !== field) return { by: field, direction: "asc" };
      return { by: field, direction: prev.direction === "asc" ? "desc" : "asc" };
    });
  };

  const visiblePhaseDates = data
    .flatMap(project => (project.phases || []).filter(phase => !isNonPhaseSpecific(phase.name)))
    .flatMap(phase => [phase.start, phase.end])
    .filter(Boolean)
    .sort();

  const allPhaseDates = data
    .flatMap(project => project.phases || [])
    .flatMap(phase => [phase.start, phase.end])
    .filter(Boolean)
    .sort();

  const globalMin = visiblePhaseDates[0] || allPhaseDates[0];
  const globalMax = visiblePhaseDates[visiblePhaseDates.length - 1] || allPhaseDates[allPhaseDates.length - 1];

  // Initialize default range to 2026 when data is present.
  useEffect(() => {
    if (globalMin && globalMax && (!rangeStart || !rangeEnd)) {
      setRangeStart("2026-01-01");
      setRangeEnd("2026-12-31");
    }
  }, [globalMin, globalMax, rangeStart, rangeEnd]);

  const allClients = ["All", ...new Set(data.map(p => p.client))];
  const allStatuses = ["All", ...new Set(data.map(p => p.status))];
  const allLocations = ["All", ...new Set(data.flatMap(p => p.locations || []).filter(l => l && l !== "[none]"))];
  const allRoadmaps = useMemo(() => {
    const labelsByNormalized = {};
    data.forEach((project) => {
      const label = cleanCsvValue(project.roadmap);
      const normalized = normalizeRoadmapValue(label);
      if (!normalized) return;
      if (!labelsByNormalized[normalized]) labelsByNormalized[normalized] = label;
    });
    return ["All", ...Object.values(labelsByNormalized)];
  }, [data]);

  const filtered = useMemo(() => {
    const filteredProjects = data.filter(p =>
      (filterClients.includes("All") || filterClients.includes(p.client)) &&
      (filterStatuses.includes("All") || filterStatuses.includes(p.status)) &&
      (filterLocations.includes("All") || (p.locations || []).some(loc => filterLocations.includes(loc))) &&
      (
        filterRoadmaps.includes("All") ||
        filterRoadmaps
          .map(normalizeRoadmapValue)
          .includes(normalizeRoadmapValue(p.roadmap))
      ) &&
      (
        !rangeStart || !rangeEnd ||
        (p.phases || [])
          .filter(ph => !isNonPhaseSpecific(ph.name))
          .some(ph => ph.start <= rangeEnd && ph.end >= rangeStart)
      )
    );

    // Default order remains chronological unless user chooses Project/Priority sorting.
    return [...filteredProjects].sort((a, b) => {
      const firstA = (a.phases || [])
        .filter(ph => !isNonPhaseSpecific(ph.name))
        .map(ph => ph.start)
        .sort()[0] || (a.phases || []).map(ph => ph.start).sort()[0] || "9999-12-31";

      const firstB = (b.phases || [])
        .filter(ph => !isNonPhaseSpecific(ph.name))
        .map(ph => ph.start)
        .sort()[0] || (b.phases || []).map(ph => ph.start).sort()[0] || "9999-12-31";

      const projectA = cleanCsvValue(a.project).toLowerCase();
      const projectB = cleanCsvValue(b.project).toLowerCase();
      const priorityA = cleanCsvValue(a.priority).toLowerCase();
      const priorityB = cleanCsvValue(b.priority).toLowerCase();
      const direction = sortConfig.direction === "asc" ? 1 : -1;

      if (sortConfig.by === "project") {
        if (projectA !== projectB) return projectA.localeCompare(projectB) * direction;
      } else if (sortConfig.by === "priority") {
        const hasPriorityA = priorityA ? 1 : 0;
        const hasPriorityB = priorityB ? 1 : 0;
        if (hasPriorityA !== hasPriorityB) return (hasPriorityB - hasPriorityA) * direction;
        if (priorityA !== priorityB) return priorityA.localeCompare(priorityB) * direction;
      } else {
        if (firstA !== firstB) return firstA.localeCompare(firstB);
      }

      if (firstA !== firstB) return firstA.localeCompare(firstB);
      return `${projectA}${a.client}`.localeCompare(`${projectB}${b.client}`);
    });
  }, [data, filterClients, filterStatuses, filterLocations, filterRoadmaps, rangeStart, rangeEnd, sortConfig]);

  const totalDays = daysBetween(rangeStart, rangeEnd) || 1;

  const monthTicks = useMemo(() => {
    if (!rangeStart || !rangeEnd) return [];
    const ticks = [];
    let cur = rangeStart.slice(0, 7) + "-01";
    while (cur <= rangeEnd) {
      const offset = clamp(daysBetween(rangeStart, cur) / totalDays, 0, 1);
      ticks.push({ label: monthLabel(cur), offset });
      const [y, m] = cur.split("-").map(Number);
      const next = m === 12 ? `${y + 1}-01-01` : `${y}-${String(m + 1).padStart(2, "0")}-01`;
      cur = next;
    }
    return ticks;
  }, [rangeStart, rangeEnd, totalDays]);

  const today = new Date().toISOString().slice(0, 10);
  const todayOffset = rangeStart && rangeEnd ? clamp(daysBetween(rangeStart, today) / totalDays, 0, 1) : 0;
  const showToday = rangeStart && rangeEnd && today >= rangeStart && today <= rangeEnd;

  // Multi-select component
  function MultiSelect({ label, options, selected, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    const toggle = (val) => {
      if (val === "All") { onChange(["All"]); return; }
      const without = selected.filter(s => s !== "All");
      if (without.includes(val)) {
        const next = without.filter(s => s !== val);
        onChange(next.length === 0 ? ["All"] : next);
      } else {
        onChange([...without, val]);
      }
    };

    const isAll = selected.includes("All");
    const displayLabel = isAll
      ? "All"
      : selected.length === 1
        ? selected[0]
        : `${selected.length} selected`;

    return (
      <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 4, position: "relative" }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#6b7c88", textTransform: "uppercase" }}>{label}</span>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            border: "1px solid #cdd3d8",
            borderRadius: 6,
            padding: "6px 28px 6px 10px",
            fontSize: 11,
            color: "#1e2a32",
            background: "white",
            cursor: "pointer",
            outline: "none",
            textAlign: "left",
            minWidth: 120,
            position: "relative",
            fontFamily: "inherit",
          }}
        >
          {displayLabel}
          <span style={{
            position: "absolute", right: 8, top: "50%", transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
            fontSize: 9, color: "#6b7c88", transition: "transform 0.15s", pointerEvents: "none",
          }}>▼</span>
        </button>

        {open && (
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 4,
            background: "white",
            border: "1px solid #cdd3d8",
            borderRadius: 8,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            zIndex: 1000,
            minWidth: 160,
            overflow: "hidden",
          }}>
            {options.map(opt => {
              const checked = opt === "All" ? isAll : selected.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => { toggle(opt); if (opt === "All") setOpen(false); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 12px",
                    fontSize: 12,
                    cursor: "pointer",
                    background: checked ? "#f0f4f7" : "white",
                    color: "#1e2a32",
                    borderBottom: "1px solid #f0f2f4",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#e8eef3"}
                  onMouseLeave={e => e.currentTarget.style.background = checked ? "#f0f4f7" : "white"}
                >
                  <div style={{
                    width: 14, height: 14, borderRadius: 3,
                    border: `1.5px solid ${checked ? "#1c3a54" : "#cdd3d8"}`,
                    background: checked ? "#1c3a54" : "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {checked && <span style={{ color: "white", fontSize: 9, lineHeight: 1 }}>✓</span>}
                  </div>
                  <span style={{ fontWeight: checked ? 600 : 400 }}>{opt}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // CSV parser
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

    const needed = ["Record Type", "Project", "Client", "Project State", "Project Location", "3i Roadmap", "Date", "Scheduled (hours)"];
    const missing = needed.filter(h => !headers.includes(h));
    if (missing.length) throw new Error(`Missing columns: ${missing.join(", ")}`);

    const projMap = {};
    rows.forEach(r => {
      const recordType = cleanCsvValue(r["Record Type"]);
      if (!ALLOWED_RECORD_TYPES.has(recordType)) return;

      const project = cleanCsvValue(r.Project);
      const client = cleanCsvValue(r.Client);
      if (!project || !client) return;

      const key = `${project}||${client}`;
      const projectState = cleanCsvValue(r["Project State"]) || cleanCsvValue(r["Project Status"]) || "Unassigned";
      const roadmap = cleanCsvValue(r["3i Roadmap"]) || "Other";
      const priority = cleanCsvValue(r.Priority || r.priority || r["Project Priority"]);
      const locations = splitCsvList(r["Project Location"] || r.Location);
      const phaseName = cleanCsvValue(r["Phase Name"]) || "[Non Phase Specific]";
      const rowDate = parseCsvDate(r.Date);
      const hours = parseCsvNumber(r["Scheduled (hours)"]);

      if (!projMap[key]) {
        projMap[key] = {
          project,
          client,
          status: projectState,
          roadmap,
          priority,
          locations,
          phasesByName: {},
        };
      }

      if (!projMap[key].status && projectState) projMap[key].status = projectState;
      if ((!projMap[key].roadmap || projMap[key].roadmap === "Other") && roadmap) projMap[key].roadmap = roadmap;
      if (!projMap[key].priority && priority) projMap[key].priority = priority;
      if (locations.length) {
        projMap[key].locations = [...new Set([...projMap[key].locations, ...locations])];
      }

      if (!rowDate) return;

      if (!projMap[key].phasesByName[phaseName]) {
        projMap[key].phasesByName[phaseName] = {
          name: phaseName,
          start: rowDate,
          end: rowDate,
          hours: 0,
        };
      }

      const phase = projMap[key].phasesByName[phaseName];
      if (rowDate < phase.start) phase.start = rowDate;
      if (rowDate > phase.end) phase.end = rowDate;
      phase.hours += hours;
    });

    return Object.values(projMap)
      .map(project => ({
        project: project.project,
        client: project.client,
        status: project.status || "Unassigned",
        roadmap: project.roadmap || "Other",
        priority: project.priority || "",
        locations: project.locations,
        phases: preventPhaseOverlaps(Object.values(project.phasesByName)),
      }))
      .filter(project => project.phases.length > 0);
  }

  async function handleFileUpload(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (files.length > 3) {
      setCsvError("Please upload up to 3 CSV files at a time.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setCsvError("");
    try {
      const texts = await Promise.all(files.map(file => file.text()));
      const parsedGroups = texts.map(text => parseCsvText(text));
      const merged = mergeParsedProjects(parsedGroups);

      // Replace with the latest uploaded dataset and cache it.
      setData(merged);
      localStorage.setItem(UPLOADED_DATA_STORAGE_KEY, JSON.stringify(merged));
      // Default upload window requested by business users.
      setRangeStart("2026-01-01");
      setRangeEnd("2026-12-31");

      const now = new Date();
      setLastRefresh(now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }));
      setCsvMode(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setCsvError(err.message || "Failed to parse CSV files.");
    }
  }

  const displayRefresh = lastRefresh || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
      background: "#f0f1f2",
      minHeight: "100vh",
      padding: "28px 32px",
      color: "#1e2a32",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: "#6b7c88", textTransform: "uppercase", marginBottom: 4 }}>
            Design Operations
          </div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#1c3a54", letterSpacing: "-0.02em" }}>
            Electrolux Global Design Projects
          </h1>
        </div>
        <button
          onClick={() => setCsvMode(!csvMode)}
          style={{
            background: csvMode ? "#1c3a54" : "white",
            color: csvMode ? "white" : "#1c3a54",
            border: "1.5px solid #1c3a54",
            borderRadius: 6,
            padding: "7px 16px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.04em",
            opacity: 1,
          }}
        >
          {csvMode ? "✕ Cancel" : "↑ Upload CSV"}
        </button>
      </div>

      {/* Empty state */}
      {data.length === 0 && !csvMode && (
        <div style={{
          minHeight: "calc(100vh - 180px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}>
          <div style={{
            background: "white",
            borderRadius: 12,
            padding: "28px 34px",
            border: "1.5px solid #cdd3d8",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            textAlign: "center",
            maxWidth: 520,
            width: "100%",
          }}>
            <div style={{ fontSize: 22, color: "#1c3a54", fontWeight: 700, lineHeight: 1.25 }}>Upload your data to get started 📊</div>
            <p style={{ fontSize: 15, color: "#6b7c88", marginTop: 10, marginBottom: 0 }}>
              Upload up to 3 CSV files to visualize the dashboard.
            </p>
          </div>
        </div>
      )}

      {/* CSV upload panel */}
      {csvMode && (
        <div style={{
          background: "white", borderRadius: 10, padding: 20, marginBottom: 20,
          border: "1.5px solid #cdd3d8", boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#3a6482", marginBottom: 6 }}>
            Upload a CSV file — required columns:
          </div>
          <div style={{ fontSize: 11, color: "#6b7c88", marginBottom: 14, fontFamily: "monospace" }}>
            Record Type, Project, Client, Project State, Project Location, 3i Roadmap, Date, Scheduled (hours)
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <label style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#1c3a54", color: "white", borderRadius: 6,
              padding: "8px 20px", fontSize: 12, fontWeight: 600,
              cursor: "pointer", letterSpacing: "0.04em",
            }}>
              📂 Choose CSV files (max 3)
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".csv,text/csv"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </label>
            <span style={{ fontSize: 11, color: "#9aabb5" }}>Only rows with Record Type = Time & Fees will be imported.</span>
          </div>
          {csvError && <div style={{ color: "#c0392b", fontSize: 11, marginTop: 10 }}>⚠ {csvError}</div>}
        </div>
      )}

      {/* Gantt */}
      {data.length > 0 && (
        <>

      {/* Filters */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 20,
        background: "white", borderRadius: 10, padding: "16px 18px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #dde1e4",
        alignItems: "flex-start",
      }}>
        <MultiSelect label="Client" options={allClients} selected={filterClients} onChange={setFilterClients} />
        <MultiSelect label="Status" options={allStatuses} selected={filterStatuses} onChange={setFilterStatuses} />
        <MultiSelect label="Location" options={allLocations} selected={filterLocations} onChange={setFilterLocations} />
        <MultiSelect label="3i Roadmap" options={allRoadmaps} selected={filterRoadmaps} onChange={setFilterRoadmaps} />

        {/* Date range */}
        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#6b7c88", textTransform: "uppercase" }}>From</span>
          <input type="date" value={rangeStart || ""} onChange={e => setRangeStart(e.target.value)} style={{ border: "1px solid #cdd3d8", borderRadius: 6, padding: "5px 8px", fontSize: 11, color: "#1e2a32", background: "white", cursor: "pointer", outline: "none" }} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#6b7c88", textTransform: "uppercase" }}>To</span>
          <input type="date" value={rangeEnd || ""} onChange={e => setRangeEnd(e.target.value)} style={{ border: "1px solid #cdd3d8", borderRadius: 6, padding: "5px 8px", fontSize: 11, color: "#1e2a32", background: "white", cursor: "pointer", outline: "none" }} />
        </label>

        <div style={{ marginLeft: "auto", alignSelf: "flex-end", fontSize: 12, color: "#6b7c88" }}>
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </div>
        <div style={{ display: "flex", gap: 6, alignSelf: "flex-end" }}>
          <button
            onClick={() => toggleSort("priority")}
            style={{
              border: "1px solid #cdd3d8",
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 10,
              color: sortConfig.by === "priority" ? "#1c3a54" : "#6b7c88",
              background: sortConfig.by === "priority" ? "#eef4f8" : "white",
              cursor: "pointer",
            }}
            title="Sort by priority"
          >
            Priority {sortConfig.by === "priority" && sortConfig.direction === "desc" ? "↓" : "↑"}
          </button>
        </div>
      </div>

      <div style={{
        background: "white", borderRadius: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        border: "1px solid #dde1e4", overflow: "hidden",
      }}>
        {/* Timeline header */}
        <div style={{ display: "flex", borderBottom: "1px solid #dde1e4" }}>
          <div style={{ width: priorityWidth, minWidth: priorityWidth, maxWidth: priorityWidth, padding: "10px 12px", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#6b7c88", textTransform: "uppercase", borderRight: "1px solid #dde1e4", position: "relative" }}>
            Priority
            <div
              onMouseDown={(event) => startColumnResize("priority", event)}
              style={{
                position: "absolute",
                top: 0,
                right: -4,
                width: 8,
                height: "100%",
                cursor: "col-resize",
                zIndex: 5,
              }}
            />
          </div>
          <div style={{ width: projectWidth, minWidth: projectWidth, maxWidth: projectWidth, padding: "10px 16px", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#6b7c88", textTransform: "uppercase", borderRight: "1px solid #dde1e4", position: "relative" }}>
            Project / Client
            <div
              onMouseDown={(event) => startColumnResize("project", event)}
              style={{
                position: "absolute",
                top: 0,
                right: -4,
                width: 8,
                height: "100%",
                cursor: "col-resize",
                zIndex: 5,
              }}
            />
          </div>
          <div style={{ flex: 1, position: "relative", height: 36, overflow: "hidden" }}>
            {monthTicks.map((t, i) => (
              <div key={i} style={{
                position: "absolute", left: `${t.offset * 100}%`,
                top: 0, bottom: 0, display: "flex", alignItems: "center",
                paddingLeft: 6, fontSize: 10, fontWeight: 600, color: "#6b7c88",
                borderLeft: i > 0 ? "1px dashed #e0e3e6" : "none",
                whiteSpace: "nowrap",
              }}>
                {t.label}
              </div>
            ))}
            {showToday && (
              <div style={{
                position: "absolute", left: `${todayOffset * 100}%`,
                top: 0, bottom: 0, width: 2, background: "#3a6482", opacity: 0.5,
                zIndex: 2,
              }} />
            )}
          </div>
        </div>

        {/* Rows */}
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "#6b7c88", fontSize: 13 }}>
            No projects match the current filters.
          </div>
        )}
        {filtered.map((proj, ri) => {
          const rowKey = `${proj.project}||${proj.client}`;
          return (
            <div
              key={rowKey}
              style={{
                display: "flex",
                borderBottom: ri < filtered.length - 1 ? "1px solid #eef0f2" : "none",
                background: ri % 2 === 0 ? "white" : "#f8f9f9",
                minHeight: 46,
              }}
            >
              <div style={{
                width: priorityWidth, minWidth: priorityWidth, maxWidth: priorityWidth, padding: "8px 10px",
                borderRight: "1px solid #dde1e4",
                borderLeft: `3px solid ${clientColor(proj.client)}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontSize: 10,
                  color: cleanCsvValue(proj.priority) ? "#3a6482" : "#9aabb5",
                  fontWeight: cleanCsvValue(proj.priority) ? 700 : 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}>
                  {cleanCsvValue(proj.priority) || "-"}
                </span>
              </div>

              <div style={{
                width: projectWidth, minWidth: projectWidth, maxWidth: projectWidth, padding: "8px 12px 8px 14px",
                borderRight: "1px solid #dde1e4",
                display: "flex", flexDirection: "column", justifyContent: "center",
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#1c3a54", lineHeight: 1.2, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{proj.project}</div>
                <div style={{ fontSize: 10, color: "#6b7c88", marginTop: 2 }}>{proj.client}</div>
              </div>

              <div style={{ flex: 1, position: "relative", padding: "6px 0" }}>
                {monthTicks.slice(1).map((t, i) => (
                  <div key={i} style={{
                    position: "absolute", left: `${t.offset * 100}%`,
                    top: 0, bottom: 0, borderLeft: "1px dashed #e8eaec", pointerEvents: "none",
                  }} />
                ))}
                {showToday && (
                  <div style={{
                    position: "absolute", left: `${todayOffset * 100}%`,
                    top: 0, bottom: 0, width: 2, background: "#3a6482", opacity: 0.25,
                    zIndex: 1, pointerEvents: "none",
                  }} />
                )}
                {(proj.phases || []).filter(ph => !isNonPhaseSpecific(ph.name)).map((ph, pi) => {
                  const barStart = clamp(daysBetween(rangeStart, ph.start) / totalDays, 0, 1);
                  const barEnd = clamp((daysBetween(rangeStart, ph.end) + 1) / totalDays, 0, 1);
                  const barWidth = barEnd - barStart;
                  if (barWidth <= 0) return null;
                  const col = getPhaseColor(ph.name);
                  const barPx = barWidth * 100;
                  const showLabel = barPx > 4;

                  return (
                    <div key={pi}>
                      <span
                        style={{
                          position: "absolute",
                          left: `${barStart * 100}%`,
                          top: "50%",
                          width: 8,
                          height: 8,
                          transform: "translate(-50%, -50%) rotate(45deg)",
                          background: col.bg,
                          border: "1px solid rgba(255,255,255,0.85)",
                          borderRadius: 1,
                          zIndex: 3,
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        onMouseEnter={(e) => setTooltip({ phase: ph, x: e.clientX, y: e.clientY })}
                        onMouseMove={(e) => setTooltip({ phase: ph, x: e.clientX, y: e.clientY })}
                        onMouseLeave={() => setTooltip(null)}
                        style={{
                          position: "absolute",
                          left: `${barStart * 100}%`,
                          width: `${barWidth * 100}%`,
                          top: 5, bottom: 5,
                          background: col.bg,
                          borderRadius: 5,
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: 8,
                          paddingRight: 4,
                          overflow: "hidden",
                          cursor: "default",
                          zIndex: 2,
                          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                          transition: "filter 0.15s",
                        }}
                        onMouseOver={e => e.currentTarget.style.filter = "brightness(1.08)"}
                        onMouseOut={e => e.currentTarget.style.filter = "none"}
                      >
                        {showLabel && (
                          <span style={{
                            fontSize: 10, fontWeight: 600, color: col.text,
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                            letterSpacing: "0.01em",
                          }}>
                            {ph.name}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 8,
      }}>
        <div style={{ fontSize: 11, color: "#9aabb5" }}>
          Last refresh: <strong style={{ color: "#6b7c88" }}>{displayRefresh}</strong>
        </div>
      </div>
        </>
      )}

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: "fixed",
          left: tooltip.x + 12,
          top: tooltip.y - 10,
          background: "#1c3a54",
          color: "white",
          borderRadius: 8,
          padding: "10px 14px",
          fontSize: 12,
          pointerEvents: "none",
          zIndex: 9999,
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          maxWidth: 240,
        }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>{tooltip.phase.name}</div>
          <div style={{ opacity: 0.85 }}>{fmt(tooltip.phase.start)} → {fmt(tooltip.phase.end)}</div>
        </div>
      )}
    </div>
  );
}

// ── Main App Component ────────────────────────────────────────────────────────
export default function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activePage, setActivePage] = useState("projects");

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      overflow: "hidden",
    }}>
      {/* Sidebar */}
      <Sidebar
        expanded={sidebarExpanded}
        onExpand={() => setSidebarExpanded(!sidebarExpanded)}
        activePage={activePage}
        onPageChange={setActivePage}
      />

      {/* Main Content */}
      <div style={{
        flex: 1,
        overflow: "auto",
        background: "#f0f1f2",
      }}>
        {activePage === "overview" && <ComingSoon title="Overview" />}
        {activePage === "projects" && <GanttChart />}
        {activePage === "team" && <ComingSoon title="Team" />}
        {activePage === "reports" && <ComingSoon title="Reports" />}
      </div>
    </div>
  );
}