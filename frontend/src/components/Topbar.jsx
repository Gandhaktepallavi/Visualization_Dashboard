import React, { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const LogoutContext = createContext(null);
Topbar.LogoutContext = LogoutContext; // used in App

function titleFromPath(pathname) {
  if (pathname === "/") return "Dashboard";
  const clean = pathname.replace("/", "");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

function Topbar() {
  const { pathname } = useLocation();
  const section = titleFromPath(pathname);
  const logout = useContext(LogoutContext);
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  // hide topbar on login
  if (pathname === "/login") return null;

  const handleLogout = () => {
    if (logout) logout();
    navigate("/login");
  };

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  // static user details 
  const user = {
    name: "Sai",
    role: "Performance Analyst",
    email: "sai@example.com",
    location: "India",
  };

  return (
    <header className="dash-topbar" style={{ position: "relative" }}>
      <div>
        <div className="topbar-breadcrumb">{section}</div>
        <div className="topbar-title">
          {section === "Dashboard"
            ? "Welcome to your dashboard"
            : `Welcome to ${section}`}
        </div>
      </div>

      <div className="topbar-right">
        <button
          onClick={handleLogout}
          style={{
            fontSize: 11,
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid var(--border-subtle)",
            background: "transparent",
            color: "var(--text-muted)",
            cursor: "pointer",
            marginRight: 12,
          }}
        >
          Logout
        </button>

        <div
          className="topbar-user"
          style={{ position: "relative", cursor: "pointer" }}
          onClick={toggleProfile}
        >
          <div className="user-avatar">S</div>
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-role">{user.role}</div>
          </div>
        </div>

        {showProfile && (
          <div
            style={{
              position: "absolute",
              right: 20,
              top: 60,
              width: 260,
              background: "rgba(15,23,42,0.98)",
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,0.3)",
              boxShadow: "0 18px 45px rgba(0,0,0,0.6)",
              padding: 14,
              fontSize: 13,
              zIndex: 50,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  background:
                    "linear-gradient(135deg,#f4b41a 0%,#f97316 100%)",
                  color: "#111827",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                S
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{user.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  {user.role}
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 12,
                paddingTop: 10,
                borderTop: "1px solid rgba(55,65,81,0.8)",
              }}
            >
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  Email:
                </span>
                <br />
                <span>{user.email}</span>
              </div>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  Location:
                </span>
                <br />
                <span>{user.location}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                marginTop: 10,
                width: "100%",
                padding: "6px 0",
                borderRadius: 999,
                border: "none",
                background:
                  "linear-gradient(135deg,#f97373 0%,#ef4444 100%)",
                color: "#111827",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Topbar;
