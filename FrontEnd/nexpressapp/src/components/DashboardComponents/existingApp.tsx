import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveUpdate } from "../../services/DashboardServices/updateAppService";
import { getapps } from "../../services/DashboardServices/getAppsService"; // Import your service to fetch apps
import { deleteApp } from "../../services/DashboardServices/deleteAppService"; // Import the delete app service

const ExistingApps: React.FC<{ apps: any[] }> = ({ apps }) => {
  const [selectedApp, setSelectedApp] = useState<any | null>(null); // State to track the selected app
  const [showViewModal, setShowViewModal] = useState<boolean>(false); // State to control view modal visibility
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false); // State to control update modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); // State to control delete modal visibility
  const [updatedAppData, setUpdatedAppData] = useState<any | null>(null); // State to manage updated app data
  const [appList, setAppList] = useState<any[]>(apps); // Local state for app list
  const navigate = useNavigate();

  // Fetch the app list when the component mounts or after an update
  const fetchApps = async () => {
    try {
      const fetchedApps = await getapps(); // Your service that fetches apps from the backend
      setAppList(fetchedApps);
    } catch (error) {
      console.error("Error fetching apps:", error);
    }
  };

  // Fetch apps initially and after an update
  useEffect(() => {
    fetchApps();
  }, []); // Empty dependency array ensures this runs only once when the component is mounted

  const handleSelectApp = (app: any) => {
    setSelectedApp(app);
    setUpdatedAppData(app); // Initialize the update form with the app's current data
  };

  const handleView = () => {
    if (selectedApp) {
      setShowViewModal(true); // Show the view modal
    } else {
      alert("Please select an app to view.");
    }
  };

  const handleUpdate = () => {
    if (selectedApp) {
      setShowUpdateModal(true); // Show the update modal
    } else {
      alert("Please select an app to update.");
    }
  };

  const handleDelete = () => {
    if (selectedApp) {
      setShowDeleteModal(true); // Show the delete confirmation modal
    } else {
      alert("Please select an app to delete.");
    }
  };

  const handleCloseModal = () => {
    resetState(); // Reset all states when closing the modal
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedAppData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitUpdate = async () => {
    try {
      if (updatedAppData) {
        // Replace the URL with your API endpoint
        const response = await saveUpdate(updatedAppData.id, JSON.stringify(updatedAppData));

        if (response && response.status >= 200 && response.status < 300) {
          alert("App updated successfully!");
          fetchApps(); // Re-fetch apps after the update
          resetState(); // Reset state after successful update
        } else {
          alert("Failed to update app. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error updating app:", error);
      alert("An error occurred while updating the app.");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedApp) {
        // Replace the URL with your actual delete API endpoint
        const response = await deleteApp(selectedApp.id);

        if (response && response.status >= 200 && response.status < 300) {
          alert("App deleted successfully!");
          fetchApps(); // Re-fetch apps after the deletion
          resetState(); // Reset state after successful deletion
        } else {
          alert("Failed to delete app. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error deleting app:", error);
      alert("An error occurred while deleting the app.");
    }
  };

  const handleNavigate = () => {
    if (selectedApp) {
      navigate(`/app-details`, { state: { app: selectedApp } });
    } else {
      alert("Please select an app to proceed.");
    }
  };

  // Reset all relevant states
  const resetState = () => {
    setSelectedApp(null);
    setUpdatedAppData(null);
    setShowViewModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false);
  };

  return (
    <div>
      <h3>Existing Apps</h3>
      {appList.length === 0 ? (
        <p>No apps available</p>
      ) : (
        <div>
          {/* App List */}
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {appList.map((app, index) => (
              <li
                key={index}
                onClick={() => handleSelectApp(app)}
                style={{
                  padding: "10px",
                  margin: "5px 0",
                  cursor: "pointer",
                  backgroundColor:
                    selectedApp && selectedApp.id === app.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                  border: "1px solid #ccc",
                }}
              >
                <strong>{app.name}</strong>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleView}
              style={{
                marginRight: "10px",
                padding: "10px",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              View
            </button>
            <button
              onClick={handleUpdate}
              style={{
                marginRight: "10px",
                padding: "10px",
                backgroundColor: "#ffc107",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Update
            </button>
            <button
              onClick={handleNavigate}
              style={{
                padding: "10px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Go to App
            </button>
            <button
              onClick={handleDelete}
              style={{
                padding: "10px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedApp && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h3>App Details</h3>
            <p>
              <strong>Name:</strong> {selectedApp.name}
            </p>
            <p>
              <strong>Date of Creation:</strong>{" "}
              {new Date(selectedApp.dateofcreation).toLocaleDateString()}
            </p>
            <p>
              <strong>Capital:</strong> {selectedApp.capital}
            </p>
            <button
              onClick={handleCloseModal}
              style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && updatedAppData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
            }}
          >
            <h3>Update App</h3>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={updatedAppData.name}
                  onChange={handleFormChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
              <label>
                Date of Creation:
                <input
                  type="date"
                  name="dateofcreation"
                  value={updatedAppData.dateofcreation.split("T")[0]} // Format to YYYY-MM-DD
                  onChange={handleFormChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
              <label>
                Capital:
                <input
                  type="text"
                  name="capital"
                  value={updatedAppData.capital}
                  onChange={handleFormChange}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </label>
            </form>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleSubmitUpdate}
                style={{
                  marginRight: "10px",
                  padding: "10px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Save Update
              </button>
              <button
                onClick={handleCloseModal}
                style={{
                  padding: "10px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedApp && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this app?</p>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleConfirmDelete}
                style={{
                  marginRight: "10px",
                  padding: "10px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCloseModal}
                style={{
                  padding: "10px",
                  backgroundColor: "#2196f3",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExistingApps;
