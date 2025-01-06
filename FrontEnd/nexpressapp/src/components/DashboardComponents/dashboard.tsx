import React, { useState, useEffect } from "react";
import CreateApp from "./createApp";
import ExistingApps from "./existingApp";
import { useNavigate } from "react-router-dom";
import { getapps } from "../../services/DashboardServices/getAppsService";

const Dashboard: React.FC = () => {
  const [view, setView] = useState<"create" | "existing">("create");
  const [apps, setApps] = useState<any[]>([]); // State to hold the apps
  const navigate = useNavigate(); // Hook to navigate after logout

  const handleCreateProject = () => {
    setView("create");
  };

  const handleExistingProjects = async () => {
    setView("existing");

    try {
      const response = await getapps(); // Call API to fetch apps
      setApps(response); // Update the state with fetched apps
    } catch (error) {
      console.error("Error fetching apps:", error);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token or other session data
    navigate("/"); // Redirect to the login page after logout
  };

  return (
    <div className="dashboard" style={{ display: "flex", height: "100vh" }}>
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
        <h3>Menu</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            onClick={handleCreateProject}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            Create New Project
          </li>
          <li
            onClick={handleExistingProjects}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            Existing Projects
          </li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f44336", // Red color for logout button
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Logout
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
        {view === "create" && <CreateApp />}
        {view === "existing" && <ExistingApps apps={apps} />}
      </div>
    </div>
  );
};

export default Dashboard;
