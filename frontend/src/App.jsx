import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./index.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardPage from "./components/pages/DashboardPage";
import ProductsPage from "./components/pages/ProductsPage";
import CustomersPage from "./components/pages/CustomersPage";
import AnalyticsPage from "./components/pages/AnalyticsPage";
import ReportsPage from "./components/pages/ReportsPage";
import SettingsPage from "./components/pages/SettingsPage";
import LoginPage from "./components/pages/LoginPage";

function AppShell({ children }) {
  return (
    <div className="dash-root">
      <Sidebar />
      <div className="dash-main">
        <Topbar />
        <div className="dash-content">{children}</div>
      </div>
    </div>
  );
}

// Simple auth wrapper
function RequireAuth({ isLoggedIn, children }) {
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load auth state from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem("dash_logged_in");
    if (stored === "true") setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("dash_logged_in", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("dash_logged_in");
  };

  return (
    <BrowserRouter>
      {/* Pass logout to Topbar via context‑like prop */}
      <Topbar.LogoutContext.Provider value={handleLogout}>
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/"
            element={
              <RequireAuth isLoggedIn={isLoggedIn}>
                <AppShell>
                  <DashboardPage />
                </AppShell>
              </RequireAuth>
            }
          />
          <Route
            path="/products"
            element={
              <RequireAuth isLoggedIn={isLoggedIn}>
                <AppShell>
                  <ProductsPage />
                </AppShell>
              </RequireAuth>
            }
          />
          <Route
            path="/customers"
            element={
              <RequireAuth isLoggedIn={isLoggedIn}>
                <AppShell>
                  <CustomersPage />
                </AppShell>
              </RequireAuth>
            }
          />
          <Route
            path="/analytics"
            element={
              <RequireAuth isLoggedIn={isLoggedIn}>
                <AppShell>
                  <AnalyticsPage />
                </AppShell>
              </RequireAuth>
            }
          />
          <Route
            path="/reports"
            element={
              <RequireAuth isLoggedIn={isLoggedIn}>
                <AppShell>
                  <ReportsPage />
                </AppShell>
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth isLoggedIn={isLoggedIn}>
                <AppShell>
                  <SettingsPage />
                </AppShell>
              </RequireAuth>
            }
          />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Topbar.LogoutContext.Provider>
    </BrowserRouter>
  );
}

export default App;
