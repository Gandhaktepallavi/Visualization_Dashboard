// src/components/pages/ProductsPage.jsx
import React from "react";

function ProductsPage() {
  return (
    <div className="dash-row">
      <div className="table-card" style={{ minHeight: 260 }}>
        <div className="card-header">
          <div className="card-title">Products</div>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Add product‑related charts or tables here using your JSON/Mongo data.
        </p>
      </div>
    </div>
  );
}

export default ProductsPage;
