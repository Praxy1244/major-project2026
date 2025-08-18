export default function DonationCard({ donation }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title">{donation.type}</h5>
        <p className="card-text mb-1"><strong>Condition:</strong> {donation.condition}</p>
        <p className="card-text mb-1"><strong>Color:</strong> {donation.color}</p>
        <p className="card-text mb-1"><strong>Size:</strong> {donation.size}</p>
        <p className="card-text mb-1"><strong>Season:</strong> {donation.season}</p>
        <p className="card-text mb-1"><strong>Quantity:</strong> {donation.quantity}</p>
        <p className="card-text mb-1"><strong>Pickup Preference:</strong> 
          {donation.pickup === 'pickup' ? ' Pickup Requested' : ' Drop-off at NGO'}
        </p>
        <p className="card-text mb-1"><strong>Chosen NGO:</strong> {donation.ngo}</p>

        {donation.notes && (
          <p className="card-text"><strong>Notes:</strong> {donation.notes}</p>
        )}

        <p className="card-text">
          <small className="text-muted">Donated on: {donation.date}</small>
        </p>

        <span
          className={`badge ${
            donation.status === 'approved'
              ? 'bg-success'
              : donation.status === 'pending'
              ? 'bg-warning text-dark'
              : 'bg-secondary'
          }`}
        >
          {donation.status || 'submitted'}
        </span>
      </div>
    </div>
  );
}
