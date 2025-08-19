import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(0);

  // Load notifications count
  const loadNotifications = () => {
    if (!user) return;

    if (user.role === "donor") {
      const allDonations = JSON.parse(localStorage.getItem("mock_donations") || "[]");
      const donorItems = allDonations.filter((d) => d.email === user.email);
      const newNotifs = donorItems.filter(
        (d) => d.status === "approved" || d.status === "rejected"
      ).length;
      setNotifications(newNotifs);
    }

    if (user.role === "ngo") {
      const allRequests = JSON.parse(localStorage.getItem("mock_requests") || "[]");
      const ngoRequests = allRequests.filter((r) => r.ngoEmail === user.email);
      const newNotifs = ngoRequests.filter(
        (r) => r.status === "approved" || r.status === "rejected"
      ).length;
      setNotifications(newNotifs);
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 2000); // auto refresh
    return () => clearInterval(interval);
  }, [user]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Rewearify
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">

            {user?.role === "donor" && (
              <li className="nav-item">
                <Link className="nav-link" to="/donor">
                  Donor Dashboard{" "}
                  {notifications > 0 && (
                    <span className="badge bg-danger ms-1">{notifications}</span>
                  )}
                </Link>
              </li>
            )}

            {user?.role === "ngo" && (
              <li className="nav-item">
                <Link className="nav-link" to="/ngo">
                  NGO Dashboard{" "}
                  {notifications > 0 && (
                    <span className="badge bg-danger ms-1">{notifications}</span>
                  )}
                </Link>
              </li>
            )}

            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin Dashboard
                </Link>
              </li>
            )}

            {user ? (
              <li className="nav-item">
                <button className="btn btn-sm btn-outline-light ms-2" onClick={logout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
