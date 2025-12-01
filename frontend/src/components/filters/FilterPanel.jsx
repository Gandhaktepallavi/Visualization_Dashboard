import React, { useState, useMemo } from "react";
import "../../styles/filterStyles.css";

function FilterPanel({ data, onFilterChange }) {
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

  const [isExpanded, setIsExpanded] = useState(false);

  // Extract unique values from data
  const uniqueValues = useMemo(() => {
    if (!data || data.length === 0) return {};

    return {
      endYear: [
        ...new Set(data.map((d) => d.end_year).filter((v) => v)),
      ].sort((a, b) => b - a),
      startYear: [
        ...new Set(data.map((d) => d.start_year).filter((v) => v)),
      ].sort((a, b) => b - a),
      topic: [...new Set(data.map((d) => d.topic).filter((v) => v))].sort(),
      sector: [...new Set(data.map((d) => d.sector).filter((v) => v))].sort(),
      region: [...new Set(data.map((d) => d.region).filter((v) => v))].sort(),
      pestle: [...new Set(data.map((d) => d.pestle).filter((v) => v))].sort(),
      source: [...new Set(data.map((d) => d.source).filter((v) => v))].sort(),
      country: [...new Set(data.map((d) => d.country).filter((v) => v))].sort(),
    };
  }, [data]);

  // Apply filters
  const applyFilters = (updatedFilters) => {
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle checkbox change
  const handleCheckboxChange = (filterName, value) => {
    const updated = { ...filters };
    if (updated[filterName].includes(value)) {
      updated[filterName] = updated[filterName].filter((v) => v !== value);
    } else {
      updated[filterName] = [...updated[filterName], value];
    }
    applyFilters(updated);
  };

  // Handle range change
  const handleRangeChange = (filterName, index, value) => {
    const updated = { ...filters };
    updated[filterName][index] = value;
    applyFilters(updated);
  };

  // Clear all filters
  const clearFilters = () => {
    const cleared = {
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
    };
    applyFilters(cleared);
  };

  // Count active filters
  const activeCount = Object.values(filters).reduce((acc, val) => {
    if (Array.isArray(val)) {
      return (
        acc +
        (val.length > 0 && val.length < 20
          ? val.length
          : val[0] !== 0 || val[1] !== 100 || val[1] !== 10
            ? 1
            : 0)
      );
    }
    return acc;
  }, 0);

  return (
    <div className="filter-panel">
      <button
        className="filter-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        🔍 Filters {activeCount > 0 && <span className="filter-badge">{activeCount}</span>}
      </button>

      {isExpanded && (
        <div className="filter-content">
          <div className="filter-header">
            <h3>Dashboard Filters</h3>
            {activeCount > 0 && (
              <button className="filter-clear-btn" onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>

          <div className="filter-sections">
            {/* End Year Filter */}
            <FilterSection title="End Year" icon="📅">
              <div className="filter-options-grid">
                {uniqueValues.endYear?.map((year) => (
                  <label key={year} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.endYear.includes(year)}
                      onChange={() => handleCheckboxChange("endYear", year)}
                    />
                    <span>{year || "N/A"}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Start Year Filter */}
            <FilterSection title="Start Year" icon="📍">
              <div className="filter-options-grid">
                {uniqueValues.startYear?.map((year) => (
                  <label key={year} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.startYear.includes(year)}
                      onChange={() => handleCheckboxChange("startYear", year)}
                    />
                    <span>{year || "N/A"}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Topic Filter */}
            <FilterSection title="Topics" icon="🎯">
              <div className="filter-options-grid">
                {uniqueValues.topic?.slice(0, 20).map((topic) => (
                  <label key={topic} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.topic.includes(topic)}
                      onChange={() => handleCheckboxChange("topic", topic)}
                    />
                    <span>{topic}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Sector Filter */}
            <FilterSection title="Sectors" icon="🏭">
              <div className="filter-options-grid">
                {uniqueValues.sector?.map((sector) => (
                  <label key={sector} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.sector.includes(sector)}
                      onChange={() => handleCheckboxChange("sector", sector)}
                    />
                    <span>{sector}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Region Filter */}
            <FilterSection title="Regions" icon="🌍">
              <div className="filter-options-grid">
                {uniqueValues.region?.map((region) => (
                  <label key={region} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.region.includes(region)}
                      onChange={() => handleCheckboxChange("region", region)}
                    />
                    <span>{region}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* PESTLE Filter (replaces PEST/SWOT) */}
            <FilterSection title="PESTLE Analysis" icon="📊">
              <div className="filter-options-grid">
                {uniqueValues.pestle?.map((pestle) => (
                  <label key={pestle} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.pestle.includes(pestle)}
                      onChange={() => handleCheckboxChange("pestle", pestle)}
                    />
                    <span>{pestle}</span>
                  </label>
                ))}
              </div>
              <div className="filter-info">
                <small>P: Political, E: Economic, S: Social, T: Technological, L: Legal, E: Environmental</small>
              </div>
            </FilterSection>

            {/* Source Filter */}
            <FilterSection title="Sources" icon="📰">
              <div className="filter-options-grid">
                {uniqueValues.source?.slice(0, 15).map((source) => (
                  <label key={source} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.source.includes(source)}
                      onChange={() => handleCheckboxChange("source", source)}
                    />
                    <span>{source}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Country Filter */}
            <FilterSection title="Countries" icon="🌐">
              <div className="filter-options-grid">
                {uniqueValues.country?.slice(0, 20).map((country) => (
                  <label key={country} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.country.includes(country)}
                      onChange={() => handleCheckboxChange("country", country)}
                    />
                    <span>{country}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Intensity Range Filter */}
            <FilterSection title="Intensity Range" icon="⚡">
              <div className="filter-range">
                <div className="range-input">
                  <label>Min: {filters.intensity[0]}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.intensity[0]}
                    onChange={(e) =>
                      handleRangeChange("intensity", 0, Number(e.target.value))
                    }
                  />
                </div>
                <div className="range-input">
                  <label>Max: {filters.intensity[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.intensity[1]}
                    onChange={(e) =>
                      handleRangeChange("intensity", 1, Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </FilterSection>

            {/* Likelihood Range Filter */}
            <FilterSection title="Likelihood Range" icon="📈">
              <div className="filter-range">
                <div className="range-input">
                  <label>Min: {filters.likelihood[0]}</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={filters.likelihood[0]}
                    onChange={(e) =>
                      handleRangeChange("likelihood", 0, Number(e.target.value))
                    }
                  />
                </div>
                <div className="range-input">
                  <label>Max: {filters.likelihood[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={filters.likelihood[1]}
                    onChange={(e) =>
                      handleRangeChange("likelihood", 1, Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </FilterSection>

            {/* Relevance Range Filter */}
            <FilterSection title="Relevance Range" icon="⭐">
              <div className="filter-range">
                <div className="range-input">
                  <label>Min: {filters.relevance[0]}</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={filters.relevance[0]}
                    onChange={(e) =>
                      handleRangeChange("relevance", 0, Number(e.target.value))
                    }
                  />
                </div>
                <div className="range-input">
                  <label>Max: {filters.relevance[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={filters.relevance[1]}
                    onChange={(e) =>
                      handleRangeChange("relevance", 1, Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </FilterSection>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterSection({ title, icon, children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="filter-section">
      <button
        className="filter-section-header"
        onClick={() => setExpanded(!expanded)}
      >
        <span>{icon} {title}</span>
        <span className="filter-section-toggle">
          {expanded ? "▼" : "▶"}
        </span>
      </button>
      {expanded && <div className="filter-section-content">{children}</div>}
    </div>
  );
}

export default FilterPanel;
