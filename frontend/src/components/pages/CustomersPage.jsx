// src/components/pages/CustomersPage.jsx
import React from "react";

function CustomersPage() {
  return (
    <div className="dash-row">
      <div className="table-card" style={{ minHeight: 260 }}>
        <div className="card-header">
          <div className="card-title">Customers</div>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Show customer‑related insights like country or city breakdown.
        </p>
      </div>
    </div>
  );
}

export default CustomersPage;
