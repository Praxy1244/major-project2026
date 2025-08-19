import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ItemCard from "../components/ItemCard";

export default function NGODashboard() {
  const { user } = useAuth();
  const [availableItems, setAvailableItems] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load items & requests
  const loadData = () => {
    setLoading(true);
    setError("");

    try {
      const allDonations = JSON.parse(localStorage.getItem("mock_donations") || "[]");
      const allRequests = JSON.parse(localStorage.getItem("mock_requests") || "[]");

      // Available items = approved donations not already requested by this NGO
      setAvailableItems(
        allDonations.filter(
          (d) => d.status === "approved" && !allRequests.some((r) => r.itemId === d.id)
        )
      );

      // NGO's own requests
      setMyRequests(allRequests.filter((r) => r.ngoEmail === user.email));
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Request an item
  const handleRequest = (item) => {
    const requests = JSON.parse(localStorage.getItem("mock_requests") || "[]");
    const newRequest = {
      id: Date.now(),
      ngoEmail: user.email,
      itemId: item.id,
      type: item.type,
      size: item.size,
      status: "pending",
    };
    localStorage.setItem("mock_requests", JSON.stringify([newRequest, ...requests]));
    loadData();
    alert("Request sent successfully!");
  };

  return (
    <div className="container-fluid page-container bg-light min-vh-100 p-4">
      <h2 className="mb-4">NGO Dashboard</h2>
      <div className="row g-4">
        {/* Available Items Section */}
        <div className="col-lg-7">
          <div className="card shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Available Items</h5>
              <button className="btn btn-sm btn-outline-secondary" onClick={loadData}>
                Refresh
              </button>
            </div>

            {loading && <p className="text-muted">Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && availableItems.length === 0 && (
              <p className="text-muted">No items available</p>
            )}

            <div className="row row-cols-1 row-cols-md-2 g-3">
              {availableItems.map((item) => (
                <div className="col" key={item.id}>
                  <ItemCard item={item} onRequest={handleRequest} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Requests Section */}
        <div className="col-lg-5">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3">My Requests</h5>
            {myRequests.length === 0 && (
              <p className="text-muted">No requests yet</p>
            )}

            <ul className="list-group">
              {myRequests.map((req) => (
                <li
                  key={req.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {req.type} • {req.size}
                  </span>
                  <span
                    className={`badge ${
                      req.status === "pending"
                        ? "bg-warning text-dark"
                        : req.status === "approved"
                        ? "bg-success"
                        : req.status === "rejected"
                        ? "bg-danger"
                        : "bg-primary"
                    }`}
                  >
                    {req.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
