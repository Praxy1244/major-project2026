import { useState } from "react";
import { CLOTHING_TYPES, CONDITIONS, SIZES, COLORS } from "../utils/constants";

// Mock NGO list
const NGO_LIST = [
  "Helping Hands Foundation",
  "Green Earth NGO",
  "Smile Trust",
  "Cloth Bank India",
  "Hope for All",
];

export default function DonationForm({ onDonationAdded }) {
  const [form, setForm] = useState({
    type: CLOTHING_TYPES[0],
    condition: CONDITIONS[1],
    color: COLORS[2],
    size: SIZES[2],
    season: "All Season",
    quantity: 1,
    pickup: "pickup",
    ngo: NGO_LIST[0],
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allDonations = JSON.parse(localStorage.getItem("mock_donations") || "[]");

    const newDonation = {
      id: Date.now(),
      donorEmail: "donor@example.com", // replace with user from AuthContext
      date: new Date().toLocaleString(),
      ...form,
      status: "submitted",
    };

    localStorage.setItem("mock_donations", JSON.stringify([newDonation, ...allDonations]));
    onDonationAdded(); // refresh history

    // reset form
    setForm({
      type: CLOTHING_TYPES[0],
      condition: CONDITIONS[1],
      color: COLORS[2],
      size: SIZES[2],
      season: "All Season",
      quantity: 1,
      pickup: "pickup",
      ngo: NGO_LIST[0],
      notes: "",
    });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4>Donate Clothes</h4>
        <form onSubmit={handleSubmit} className="vstack gap-3 mt-3">
          <select name="type" className="form-select" value={form.type} onChange={handleChange}>
            {CLOTHING_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select name="condition" className="form-select" value={form.condition} onChange={handleChange}>
            {CONDITIONS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select name="color" className="form-select" value={form.color} onChange={handleChange}>
            {COLORS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select name="size" className="form-select" value={form.size} onChange={handleChange}>
            {SIZES.map((s) => (
              <option key={s}>{s}</option>
            ))}
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
          <select name="ngo" className="form-select" value={form.ngo} onChange={handleChange}>
            {NGO_LIST.map((n) => (
              <option key={n}>{n}</option>
            ))}
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
  );
}
