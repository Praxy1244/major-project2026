export default function ItemCard({ item, onRequest }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h6 className="card-title">{item.type}</h6>
        <p className="card-text text-muted">Size: {item.size}</p>
        <p className="card-text">
          <small className="text-muted">Donor: {item.donorEmail}</small>
        </p>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => onRequest(item)}
        >
          Request
        </button>
      </div>
    </div>
  );
}
