import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DonationForm from '../components/DonationForm';
import DonationHistory from '../components/DonationHistory';

export default function DonorDashboard() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    const all = JSON.parse(localStorage.getItem('mock_donations') || '[]');
    const mine = all.filter(d => d.donorEmail === user.email);
    // Attach request status if exists
    const reqs = JSON.parse(localStorage.getItem('mock_requests') || '[]');
    const merged = mine.map(d => {
      const r = reqs.find(rr => rr.itemId === d.id);
      if (!r) return d;
      // show request status when available
      const status = r.status === 'received' ? 'received' : r.status === 'approved' ? 'requested' : 'requested';
      return { ...d, status: status };
    });
    setDonations(merged);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const onSubmitDonation = (payload) => {
    const all = JSON.parse(localStorage.getItem('mock_donations') || '[]');
    const newDonation = {
      id: Date.now(),
      donorEmail: user.email,
      status: 'pending', // admin will approve
      ...payload
    };
    localStorage.setItem('mock_donations', JSON.stringify([newDonation, ...all]));
    load();
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card shadow rounded-4">
            <div className="card-body">
              <h4 className="mb-3">Donate Clothes</h4>
              <DonationForm onSubmit={onSubmitDonation} />
              <p className="small text-muted mt-3 mb-0">New donations start as <b>Pending</b> until Admin approves.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4>Your Donations</h4>
            <button className="btn btn-sm btn-outline-secondary" onClick={load}>Refresh</button>
          </div>
          {loading ? <p className="text-muted">Loading...</p> : <DonationHistory donations={donations} />}
        </div>
      </div>
    </div>
  );
}
