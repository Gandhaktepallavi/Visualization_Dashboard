import React, { useEffect, useState, useMemo } from "react";
import StatsGrid from "../StatsGrid";
import LineCard from "../LineCard";
import DataTable from "../DataTable";
import DonutCard from "../DonutCard";
import FilterPanel from "../filters/FilterPanel";

function DashboardPage() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("Loading...");
  const [filters, setFilters] = useState({
    endYear: [],
    startYear: [],
    topic: [],
    sector: [],
    region: [],
    pestle: [],
    source: [],
    country: [],
    intensity: [0, 100],
    likelihood: [0, 10],
    relevance: [0, 10],
  });

  // Fetch data
  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((res) => {
        if (!res.ok) throw new Error("Backend not running");
        return res.json();
      })
      .then((rows) => {
        setData(rows);
        setStatus(`Loaded ${rows.length} records`);
      })
      .catch((e) => setStatus(e.message));
  }, []);

  // Apply filters
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // End Year filter
      if (
        filters.endYear.length > 0 &&
        !filters.endYear.includes(row.end_year)
      ) {
        return false;
      }

      // Start Year filter
      if (
        filters.startYear.length > 0 &&
        !filters.startYear.includes(row.start_year)
      ) {
        return false;
      }

      // Topic filter
      if (filters.topic.length > 0 && !filters.topic.includes(row.topic)) {
        return false;
      }

      // Sector filter
      if (filters.sector.length > 0 && !filters.sector.includes(row.sector)) {
        return false;
      }

      // Region filter
      if (filters.region.length > 0 && !filters.region.includes(row.region)) {
        return false;
      }

      // PESTLE filter
      if (filters.pestle.length > 0 && !filters.pestle.includes(row.pestle)) {
        return false;
      }

      // Source filter
      if (filters.source.length > 0 && !filters.source.includes(row.source)) {
        return false;
      }

      // Country filter
      if (filters.country.length > 0 && !filters.country.includes(row.country)) {
        return false;
      }

      // Intensity range filter
      const intensity = Number(row.intensity) || 0;
      if (
        intensity < filters.intensity[0] ||
        intensity > filters.intensity[1]
      ) {
        return false;
      }

      // Likelihood range filter
      const likelihood = Number(row.likelihood) || 0;
      if (
        likelihood < filters.likelihood[0] ||
        likelihood > filters.likelihood[1]
      ) {
        return false;
      }

      // Relevance range filter
      const relevance = Number(row.relevance) || 0;
      if (
        relevance < filters.relevance[0] ||
        relevance > filters.relevance[1]
      ) {
        return false;
      }

      return true;
    });
  }, [data, filters]);

  const total = filteredData.length;
  const avg = (field) =>
    total
      ? (
          filteredData.reduce((s, d) => s + (Number(d[field]) || 0), 0) / total
        ).toFixed(1)
      : 0;

  return (
    <>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
        {status} | Showing {total} of {data.length} records
      </div>

      {/* FILTER PANEL */}
      <FilterPanel data={data} onFilterChange={setFilters} />

      <div className="dash-row">
        <StatsGrid
          total={total}
          avgIntensity={avg("intensity")}
          avgLikelihood={avg("likelihood")}
          avgRelevance={avg("relevance")}
        />
        <LineCard data={filteredData} />
      </div>

      <div className="dash-row dash-row-bottom">
        <DataTable data={filteredData} />
        <DonutCard data={filteredData} avgIntensity={avg("intensity")} />
      </div>
    </>
  );
}

export default DashboardPage;
