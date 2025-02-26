import React, { useState } from "react";
import Guide from "./GuideComponents/guide";
import Atelier1 from "./Atelier1Components/atelier1";
import Atelier2 from "./Atelier2Components/atelier2";
import Atelier3 from "./Atelier3Components/atelier3";
import Atelier4 from "./Atelier4Components/atelier4";
import Atelier5 from "./Atelier5Components/atelier5";
import { useNavigate, useLocation } from "react-router-dom";
import "../Style/AppDetailsPage.css"

const AppDetailsPage: React.FC = () => {
  const [view, setView] = useState< "guide" | "atelier1" | "atelier2" | "atelier3" | "atelier4" | "atelier5">("guide");
  const navigate = useNavigate();
  const location = useLocation();
  const app = location.state?.app;

  if (!app) {
    return <p>Error: No app data found. Please navigate from the main page.</p>;
  }

  // Navigation handlers
  const handleBackToDashboard = () => navigate("/dashboard");
  const handleGuide = () => setView("guide");
  const handleAtelier1Click = () => setView("atelier1");
  const handleAtelier2Click = () => setView("atelier2");
  const handleAtelier3Click = () => setView("atelier3");
  const handleAtelier4Click = () => setView("atelier4");
  const handleAtelier5Click = () => setView("atelier5");

  return (
    <div className="app-details">
      {/* Left Menu */}
      <div className="app-details__menu">
        <h3>{app.name}</h3>
        <ul>
          <li onClick={handleGuide}>Guide</li>
          <li onClick={handleAtelier1Click}>Atelier 1</li>
          <li onClick={handleAtelier2Click}>Atelier 2</li>
          <li onClick={handleAtelier3Click}>Atelier 3</li>
          <li onClick={handleAtelier4Click}>Atelier 4</li>
          <li onClick={handleAtelier5Click}>Atelier 5</li>
        </ul>
        <button className="back-button" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>

      {/* Right Content */}
      <div className="app-details__content">
        {view === "guide" && <Guide />}
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
