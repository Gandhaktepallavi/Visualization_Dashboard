import React from "react";

function StatsGrid({ total, avgIntensity, avgLikelihood, avgRelevance }) {
  return (
    <div className="stats-grid">
      <StatCard
        title="Total Records"
        value={total}
        sub="All documents in dataset"
      />
      <StatCard
        title="Avg Intensity"
        value={avgIntensity}
        sub="Across all records"
      />
      <StatCard
        title="Avg Likelihood"
        value={avgLikelihood}
        sub="Across all records"
      />
      <StatCard
        title="Avg Relevance"
        value={avgRelevance}
        sub="Across all records"
      />
    </div>
  );
}

function StatCard({ title, value, sub }) {
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}

export default StatsGrid;
