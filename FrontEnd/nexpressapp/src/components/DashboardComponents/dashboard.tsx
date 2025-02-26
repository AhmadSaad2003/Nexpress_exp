import React, { useState } from "react";
import CreateApp from "./createApp";
import ExistingApps from "./existingApp";
import { useNavigate } from "react-router-dom";
import { getapps } from "../../services/DashboardServices/getAppsService";
import "../../Style/dashboard.css";

const Dashboard: React.FC = () => {
  const [view, setView] = useState<"create" | "existing">("create");
  const [apps, setApps] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleCreateProject = () => {
    setView("create");
  };

  const handleExistingProjects = async () => {
    setView("existing");
    try {
      const response = await getapps();
      setApps(response);
    } catch (error) {
      console.error("Error fetching apps:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">
        <h3>Menu</h3>
        <ul className="dashboard__menu-list">
          <li className="dashboard__menu-item" onClick={handleCreateProject}>
            Create New Project
          </li>
          <li className="dashboard__menu-item" onClick={handleExistingProjects}>
            Existing Projects
          </li>
        </ul>
        <button className="dashboard__logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="dashboard__content">
        {view === "create" && <CreateApp />}
        {view === "existing" && <ExistingApps apps={apps} />}
      </div>
    </div>
  );
};

export default Dashboard;
