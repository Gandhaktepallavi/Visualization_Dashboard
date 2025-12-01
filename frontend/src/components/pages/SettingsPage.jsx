// src/components/pages/SettingsPage.jsx
import React from "react";

function SettingsPage() {
  return (
    <div className="dash-row">
      <div className="table-card" style={{ minHeight: 260 }}>
        <div className="card-header">
          <div className="card-title">Settings</div>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Place controls for default filters, theme options, etc.
        </p>
      </div>
    </div>
  );
}

export default SettingsPage;
