
import React from "react";

function AnalyticsPage() {
  return (
    <div className="dash-row">
      <div className="table-card" style={{ minHeight: 260 }}>
        <div className="card-header">
          <div className="card-title">Analytics</div>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Later you can move advanced charts (intensity vs likelihood, topic
          trends, etc.) here.
        </p>
      </div>
    </div>
  );
}

export default AnalyticsPage;
