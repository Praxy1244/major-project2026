import React from "react";
import heroImage from "../assets/hero.png"; // add your image in src/assets

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left side text */}
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-4 fw-bold text-orange">Clothing donation</h1>
            <p className="lead text-muted">
              Give your unused clothes a second life. Join hands with NGOs and
              make a difference by donating and tracking your contributions.
            </p>
            <button className="btn btn-primary btn-lg shadow">
              Learn More
            </button>
          </div>

          {/* Right side image */}
          <div className="col-md-6 text-center">
            <img
              src={heroImage}
              alt="Clothing Donation"
              className="img-fluid hero-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
