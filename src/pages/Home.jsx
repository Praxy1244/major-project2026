import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center bg-light py-5">
        <div className="container-fluid">
          <h1 className="display-4 fw-bold">Donate Clothes. Not Money.</h1>
          <p className="lead mt-3">
            Join hands to make a difference by donating clothes directly to NGOs & people in need.
          </p>
          <Link to="/donor">
            <button className="btn btn-success btn-lg mt-3">Start Donating</button>
          </Link>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-5">
        <div className="container-fluid">
          <h2 className="mb-4">Ongoing Campaigns</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {[1, 2, 3].map((c) => (
              <div className="col" key={c}>
                <div className="card shadow-sm h-100">
                  <img
                    src={`https://placehold.co/400x200?text=NGO+Campaign+${c}`}
                    className="card-img-top"
                    alt="campaign"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Campaign {c}</h5>
                    <p className="card-text">
                      Help us distribute winter clothes to underprivileged children.
                    </p>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${c * 30}%` }}
                      >
                        {c * 30}%
                      </div>
                    </div>
                    <button className="btn btn-outline-success btn-sm">
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-light py-5">
        <div className="container-fluid text-center">
          <h2 className="mb-4">How It Works</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <h5>1. Choose a Cause</h5>
              <p>Select a campaign started by an NGO.</p>
            </div>
            <div className="col-md-3">
              <h5>2. Donate Products</h5>
              <p>Pick clothes/items from the NGO’s wishlist.</p>
            </div>
            <div className="col-md-3">
              <h5>3. Track Delivery</h5>
              <p>Stay updated until the NGO receives them.</p>
            </div>
            <div className="col-md-3">
              <h5>4. See the Impact</h5>
              <p>Get updates, stories & proof of your impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-5 text-center">
        <div className="container-fluid">
          <h2 className="mb-4">Our Impact</h2>
          <div className="row">
            <div className="col-md-3"><h3>50+</h3><p>NGOs Supported</p></div>
            <div className="col-md-3"><h3>5K+</h3><p>Donors</p></div>
            <div className="col-md-3"><h3>10K+</h3><p>Clothes Donated</p></div>
            <div className="col-md-3"><h3>₹20L+</h3><p>Worth of Donations</p></div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-success text-white text-center py-5">
        <div className="container-fluid">
          <h2>Are you an NGO?</h2>
          <p className="lead">Start a campaign today and connect with donors easily.</p>
          <Link to="/signup">
            <button className="btn btn-light btn-lg">Start a Campaign</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
