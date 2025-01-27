import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SourceRisque } from "../../interfaces/sourceRisque";

import {createsource} from "../../services/Atelier2Services/createSourceService";
import {updatesource} from "../../services/Atelier2Services/updateSourceService";
import {deletesource} from "../../services/Atelier2Services/deleteSourceService";
import {getappsource} from "../../services/Atelier2Services/getAppSourceService";

const Atelier2: React.FC = () => {
    
    const [sourceRisque, setSourceRisques] = useState<SourceRisque[]>([]);
    const [selectedSource, setSelectedSource] = useState<SourceRisque | null>(null);
    const [isAddSourceModalOpen, setAddSourceModalOpen] = useState(false);
    const [newSourceName, setNewSourceName] = useState("");
    const [isUpdateSourceModalOpen, setUpdateSourceModalOpen] = useState(false); // Update modal state
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // Delete confirmation modal
    

    const navigate = useNavigate();
      const location = useLocation();
      const app = location.state?.app;
    
      useEffect(() => {
        if (app) {
          fetchData(app.id);
        }
      }, [app]);
    
      const fetchData = async (appId: number) => {
        try {
          const sourceResponse = await getappsource(appId);
          setSourceRisques(sourceResponse);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const handleSelectedSource = (source: SourceRisque) => {
          if(selectedSource != null && selectedSource.id==source.id)
          {
            setSelectedSource(null);
          }else{
            setSelectedSource(source);
          }
        };

    const handleAddSourceClick = () => {
        setNewSourceName("");
        setAddSourceModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setAddSourceModalOpen(false);
        setNewSourceName("");
      };
    
      const handleCreateSource = async () => {
        if (!newSourceName.trim() || !app) {
          alert("Please enter a valid source de risque.");
          return;
        }
    
        try {
          const response = await createsource(newSourceName, app.id);
    
          if (response && response.status >= 200 && response.status < 300) {
            alert("Source de risque created successfully!");
            fetchData(app.id);
            handleCloseModal();
          } else {
            alert("Failed to create Source de risque. Please try again.");
          }
        } catch (error) {
          console.error("Error creating Source de risque:", error);
          alert("Failed to create Source de risque.");
        }
      };
    
      // Update Mission
      const handleUpdateSourceClick = () => {
        if (!selectedSource) {
          alert("Please select a source de risque");
        } else {
          setNewSourceName(selectedSource.Name || "");
          setUpdateSourceModalOpen(true);
        }
      };
    
      const handleUpdateSource = async () => {
        if (!newSourceName.trim() || !selectedSource) {
          alert("Please enter a valid source de risque name.");
          return;
        }
    
        try {
          const response = await updatesource(
            selectedSource.id,
            newSourceName
          );
          if (response && response.status >= 200 && response.status < 300) {
            alert("Source de ridque updated successfully!");
            fetchData(app.id);
            setUpdateSourceModalOpen(false);
          } else {
            alert("Failed to update Source de risque. Please try again.");
          }
        } catch (error) {
          console.error("Error updating Source de risque:", error);
          alert("Failed to update Source de risque.");
        }
      };
    
      // Delete Mission
      const handleDeleteSourceClick = () => {
        if (!selectedSource) {
          alert("Please select a source de risque");
        } else {
          setDeleteConfirmationOpen(true);
        }
      };
    
      const handleDeleteSource = async () => {
        if (selectedSource) {
          try {
            const response = await deletesource(selectedSource.id);
            if (response && response.status >= 200 && response.status < 300) {
              alert("Source de risque deleted successfully!");
              fetchData(app.id);
              setDeleteConfirmationOpen(false);
            } else {
              alert("Failed to delete Source de risque. Please try again.");
            }
          } catch (error) {
            console.error("Error deleting Source de risque:", error);
            alert("Failed to delete Source de risque.");
          }
        }
      };
    
      const handleCloseDeleteConfirmation = () => {
        setDeleteConfirmationOpen(false);
      };


    return (
        <div className="atelier2-page" style={{ display: "flex", height: "100vh" }}>
      <div
        className="menu"
        style={{
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <h3>{app.name}</h3>
        <p>
          <strong>Created On:</strong>{" "}
          {new Date(app.dateofcreation).toLocaleDateString()}
        </p>

        <h4>Sources de risques</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {sourceRisque.length > 0 ? (
            sourceRisque.map((source) => (
              <li
                key={source.id}
                onClick={() => handleSelectedSource(source)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedSource && selectedSource.id === source.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
              >
                {source.Name || `Mission ${source.id}`}
              </li>
            ))
          ) : (
            <p>No source de risque available.</p>
          )}
        </ul>
        {/* Buttons for updating or deleting */}
        <div>
          <button
            onClick={handleAddSourceClick}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Source de risque
          </button>
          <button
            onClick={handleUpdateSourceClick}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "#ffc107",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Update source de risque
          </button>
          <button
            onClick={handleDeleteSourceClick}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Delete source de risque
          </button>
        </div>
      </div>

      {/*======================================== Source de risque modals ============================================*/}
      {isAddSourceModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Add Source</h3>
            <input
              type="text"
              placeholder="Source name"
              value={newSourceName}
              onChange={(e) => setNewSourceName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleCreateSource}
                style={{ padding: "10px 20px" }}
              >
                Create
              </button>
              <button
                onClick={handleCloseModal}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update source Modal */}
      {isUpdateSourceModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Update Source</h3>
            <input
              type="text"
              value={newSourceName}
              onChange={(e) => setNewSourceName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdateSource}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={() => setUpdateSourceModalOpen(false)}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmationOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Are you sure you want to delete this source de risque?</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleDeleteSource}
                style={{ padding: "10px 20px" }}
              >
                Yes
              </button>
              <button
                onClick={handleCloseDeleteConfirmation}
                style={{ padding: "10px 20px" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    );
};

export default Atelier2;
