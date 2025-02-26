import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SourceRisque } from "../../interfaces/sourceRisque";
import "../../Style/atelier2.css";

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

//-----------------------------------------------------------------------------------------------------------------
      return (
        <div className="atelier2-page">
          {/* Sidebar */}
          <div className="atelier2-page__sidebar">
            <h4>Sources de risques</h4>
            <ul className="atelier2-page__source-list">
              {sourceRisque.length > 0 ? (
                sourceRisque.map((source) => (
                  <li
                    key={source.id}
                    className={`atelier2-page__source-item ${
                      selectedSource && selectedSource.id === source.id
                        ? "atelier2-page__source-item--selected"
                        : ""
                    }`}
                    onClick={() => handleSelectedSource(source)}
                  >
                    {source.Name || `Mission ${source.id}`}
                  </li>
                ))
              ) : (
                <p className="atelier2-page__empty-message">
                  No source de risque available.
                </p>
              )}
            </ul>
            <div className="atelier2-page__source-actions">
              <button
                className="atelier2-page__btn atelier2-page__btn--add"
                onClick={handleAddSourceClick}
              >
                Add Source de risque
              </button>
              <button
                className="atelier2-page__btn atelier2-page__btn--update"
                onClick={handleUpdateSourceClick}
              >
                Update source de risque
              </button>
              <button
                className="atelier2-page__btn atelier2-page__btn--delete"
                onClick={handleDeleteSourceClick}
              >
                Delete source de risque
              </button>
            </div>
          </div>
          {/*--------------------------------------------------- source de risque modals------------------------------------------------------*/}
          {/* Modal for Adding Source */}
          {isAddSourceModalOpen && (
            <div className="atelier2-page__modal-overlay">
              <div className="atelier2-page__modal-content">
                <h3>Add Source</h3>
                <input
                  type="text"
                  placeholder="Source name"
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                  className="atelier2-page__modal-input"
                />
                <div className="atelier2-page__modal-actions">
                  <button
                    className="atelier2-page__modal-btn"
                    onClick={handleCreateSource}
                  >
                    Create
                  </button>
                  <button
                    className="atelier2-page__modal-btn"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
    
          {/* Modal for Updating Source */}
          {isUpdateSourceModalOpen && (
            <div className="atelier2-page__modal-overlay">
              <div className="atelier2-page__modal-content">
                <h3>Update Source</h3>
                <input
                  type="text"
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                  className="atelier2-page__modal-input"
                />
                <div className="atelier2-page__modal-actions">
                  <button
                    className="atelier2-page__modal-btn"
                    onClick={handleUpdateSource}
                  >
                    Save
                  </button>
                  <button
                    className="atelier2-page__modal-btn"
                    onClick={() => setUpdateSourceModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
    
          {/* Modal for Delete Confirmation */}
          {isDeleteConfirmationOpen && (
            <div className="atelier2-page__modal-overlay">
              <div className="atelier2-page__modal-content">
                <h3>
                  Are you sure you want to delete this source de risque?
                </h3>
                <div className="atelier2-page__modal-actions">
                  <button
                    className="atelier2-page__modal-btn"
                    onClick={handleDeleteSource}
                  >
                    Yes
                  </button>
                  <button
                    className="atelier2-page__modal-btn"
                    onClick={handleCloseDeleteConfirmation}
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
