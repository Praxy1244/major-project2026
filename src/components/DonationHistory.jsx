import { useState } from "react";
import DonationCard from "./DonationCard";

export default function DonationHistory({ donations, onRefresh }) {
  const [filter, setFilter] = useState("all");

  const filteredDonations = donations.filter((d) => {
    if (filter === "all") return true;
    return d.status === filter;
  });

  return (
    <div>
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
          <button className="btn btn-sm btn-outline-secondary" onClick={onRefresh}>
            Refresh
          </button>
        </div>
      </div>

      {filteredDonations.length === 0 && (
        <p className="mt-3 text-muted">No donations match this filter.</p>
      )}

      <div className="row row-cols-1 row-cols-md-2 g-3 mt-2">
        {filteredDonations.map((d) => (
          <div className="col" key={d.id}>
            <DonationCard donation={d} />
          </div>
        ))}
      </div>
    </div>
  );
}
