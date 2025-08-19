export default function DonationCard({ donation }) {
  const badge =
    donation.status === 'approved' ? 'success' :
    donation.status === 'rejected' ? 'danger' :
    donation.status === 'requested' ? 'warning' :
    donation.status === 'received' ? 'primary' : 'secondary';

  return (
    <div className="card h-100 shadow-sm rounded-3">
      <div className="card-body">
        <h5 className="card-title mb-1">{donation.type} • {donation.size}</h5>
        <p className="text-muted small mb-2">{donation.condition} • {donation.color}</p>
        {donation.notes && <p className="small mb-2">{donation.notes}</p>}
        <span className={`badge bg-${badge}`}>{donation.status || 'pending'}</span>
      </div>
      <div className="card-footer small text-muted">
        Donor: {donation.donorEmail}
      </div>
    </div>
  );
}
