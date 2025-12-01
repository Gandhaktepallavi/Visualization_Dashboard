import React from "react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "Dashboard" },
  { to: "/products", label: "Products" },
  { to: "/customers", label: "Customers" },
  { to: "/analytics", label: "Analytics" },
  { to: "/reports", label: "Reports" },
  { to: "/settings", label: "Settings" },
];

function Sidebar() {
  return (
    <aside className="dash-sidebar">
      <div className="sidebar-logo">ECOMVISION</div>
      <nav className="sidebar-menu">
        <div className="sidebar-section-title">Main</div>
        {items.slice(0, 4).map((item) => (
          <NavItem key={item.to} to={item.to} label={item.label} />
        ))}

        <div className="sidebar-section-title">Management</div>
        {items.slice(4).map((item) => (
          <NavItem key={item.to} to={item.to} label={item.label} />
        ))}
      </nav>
    </aside>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        "sidebar-item" + (isActive ? " sidebar-item-active" : "")
      }
    >
      {label}
    </NavLink>
  );
}

export default Sidebar;
