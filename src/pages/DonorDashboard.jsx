import { useState, useEffect } from 'react';
import DonationCard from '../components/DonationCard';
import { CLOTHING_TYPES, CONDITIONS, SIZES, COLORS } from '../utils/constants';
import { useAuth } from '../context/AuthContext';

export default function DonorDashboard() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    type: CLOTHING_TYPES[0],
    condition: CONDITIONS[1],
    color: COLORS[2],
    size: SIZES[2],
    notes: ''
  });

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const newDonation = {
  id: Date.now(),
  donorEmail: user.email,
  ...form,
  status: 'pending' // default until admin approves
};


  // Load donations from mock storage
  const loadDonations = () => {
  setLoading(true);
  setError('');
  try {
    const allDonations = JSON.parse(localStorage.getItem('mock_donations') || '[]');
    const myDonations = allDonations.filter(d => d.donorEmail === user.email);

    const allRequests = JSON.parse(localStorage.getItem('mock_requests') || '[]');

    // Attach request status if any
    const donationsWithStatus = myDonations.map(donation => {
      const request = allRequests.find(r => r.itemId === donation.id);
      return request ? { ...donation, status: request.status } : donation;
    });

    setDonations(donationsWithStatus);
  } catch {
    setError('Failed to load donations');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    loadDonations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allDonations = JSON.parse(localStorage.getItem('mock_donations') || '[]');
    const newDonation = {
      id: Date.now(),
      donorEmail: user.email,
      ...form,
      status: 'submitted'
    };

    localStorage.setItem('mock_donations', JSON.stringify([newDonation, ...allDonations]));
    loadDonations();

    setForm({
      type: CLOTHING_TYPES[0],
      condition: CONDITIONS[1],
      color: COLORS[2],
      size: SIZES[2],
      notes: ''
    });
  };

  return (
    <div className="row g-4">
      {/* Donation Form */}
      <div className="col-lg-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4>Donate Clothes</h4>
            <form onSubmit={handleSubmit} className="vstack gap-3 mt-3">
              <select name="type" className="form-select" value={form.type} onChange={handleChange}>
                {CLOTHING_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
              <select name="condition" className="form-select" value={form.condition} onChange={handleChange}>
                {CONDITIONS.map(c => <option key={c}>{c}</option>)}
              </select>
              <select name="color" className="form-select" value={form.color} onChange={handleChange}>
                {COLORS.map(c => <option key={c}>{c}</option>)}
              </select>
              <select name="size" className="form-select" value={form.size} onChange={handleChange}>
                {SIZES.map(s => <option key={s}>{s}</option>)}
              </select>
              <textarea
                name="notes"
                className="form-control"
                placeholder="Additional notes..."
                value={form.notes}
                onChange={handleChange}
              />
              <button className="btn btn-success">Submit Donation</button>
            </form>
          </div>
        </div>
      </div>

      {/* My Donations */}
      <div className="col-lg-7">
        <div className="d-flex justify-content-between align-items-center">
          <h4>My Donations</h4>
          <button className="btn btn-sm btn-outline-secondary" onClick={loadDonations}>Refresh</button>
        </div>

        {loading && <p className="text-muted mt-3">Loading...</p>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {!loading && donations.length === 0 && <p className="mt-3 text-muted">No donations yet.</p>}

        <div className="row row-cols-1 row-cols-md-2 g-3 mt-2">
          {donations.map(d => (
            <div className="col" key={d.id}>
              <DonationCard donation={d} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
