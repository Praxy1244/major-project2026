import { useState } from 'react';
import { CLOTHING_TYPES, COLORS, CONDITIONS, SIZES } from '../utils/constants';

export default function DonationForm({ onSubmit }) {
  const [form, setForm] = useState({
    type: CLOTHING_TYPES[0],
    size: SIZES[2],
    condition: CONDITIONS[1],
    color: COLORS[2],
    notes: ''
  });

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ type: CLOTHING_TYPES[0], size: SIZES[2], condition: CONDITIONS[1], color: COLORS[2], notes: '' });
  };

  return (
    <form onSubmit={submit} className="vstack gap-3">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Type</label>
          <select name="type" className="form-select" value={form.type} onChange={handle}>
            {CLOTHING_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Size</label>
          <select name="size" className="form-select" value={form.size} onChange={handle}>
            {SIZES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Condition</label>
          <select name="condition" className="form-select" value={form.condition} onChange={handle}>
            {CONDITIONS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Color</label>
          <select name="color" className="form-select" value={form.color} onChange={handle}>
            {COLORS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="form-label">Notes (optional)</label>
        <textarea name="notes" className="form-control" rows="2" value={form.notes} onChange={handle} placeholder="e.g., worn twice, like new" />
      </div>
      <button className="btn btn-success align-self-start">Submit Donation</button>
    </form>
  );
}
