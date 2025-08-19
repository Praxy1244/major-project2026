import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);

  // Load data from localStorage
  const loadData = () => {
    const storedDonations = JSON.parse(localStorage.getItem("mock_donations") || "[]");
    const storedRequests = JSON.parse(localStorage.getItem("mock_requests") || "[]");
    setDonations(storedDonations);
    setRequests(storedRequests);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Approve/Reject donation
  const handleDonationAction = (id, status) => {
    const updated = donations.map(d =>
      d.id === id ? { ...d, status } : d
    );
    localStorage.setItem("mock_donations", JSON.stringify(updated));
    setDonations(updated);
  };

  // Approve/Reject request
  const handleRequestAction = (id, status) => {
    const updated = requests.map(r =>
      r.id === id ? { ...r, status } : r
    );
    localStorage.setItem("mock_requests", JSON.stringify(updated));
    setRequests(updated);
  };

  return (
    <div className="container-fluid page-container bg-light min-vh-100 p-4">
      <h2 className="mb-4 text-success">Admin Dashboard</h2>

      {/* Donations Section */}
      <div className="mb-5">
        <h4>Donations (from Donors)</h4>
        {donations.length === 0 ? (
          <p className="text-muted">No donations yet</p>
        ) : (
          <ul className="list-group">
            {donations.map(d => (
              <li
                key={d.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {d.type} • {d.size} • <b>{d.status}</b>
                </span>
                <div>
                  {d.status === "pending" && (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleDonationAction(d.id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDonationAction(d.id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Requests Section */}
      <div>
        <h4>NGO Requests</h4>
        {requests.length === 0 ? (
          <p className="text-muted">No requests yet</p>
        ) : (
          <ul className="list-group">
            {requests.map(r => (
              <li
                key={r.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {r.type} • {r.size} • <b>{r.status}</b>
                </span>
                <div>
                  {r.status === "pending" && (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleRequestAction(r.id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRequestAction(r.id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
