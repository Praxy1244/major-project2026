export default function Home() {
  return (
    <div className="container py-5">
      <div className="p-5 rounded-4 shadow bg-light">
        <h1 className="fw-bold">Smart Clothing Donation Platform</h1>
        <p className="lead text-muted">Donate responsibly. Match efficiently. Help faster.</p>
        <ul className="text-muted mb-0">
          <li>Donors: submit items and track approvals.</li>
          <li>NGOs: browse approved items and request what you need.</li>
          <li>Admin: approve donations and manage requests.</li>
        </ul>
      </div>
    </div>
  );
}
