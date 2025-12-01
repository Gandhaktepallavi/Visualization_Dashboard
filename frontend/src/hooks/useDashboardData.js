import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export default function useDashboardData() {
  const [filters, setFilters] = useState({
    end_year: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    swot: "",
    country: "",
    city: "",
  });

  const [filterOptions, setFilterOptions] = useState({
    endYears: [],
    topics: [],
    sectors: [],
    regions: [],
    pestles: [],
    sources: [],
    swots: [],
    countries: [],
    cities: [],
  });

  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial load: filters + stats + initial data
  useEffect(() => {
    async function init() {
      try {
        setLoading(true);
        const [filtersRes, statsRes, dataRes] = await Promise.all([
          axios.get(`${API_BASE}/filters`),
          axios.get(`${API_BASE}/stats`),
          axios.get(`${API_BASE}/data`),
        ]);
        setFilterOptions(filtersRes.data || {});
        setStats(statsRes.data || {});
        setData(dataRes.data || []);
      } catch (err) {
        console.error("Init error:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  // Fetch data when filters change
  const reloadData = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v) params.append(k, v);
      });
      const res = await axios.get(`${API_BASE}/data?${params.toString()}`);
      setData(res.data || []);
    } catch (err) {
      console.error("Reload error:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      end_year: "",
      topic: "",
      sector: "",
      region: "",
      pestle: "",
      source: "",
      swot: "",
      country: "",
      city: "",
    });
  };

  return {
    filters,
    filterOptions,
    data,
    stats,
    loading,
    reloadData,
    updateFilter,
    clearFilters,
  };
}
