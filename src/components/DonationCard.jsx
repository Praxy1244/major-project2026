export default function DonationCard({ donation }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title">
          {donation.type} • {donation.size}
        </h5>
        <p className="text-muted small">{donation.condition} • {donation.color}</p>
        {donation.notes && <p className="small">{donation.notes}</p>}
        <span className="badge bg-secondary">{donation.status}</span>
      </div>
    </div>
  );
}
