import React from "react";

function DonutCard({ data, avgIntensity }) {
  const countryIntensity = Object.entries(
    (data || []).reduce((acc, d) => {
      const c = d.country || "Unknown";
      acc[c] = (acc[c] || 0) + (Number(d.intensity) || 0);
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="donut-card">
      <div className="card-header">
        <div className="card-title">Intensity by Country</div>
        <div className="card-subtitle">Top 5 countries</div>
      </div>

      <div className="fake-donut">
        <div className="fake-donut-ring" />
        <div className="fake-donut-center">
          <div className="donut-value">{avgIntensity}</div>
          <div className="donut-label">Avg Intensity</div>
        </div>
      </div>

      <ul className="donut-legend">
        {countryIntensity.map(([country, val]) => (
          <li key={country}>
            <span className="legend-dot" />
            <span>{country}</span>
            <span className="legend-val">{val.toFixed(0)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DonutCard;
