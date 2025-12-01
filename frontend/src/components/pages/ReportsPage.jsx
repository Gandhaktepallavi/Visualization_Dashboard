// src/components/pages/ReportsPage.jsx
import React from "react";

function ReportsPage() {
  return (
    <div className="dash-row">
      <div className="table-card" style={{ minHeight: 260 }}>
        <div className="card-header">
          <div className="card-title">Reports</div>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Implement CSV/PDF export or summary reports from filtered data.
        </p>
      </div>
    </div>
  );
}

export default ReportsPage;
