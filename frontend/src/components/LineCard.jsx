import React from "react";

function LineCard() {
  return (
    <div className="line-card">
      <div className="card-header">
        <div>
          <div className="card-title">Overview</div>
          <div className="card-subtitle">Intensity trend (sample)</div>
        </div>
        <button className="btn-ghost">Download Reports</button>
      </div>
      <div className="fake-line-chart">
        <div className="fake-line" />
      </div>
    </div>
  );
}

export default LineCard;
