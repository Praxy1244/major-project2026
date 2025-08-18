export default function ItemCard({ item, onRequest }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.type} • {item.size}</h5>
        <p className="text-muted small">{item.condition} • {item.color}</p>
        {item.notes && <p className="small">{item.notes}</p>}
        <button className="btn btn-primary mt-auto" onClick={() => onRequest(item)}>
          Request
        </button>
      </div>
    </div>
  );
}
