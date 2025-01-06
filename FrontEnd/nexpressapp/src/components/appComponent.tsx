import React, { useState } from "react";
import Atelier1 from "./Atelier1Components/atelier1";
import Atelier2 from "./Atelier2Components/atelier2";
import Atelier3 from "./Atelier3Components/atelier3";
import Atelier4 from "./Atelier4Components/atelier4";
import Atelier5 from "./Atelier5Components/atelier5";
import { useNavigate, useLocation } from "react-router-dom";

const AppDetailsPage: React.FC = () => {
  const [view, setView] = useState<"atelier1" | "atelier2" | "atelier3" | "atelier4" | "atelier5">("atelier1");
  const navigate = useNavigate();
  const location = useLocation();
  const app = location.state?.app;

  if (!app) {
    return <p>Error: No app data found. Please navigate from the main page.</p>;
  }

  // Handle navigation to dashboard
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  // Individual handlers for each menu item
  const handleAtelier1Click = () => {
    setView("atelier1");
  };

  const handleAtelier2Click = () => {
    setView("atelier2");
  };

  const handleAtelier3Click = () => {
    setView("atelier3");
  };

  const handleAtelier4Click = () => {
    setView("atelier4");
  };

  const handleAtelier5Click = () => {
    setView("atelier5");
  };

  return (
    <div className="app-details-page" style={{ display: "flex", height: "100vh" }}>
      {/* Left Menu */}
      <div
        className="menu"
        style={{
          width: "20%",
          borderRight: "1px solid #ccc",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <h3>{app.name}</h3>
        <p><strong>Created On:</strong> {new Date(app.dateofcreation).toLocaleDateString()}</p>

        <h4>Menu</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            onClick={handleAtelier1Click}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            Atelier 1
          </li>
          <li
            onClick={handleAtelier2Click}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            Atelier 2
          </li>
          <li
            onClick={handleAtelier3Click}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            Atelier 3
          </li>
          <li
            onClick={handleAtelier4Click}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            Atelier 4
          </li>
          <li
            onClick={handleAtelier5Click}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            Atelier 5
          </li>
        </ul>

        {/* Back Button */}
        <button
          onClick={handleBackToDashboard}
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#2196f3", // Blue color for back button
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Back to Dashboard
        </button>
      </div>

      {/* Right Content */}
      <div
        className="content"
        style={{
          flex: 1,
          padding: "20px",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        {view === "atelier1" && <Atelier1 />}
        {view === "atelier2" && <Atelier2 />}
        {view === "atelier3" && <Atelier3 />}
        {view === "atelier4" && <Atelier4 />}
        {view === "atelier5" && <Atelier5 />}
      </div>
    </div>
  );
};

export default AppDetailsPage;
