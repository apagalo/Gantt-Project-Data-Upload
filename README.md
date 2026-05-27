# Electrolux Executive Dashboard

A modern, responsive dashboard for leadership team analytics and KPI tracking.

## 📁 Project Structure

```
dashboard-project/
├── index.html              # Main dashboard page
├── README.md               # This file
├── .gitignore              # Git ignore rules
└── assets/
    ├── css/
    │   └── styles.css      # Dashboard styling
    ├── js/
    │   └── main.js         # Dashboard functionality
    └── images/             # (Add images here)
        └── logo.svg        # Company logo
```

## 🚀 Getting Started

### Prerequisites
- Git (installed ✓)
- VS Code (recommended)
- Web browser (Chrome, Edge, Firefox)

### First Steps

1. **Open the project in VS Code**
   ```
   File → Open Folder → Electrolux/dashboard-project
   ```

2. **View the dashboard**
   - Open `index.html` in VS Code
   - Right-click → "Open with Live Server" (install Live Server extension if prompted)
   - Or simply double-click `index.html` to open in browser

3. **Customize the dashboard**
   - Edit `index.html` to add your actual KPIs and metrics
   - Modify `assets/css/styles.css` to match your brand colors
   - Update `assets/js/main.js` with your Power BI data connections

## 🔗 Power BI Integration

### Option 1: Embed Reports (Recommended)
Use Power BI Embedded to integrate your existing reports:
```javascript
// In main.js - Add Power BI embed code
const embedConfig = {
    type: 'report',
    id: '<your-report-id>',
    embedUrl: '<your-embed-url>',
    accessToken: '<your-token>'
};
```

### Option 2: REST API Connection
Connect directly to Power BI datasets:
```javascript
// Fetch data from Power BI dataset
const datasetId = 'your-dataset-id';
const response = await fetch(`https://api.powerbi.com/v1.0/myorg/datasets/${datasetId}/rows`);
```

### Option 3: Export & Import
Export data from Power BI as CSV/Excel and load in JavaScript:
```javascript
// Load local data file
const data = await fetch('assets/data/dashboard-data.json').then(r => r.json());
```

## 🎨 Customization

### Change Colors
Edit `assets/css/styles.css`:
```css
:root {
    --primary-color: #1a365d;    /* Change this */
    --accent-color: #ed8936;    /* And this */
}
```

### Add New Views
1. Add navigation item in `index.html`
2. Create new section with unique ID
3. Add corresponding CSS and JavaScript

## 📊 Available Views

| View | Description | Status |
|------|-------------|--------|
| Overview | KPI summary cards | ✓ Ready |
| Sales | Sales performance metrics | → Add data |
| Operations | Operational efficiency | → Add data |
| Finance | Financial dashboards | → Add data |
| Reports | Generated reports | → Add data |

## 🔧 Development Workflow

```bash
# 1. Clone or download the project
# 2. Open in VS Code
# 3. Make changes to HTML/CSS/JS files
# 4. Test in browser
# 5. Commit changes with Git
```

### Useful VS Code Extensions
- **Live Server** - Live reload for development
- **Prettier** - Code formatting
- **ESLint** - JavaScript linting
- **GitLens** - Git integration

## 📞 Support

For questions about:
- **HTML/CSS** → MDN Web Docs
- **Power BI** → Microsoft Power BI Documentation
- **VS Code** → VS Code Tips & Tricks

---

*Last Updated: April 2026*