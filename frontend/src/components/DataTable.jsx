import React from "react";

function DataTable({ data }) {
  return (
    <div className="table-card">
      <div className="card-header">
        <div className="card-title">Details</div>
        <div className="card-subtitle">First 10 records from MongoDB</div>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Region</th>
              <th>Topic</th>
              <th>Intensity</th>
              <th>Likelihood</th>
              <th>Relevance</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((row, i) => (
              <tr key={i}>
                <td>{row.country || "-"}</td>
                <td>{row.region || "-"}</td>
                <td>{row.topic || "-"}</td>
                <td>{row.intensity ?? "-"}</td>
                <td>{row.likelihood ?? "-"}</td>
                <td>{row.relevance ?? "-"}</td>
                <td>{row.end_year || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
