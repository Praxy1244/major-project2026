import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';

export default function NGODashboard() {
  const { user } = useAuth();
  const [availableItems, setAvailableItems] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = () => {
    setLoading(true);
    setError('');
    try {
      const allDonations = JSON.parse(localStorage.getItem('mock_donations') || '[]');
      const allRequests = JSON.parse(localStorage.getItem('mock_requests') || '[]');

      // ✅ Only approved donations are available
      setAvailableItems(
        allDonations.filter(
          d => d.status === 'approved' && !allRequests.some(r => r.itemId === d.id)
        )
      );

      // ✅ My requests = filter by this NGO
      setMyRequests(allRequests.filter(r => r.ngoEmail === user.email));
    } catch {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRequest = (item) => {
    const requests = JSON.parse(localStorage.getItem('mock_requests') || '[]');
    const newRequest = {
      id: Date.now(),
      ngoEmail: user.email,
      itemId: item.id,
      type: item.type,
      size: item.size,
      status: 'pending'
    };
    localStorage.setItem('mock_requests', JSON.stringify([newRequest, ...requests]));
    loadData();
    alert('Request sent successfully!');
  };

  const updateRequestStatus = (requestId, newStatus) => {
    const allRequests = JSON.parse(localStorage.getItem('mock_requests') || '[]');
    const updatedRequests = allRequests.map(req =>
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    localStorage.setItem('mock_requests', JSON.stringify(updatedRequests));
    loadData();
  };

  return (
    <div className="row g-4">
      {/* Available Items */}
      <div className="col-lg-7">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Available Items</h4>
          <button className="btn btn-sm btn-outline-secondary" onClick={loadData}>Refresh</button>
        </div>
        {loading && <p className="text-muted">Loading...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && availableItems.length === 0 && <p className="text-muted">No items available</p>}
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {availableItems.map(item => (
            <div className="col" key={item.id}>
              <ItemCard item={item} onRequest={handleRequest} />
            </div>
          ))}
        </div>
      </div>

      {/* My Requests */}
      <div className="col-lg-5">
        <h4>My Requests</h4>
        {myRequests.length === 0 && <p className="text-muted">No requests yet</p>}
        <div className="list-group">
          {myRequests.map(req => (
            <div key={req.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{req.type} • {req.size}</span>
              <div>
                <span className={`badge ${
                  req.status === 'pending' ? 'bg-secondary' :
                  req.status === 'approved' ? 'bg-success' :
                  req.status === 'received' ? 'bg-primary' :
                  'bg-danger'
                } me-2`}>
                  {req.status}
                </span>

                {/* ✅ NGO can only mark received AFTER admin approves */}
                {req.status === 'approved' && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => updateRequestStatus(req.id, 'received')}
                  >
                    Mark Received
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
