import { useState, useEffect } from 'react';
import DonationCard from '../components/DonationCard';
import { CLOTHING_TYPES, CONDITIONS, SIZES, COLORS } from '../utils/constants';
import { useAuth } from '../context/AuthContext';

// Mock NGO list (you can later fetch this from API or DB)
const NGO_LIST = [
  "Helping Hands Foundation",
  "Green Earth NGO",
  "Smile Trust",
  "Cloth Bank India",
  "Hope for All"
];

export default function DonorDashboard() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    type: CLOTHING_TYPES[0],
    condition: CONDITIONS[1],
    color: COLORS[2],
    size: SIZES[2],
    season: 'All Season',
    quantity: 1,
    pickup: 'pickup',
    ngo: NGO_LIST[0],   // default NGO
    notes: ''
  });

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // status filter

  // Load all donations made by this donor
  const loadDonations = () => {
    setLoading(true);
    setError('');
    try {
      const allDonations = JSON.parse(localStorage.getItem('mock_donations') || '[]');
      const myDonations = allDonations.filter(d => d.donorEmail === user.email);

      const allRequests = JSON.parse(localStorage.getItem('mock_requests') || '[]');

      // Attach status from NGO requests (if any)
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
      date: new Date().toLocaleString(),
      ...form,
      status: 'submitted'
    };

    localStorage.setItem('mock_donations', JSON.stringify([newDonation, ...allDonations]));
    loadDonations();

    // Reset form
    setForm({
      type: CLOTHING_TYPES[0],
      condition: CONDITIONS[1],
      color: COLORS[2],
      size: SIZES[2],
      season: 'All Season',
      quantity: 1,
      pickup: 'pickup',
      ngo: NGO_LIST[0],
      notes: ''
    });
  };

  // Apply status filter
  const filteredDonations = donations.filter(d => {
    if (filter === 'all') return true;
    return d.status === filter;
  });

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
              <select name="season" className="form-select" value={form.season} onChange={handleChange}>
                <option>All Season</option>
                <option>Summer</option>
                <option>Winter</option>
                <option>School Uniform</option>
                <option>Formal</option>
                <option>Casual</option>
              </select>
              <input
                type="number"
                name="quantity"
                className="form-control"
                min="1"
                value={form.quantity}
                onChange={handleChange}
              />
              <select name="pickup" className="form-select" value={form.pickup} onChange={handleChange}>
                <option value="pickup">Request Pickup</option>
                <option value="dropoff">Drop-off at NGO</option>
              </select>
              {/* NGO Selection */}
              <select name="ngo" className="form-select" value={form.ngo} onChange={handleChange}>
                {NGO_LIST.map(n => <option key={n}>{n}</option>)}
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

      {/* Donation History */}
      <div className="col-lg-7">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4>Donation History</h4>
          <div className="d-flex gap-2">
            <select
              className="form-select form-select-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="submitted">Submitted</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
            <button className="btn btn-sm btn-outline-secondary" onClick={loadDonations}>Refresh</button>
          </div>
        </div>

        {loading && <p className="text-muted mt-3">Loading...</p>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {!loading && filteredDonations.length === 0 && (
          <p className="mt-3 text-muted">No donations match this filter.</p>
        )}

        <div className="row row-cols-1 row-cols-md-2 g-3 mt-2">
          {filteredDonations.map(d => (
            <div className="col" key={d.id}>
              <DonationCard donation={d} />
              <small className="text-muted">Donated on: {d.date}</small><br />
              <small className="text-primary">NGO: {d.ngo}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
