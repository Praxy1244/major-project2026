import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);

  const loadData = () => {
    const allDonations = JSON.parse(localStorage.getItem('mock_donations') || '[]');
    const allRequests = JSON.parse(localStorage.getItem('mock_requests') || '[]');
    setDonations(allDonations);
    setRequests(allRequests);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ Approve/Reject donation
  const updateDonationStatus = (donationId, status) => {
    const allDonations = JSON.parse(localStorage.getItem('mock_donations') || '[]');
    const updated = allDonations.map(d =>
      d.id === donationId ? { ...d, status } : d
    );
    localStorage.setItem('mock_donations', JSON.stringify(updated));
    loadData();
  };

  // ✅ Approve/Reject NGO request
  const updateRequestStatus = (requestId, status) => {
    const allRequests = JSON.parse(localStorage.getItem('mock_requests') || '[]');
    const updated = allRequests.map(r =>
      r.id === requestId ? { ...r, status } : r
    );
    localStorage.setItem('mock_requests', JSON.stringify(updated));
    loadData();
  };

  return (
    <div>
      <h3>Admin Dashboard</h3>

      {/* Manage Donations */}
      <h4 className="mt-4">Pending Donations</h4>
      {donations.filter(d => d.status === 'pending').length === 0 && <p>No pending donations.</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Type</th>
            <th>Size</th>
            <th>Condition</th>
            <th>Color</th>
            <th>Donor</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map(d => (
            <tr key={d.id}>
              <td>{d.type}</td>
              <td>{d.size}</td>
              <td>{d.condition}</td>
              <td>{d.color}</td>
              <td>{d.donorEmail}</td>
              <td>
                <span className={`badge ${
                  d.status === 'approved' ? 'bg-success' :
                  d.status === 'rejected' ? 'bg-danger' : 'bg-secondary'
                }`}>
                  {d.status}
                </span>
              </td>
              <td>
                {d.status === 'pending' && (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => updateDonationStatus(d.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => updateDonationStatus(d.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Manage NGO Requests */}
      <h4 className="mt-4">NGO Requests</h4>
      {requests.length === 0 && <p>No requests yet.</p>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>NGO</th>
            <th>Item</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r.id}>
              <td>{r.ngoEmail}</td>
              <td>{r.type} • {r.size}</td>
              <td>
                <span className={`badge ${
                  r.status === 'pending' ? 'bg-secondary' :
                  r.status === 'approved' ? 'bg-success' :
                  r.status === 'rejected' ? 'bg-danger' :
                  r.status === 'received' ? 'bg-primary' : ''
                }`}>
                  {r.status}
                </span>
              </td>
              <td>
                {r.status === 'pending' && (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => updateRequestStatus(r.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => updateRequestStatus(r.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
