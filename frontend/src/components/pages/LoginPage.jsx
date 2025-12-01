import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    // simple fake auth — later replace with real API call
    onLogin();
    navigate(from, { replace: true });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #1f2937 0, #020617 40%, #020617 100%)",
        color: "#f9fafb",
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          width: 360,
          padding: 28,
          borderRadius: 16,
          background: "rgba(15,23,42,0.95)",
          border: "1px solid rgba(148,163,184,0.3)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Login</h1>
        <p style={{ marginTop: 6, fontSize: 13, color: "#9ca3af" }}>
          Sign in to access your dashboard
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <label style={{ fontSize: 12, marginBottom: 4, display: "block" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="you@example.com"
          />

          <label
            style={{
              fontSize: 12,
              marginBottom: 4,
              display: "block",
              marginTop: 12,
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="••••••••"
          />

          {error && (
            <div
              style={{
                marginTop: 10,
                fontSize: 12,
                color: "#f97373",
              }}
            >
              {error}
            </div>
          )}

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid #4b5563",
  background: "#020617",
  color: "#e5e7eb",
  fontSize: 13,
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  marginTop: 18,
  padding: "9px 0",
  borderRadius: 999,
  border: "none",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  background:
    "linear-gradient(135deg, #f4b41a 0%, #f59e0b 50%, #f97316 100%)",
  color: "#111827",
};

export default LoginPage;
