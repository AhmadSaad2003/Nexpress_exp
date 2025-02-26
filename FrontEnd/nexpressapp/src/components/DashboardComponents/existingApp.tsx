import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveUpdate } from "../../services/DashboardServices/updateAppService";
import { getapps } from "../../services/DashboardServices/getAppsService";
import { deleteApp } from "../../services/DashboardServices/deleteAppService";
import "../../Style/ExistingApps.css";

const ExistingApps: React.FC<{ apps: any[] }> = ({ apps }) => {
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [updatedAppData, setUpdatedAppData] = useState<any | null>(null);
  const [appList, setAppList] = useState<any[]>(apps);
  const navigate = useNavigate();

  const fetchApps = async () => {
    try {
      const fetchedApps = await getapps();
      setAppList(fetchedApps);
    } catch (error) {
      console.error("Error fetching apps:", error);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleSelectApp = (app: any) => {
    setSelectedApp(app);
    setUpdatedAppData(app);
  };

  const handleView = () => {
    if (selectedApp) {
      setShowViewModal(true);
    } else {
      alert("Please select an app to view.");
    }
  };

  const handleUpdate = () => {
    if (selectedApp) {
      setShowUpdateModal(true);
    } else {
      alert("Please select an app to update.");
    }
  };

  const handleDelete = () => {
    if (selectedApp) {
      setShowDeleteModal(true);
    } else {
      alert("Please select an app to delete.");
    }
  };

  const handleCloseModal = () => {
    resetState();
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
        const response = await saveUpdate(
          updatedAppData.id,
          JSON.stringify(updatedAppData)
        );
        if (response && response.status >= 200 && response.status < 300) {
          alert("App updated successfully!");
          fetchApps();
          resetState();
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
        const response = await deleteApp(selectedApp.id);
        if (response && response.status >= 200 && response.status < 300) {
          alert("App deleted successfully!");
          fetchApps();
          resetState();
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

  const resetState = () => {
    setSelectedApp(null);
    setUpdatedAppData(null);
    setShowViewModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false);
  };

  return (
    <div className="existing-apps">
      <h3>Existing Apps</h3>
      {appList.length === 0 ? (
        <p>No apps available</p>
      ) : (
        <div>
          <ul className="existing-apps__list">
            {appList.map((app, index) => (
              <li
                key={index}
                onClick={() => handleSelectApp(app)}
                className={`existing-apps__list-item ${
                  selectedApp && selectedApp.id === app.id
                    ? "existing-apps__list-item--selected"
                    : ""
                }`}
              >
                <strong>{app.name}</strong>
              </li>
            ))}
          </ul>
          <div className="existing-apps__actions">
            <button
              className="existing-apps__btn existing-apps__btn--view"
              onClick={handleView}
            >
              View
            </button>
            <button
              className="existing-apps__btn existing-apps__btn--update"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="existing-apps__btn existing-apps__btn--navigate"
              onClick={handleNavigate}
            >
              Go to App
            </button>
            <button
              className="existing-apps__btn existing-apps__btn--delete"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {showViewModal && selectedApp && (
        <div className="modal">
          <div className="modal__dialog">
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
            <button className="modal__btn" onClick={handleCloseModal}>
              Back
            </button>
          </div>
        </div>
      )}

      {showUpdateModal && updatedAppData && (
        <div className="modal">
          <div className="modal__dialog">
            <h3>Update App</h3>
            <form className="modal__form">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={updatedAppData.name}
                  onChange={handleFormChange}
                  className="modal__input"
                />
              </label>
              <label>
                Date of Creation:
                <input
                  type="date"
                  name="dateofcreation"
                  value={updatedAppData.dateofcreation.split("T")[0]}
                  onChange={handleFormChange}
                  className="modal__input"
                />
              </label>
              <label>
                Capital:
                <input
                  type="text"
                  name="capital"
                  value={updatedAppData.capital}
                  onChange={handleFormChange}
                  className="modal__input"
                />
              </label>
            </form>
            <div className="modal__actions">
              <button
                className="modal__btn modal__btn--save"
                onClick={handleSubmitUpdate}
              >
                Save Update
              </button>
              <button
                className="modal__btn modal__btn--cancel"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && selectedApp && (
        <div className="modal">
          <div className="modal__dialog">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this app?</p>
            <div className="modal__actions">
              <button
                className="modal__btn modal__btn--delete"
                onClick={handleConfirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="modal__btn modal__btn--cancel"
                onClick={handleCloseModal}
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
