import { useState, useEffect } from "react";
import DonationForm from "../components/DonationForm";
import DonationHistory from "../components/DonationHistory";
import { useAuth } from "../context/AuthContext";

export default function DonorDashboard() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);

  // Load donations of this donor
  const loadDonations = () => {
    const allDonations = JSON.parse(localStorage.getItem("mock_donations") || "[]");
    const myDonations = allDonations.filter((d) => d.donorEmail === user.email);
    setDonations(myDonations);
  };

  useEffect(() => {
    loadDonations();
  }, []);

  return (
    <div className="row g-4">
      {/* Form Component */}
      <div className="col-lg-5">
        <DonationForm onDonationAdded={loadDonations} />
      </div>

      {/* History Component */}
      <div className="col-lg-7">
        <DonationHistory donations={donations} onRefresh={loadDonations} />
      </div>
    </div>
  );
}
