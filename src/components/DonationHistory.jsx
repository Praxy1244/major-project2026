import DonationCard from './DonationCard';

export default function DonationHistory({ donations = [] }) {
  if (donations.length === 0) return <p className="text-muted">No donations yet.</p>;

  return (
    <div className="row row-cols-1 row-cols-md-2 g-3">
      {donations.map(d => (
        <div className="col" key={d.id}>
          <DonationCard donation={d} />
        </div>
      ))}
    </div>
  );
}
