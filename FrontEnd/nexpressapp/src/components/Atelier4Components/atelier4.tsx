import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ScenarioOperationnel } from "../../interfaces/cheminoperationnel";
import {CheminStrategique} from "../../interfaces/cheminStrategique";
import {SourceRisque} from "../../interfaces/sourceRisque";
import "../../Style/atelier4.css";

import {createscenarioopp} from "../../services/Atelier4Services/createScenarioOppService";
import {updatescenarioopp} from "../../services/Atelier4Services/updateScenarioOppService";
import {deleteopp} from "../../services/Atelier4Services/deleteScenarioOppService";
import {getscenarioopp} from "../../services/Atelier4Services/getScenarioOppService";
import {getappsource} from "../../services/Atelier2Services/getAppSourceService";
import {getsourcestrat} from "../../services/Atelier3Services/getSourceScenarioStratService";

const Atelier4: React.FC = () => {
    
    
    const [sourceRisques, setSourceRisques] = useState<SourceRisque[]>([]);
    const [scenarioStrat, setscenarioStrat] = useState<CheminStrategique[]>([]);
    const [selectedScenarioStrat, setSelectedScenarioStrat] = useState<CheminStrategique | null>(null);
    const [scenarioOpp, setscenarioOpp] = useState<ScenarioOperationnel[]>([]);
    const [selectedScenario, setSelectedScenario] = useState<ScenarioOperationnel | null>(null);
    const [isAddScenarioModalOpen, setAddScenarioModalOpen] = useState(false);
    const [newScenarioIntitule, setNewScenarioIntitule] = useState("");
    const [newScenarioConnaitre, setNewScenarioConnaitre] = useState("");
    const [newScenarioRentrer, setNewScenarioRentrer] = useState("");
    const [newScenarioTrouver, setNewScenarioTrouver] = useState("");
    const [newScenarioExploiter, setNewScenarioExploiter] = useState("");
    const [newScenarioVraisemblence, setNewScenarioVraisemblence] = useState(0);
    const [isUpdateScenarioModalOpen, setUpdateScenarioModalOpen] = useState(false); // Update modal state
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // Delete confirmation modal
    const [showViewScenarioModal, setShowViewScenarioModal] =
      useState<boolean>(false);
    

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
          // Fetch data for each source
          const scenarioStratResponses = await Promise.all(
            sourceResponse.map((source) => getsourcestrat(source.id))
          );
      
          // Flatten and update state
          setscenarioStrat(scenarioStratResponses.flat());
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const handleSelectedScenarioStrat= async(scenario:CheminStrategique)=>{
        if(selectedScenarioStrat != null && selectedScenarioStrat.id==scenario.id)
            {
              setSelectedScenarioStrat(null);
            }else{
              setSelectedScenarioStrat(scenario);
              const scenarioResponse = await getscenarioopp(scenario.id);
                setscenarioOpp(scenarioResponse);
            }
      }
      

      const handleSelectedScenario = (scenario: ScenarioOperationnel) => {
          if(selectedScenario != null && selectedScenario.id==scenario.id)
          {
            setSelectedScenario(null);
          }else{
            setSelectedScenario(scenario);
          }
        };

    const handleAddScenarioClick = () => {
        setNewScenarioIntitule("");
        setNewScenarioConnaitre("");
        setNewScenarioExploiter("");
        setNewScenarioTrouver("");
        setNewScenarioRentrer("");
        setNewScenarioVraisemblence(0);
        setAddScenarioModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setAddScenarioModalOpen(false);
        setNewScenarioIntitule("");
        setNewScenarioConnaitre("");
        setNewScenarioExploiter("");
        setNewScenarioTrouver("");
        setNewScenarioRentrer("");
        setNewScenarioVraisemblence(0);
      };
    
      const handleCreateScenario = async () => {
        if (!newScenarioIntitule.trim() || 
        !newScenarioConnaitre.trim() ||
        !newScenarioRentrer.trim() ||
        !newScenarioTrouver.trim() ||
        !newScenarioExploiter.trim() ||
        !newScenarioVraisemblence ||
        !selectedScenarioStrat) {
          alert("Please enter a valid scenario opperationnel.");
          return;
        }
    
        try {
          const response = await createscenarioopp(newScenarioIntitule,selectedScenarioStrat.id, newScenarioConnaitre, newScenarioRentrer, newScenarioTrouver, newScenarioExploiter, newScenarioVraisemblence);
    
          if (response && response.status >= 200 && response.status < 300) {
            alert("Scenario opperationnel created successfully!");
            handleSelectedScenarioStrat(selectedScenarioStrat);
            handleCloseModal();
          } else {
            alert("Failed to create Scenario opperationnel. Please try again.");
          }
        } catch (error) {
          console.error("Error creating Scenario opperationnel:", error);
          alert("Failed to create Scenario opperationnel.");
        }
      };
    
      // Update Mission
      const handleUpdateScenarioClick = () => {
        if (!selectedScenario) {
          alert("Please select a scenario");
        } else {
          setNewScenarioIntitule(selectedScenario.Intitul || "");
          setNewScenarioTrouver(selectedScenario.Trouver || "");
          setNewScenarioExploiter(selectedScenario.Exploiter || "");
          setNewScenarioRentrer(selectedScenario.Rentrer || "");
          setNewScenarioConnaitre(selectedScenario.Connaitre || "");
          setNewScenarioVraisemblence(Number(selectedScenario.Vraisemblence) || 0);
          setUpdateScenarioModalOpen(true);
        }
      };
    
      const handleUpdateScenario = async () => {
        if (!newScenarioIntitule.trim() || 
            !newScenarioConnaitre.trim() ||
            !newScenarioRentrer.trim() ||
            !newScenarioTrouver.trim() ||
            !newScenarioExploiter.trim() ||
            !newScenarioVraisemblence ||
            !selectedScenario) {
          alert("Please enter a valid scrnario values");
          return;
        }
    
        try {
          const response = await updatescenarioopp(
            newScenarioIntitule, newScenarioConnaitre, newScenarioRentrer, newScenarioTrouver, newScenarioExploiter, newScenarioVraisemblence,selectedScenario.id
          );
          if (response && response.status >= 200 && response.status < 300) {
            alert("Scenario opeerationnel updated successfully!");
            if (selectedScenarioStrat) handleSelectedScenarioStrat(selectedScenarioStrat);
            setUpdateScenarioModalOpen(false);
          } else {
            alert("Failed to update Scenario operationnel. Please try again.");
          }
        } catch (error) {
          console.error("Error updating Scenario operationnel:", error);
          alert("Failed to update Scenario operationnel.");
        }
      };
    
      // Delete Mission
      const handleDeleteScenarioClick = () => {
        if (!selectedScenario) {
          alert("Please select a scenario");
        } else {
          setDeleteConfirmationOpen(true);
        }
      };
    
      const handleDeleteScenario = async () => {
        if (selectedScenario) {
          try {
            const response = await deleteopp(selectedScenario.id);
            if (response && response.status >= 200 && response.status < 300) {
              alert("Scenario operationnel deleted successfully!");
              fetchData(app.id);
              setDeleteConfirmationOpen(false);
            } else {
              alert("Failed to delete Scenario operationnel. Please try again.");
            }
          } catch (error) {
            console.error("Error deleting Scenario operationnel:", error);
            alert("Failed to delete Scenario operationnel.");
          }
        }
      };
    
      const handleCloseDeleteConfirmation = () => {
        setDeleteConfirmationOpen(false);
      };

      const handleViewScenario = () => {
        if (selectedScenario) {
          setShowViewScenarioModal(true); // Show the view modal
        } else {
          alert("Please select an scenario to view.");
        }
      };
    
      const handleCloseViewScenarioModal = () => {
        setShowViewScenarioModal(false); // Reset all states when closing the modal
      };


      return (
        <div className="atelier4-page">    
          <section className="atelier4-page__content">
            <div className="atelier4-page__section">
              <h3>Scénarios Stratégiques</h3>
              <ul className="atelier4-page__list">
                {scenarioStrat.length > 0 ? (
                  scenarioStrat.map((scenario) => (
                    <li
                      key={scenario.id}
                      className={`atelier4-page__list-item ${
                        selectedScenarioStrat && selectedScenarioStrat.id === scenario.id
                          ? "atelier4-page__list-item--selected"
                          : ""
                      }`}
                      onClick={() => handleSelectedScenarioStrat(scenario)}
                    >
                      {scenario.Intitul || `Scenario ${scenario.id}`}
                    </li>
                  ))
                ) : (
                  <p className="atelier4-page__empty-message">
                    No scenario stratégique available.
                  </p>
                )}
              </ul>
            </div>
    
            {selectedScenarioStrat && (
              <div className="atelier4-page__section">
                <h3>Operational Scenarios for {selectedScenarioStrat.Intitul}</h3>
                {scenarioOpp.map((scenario) => (
                  <div
                    key={scenario.id}
                    className={`atelier4-page__list-item ${
                      selectedScenario && selectedScenario.id === scenario.id
                        ? "atelier4-page__list-item--selected"
                        : ""
                    }`}
                    onClick={() => handleSelectedScenario(scenario)}
                  >
                    {scenario.Intitul}
                  </div>
                ))}
    
                <div className="atelier4-page__btn-group">
                  <button
                    className="atelier4-page__btn atelier4-page__btn--primary"
                    onClick={handleViewScenario}
                  >
                    View Scenario
                  </button>
                  <button
                    className="atelier4-page__btn atelier4-page__btn--add"
                    onClick={handleAddScenarioClick}
                  >
                    Add Scenario
                  </button>
                  <button
                    className="atelier4-page__btn atelier4-page__btn--secondary"
                    onClick={handleUpdateScenarioClick}
                  >
                    Update Scenario
                  </button>
                  <button
                    className="atelier4-page__btn atelier4-page__btn--danger"
                    onClick={handleDeleteScenarioClick}
                  >
                    Delete Scenario
                  </button>
                </div>
              </div>
            )}
          </section>

          
          {/*===========================================scenario opperationnel modals================================================*/}

          {/* Add Scenario Modal */}
          {isAddScenarioModalOpen && (
            <div className="atelier4-page__modal-overlay">
              <div className="atelier4-page__modal-content">
                <h3>Add Scenario</h3>
                <input
                  type="text"
                  placeholder="Intitulé"
                  value={newScenarioIntitule}
                  onChange={(e) => setNewScenarioIntitule(e.target.value)}
                  className="atelier4-page__modal-input"
                />
                <textarea
                  placeholder="Connaitre"
                  value={newScenarioConnaitre}
                  onChange={(e) => setNewScenarioConnaitre(e.target.value)}
                  className="atelier4-page__modal-input"
                />
                <textarea
                  placeholder="Rentrer"
                  value={newScenarioRentrer}
                  onChange={(e) => setNewScenarioRentrer(e.target.value)}
                  className="atelier4-page__modal-input"
                />
                <textarea
                  placeholder="Trouver"
                  value={newScenarioTrouver}
                  onChange={(e) => setNewScenarioTrouver(e.target.value)}
                  className="atelier4-page__modal-input"
                />
                <textarea
                  placeholder="Exploiter"
                  value={newScenarioExploiter}
                  onChange={(e) => setNewScenarioExploiter(e.target.value)}
                  className="atelier4-page__modal-input"
                />
                <input
                  type="number"
                  placeholder="Vraisemblance"
                  value={newScenarioVraisemblence}
                  onChange={(e) =>
                    setNewScenarioVraisemblence(Number(e.target.value))
                  }
                  min={1}
                  max={4}
                  className="atelier4-page__modal-input"
                />
                <div className="atelier4-page__modal-actions">
                  <button
                    className="atelier4-page__modal-btn"
                    onClick={handleCreateScenario}
                  >
                    Create
                  </button>
                  <button
                    className="atelier4-page__modal-btn"
                    onClick={() => setAddScenarioModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
    
          {/* Update Scenario Modal */}
          {isUpdateScenarioModalOpen && (
            <div className="atelier4-page__modal-overlay">
              <div className="atelier4-page__modal-content">
                <h3>Update Scenario</h3>
                <input
                  type="text"
                  placeholder="Intitulé"
                  value={newScenarioIntitule}
                  onChange={(e) => setNewScenarioIntitule(e.target.value)}
                  className="atelier4-page__modal-input"
                />
                <textarea
                  placeholder="Connaitre"
                  value={newScenarioConnaitre}
                  onChange={(e) => setNewScenarioConnaitre(e.target.value)}
                  className="atelier4-page__modal-input"
                />
                <textarea
                  placeholder="Rentrer"
                  value={newScenarioRentrer}
                  onChange={(e) => setNewScenarioRentrer(e.target.value)}
                  className="atelier4-page__modal-input"
                />
                <textarea
                  placeholder="Trouver"
                  value={newScenarioTrouver}
                  onChange={(e) => setNewScenarioTrouver(e.target.value)}
                  className="atelier4-page__modal-input"
                />
                <textarea
                  placeholder="Exploiter"
                  value={newScenarioExploiter}
                  onChange={(e) => setNewScenarioExploiter(e.target.value)}
                  className="atelier4-page__modal-input"
                />
                <input
                  type="number"
                  placeholder="Vraisemblance"
                  value={newScenarioVraisemblence}
                  onChange={(e) =>
                    setNewScenarioVraisemblence(Number(e.target.value))
                  }
                  min={1}
                  max={4}
                  className="atelier4-page__modal-input"
                />
                <div className="atelier4-page__modal-actions">
                  <button
                    className="atelier4-page__modal-btn"
                    onClick={handleUpdateScenario}
                  >
                    Save
                  </button>
                  <button
                    className="atelier4-page__modal-btn"
                    onClick={() => setUpdateScenarioModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
    
          {/* View Scenario Modal */}
          {showViewScenarioModal && selectedScenario && (
            <div className="atelier4-page__modal-overlay">
              <div className="atelier4-page__modal-content">
                <h3>Scenario Details</h3>
                <p>
                  <strong>Intitul:</strong> {selectedScenario.Intitul}
                </p>
                <p>
                  <strong>Connaitre:</strong> {selectedScenario.Connaitre}
                </p>
                <p>
                  <strong>Rentrer:</strong> {selectedScenario.Rentrer}
                </p>
                <p>
                  <strong>Trouver:</strong> {selectedScenario.Trouver}
                </p>
                <p>
                  <strong>Exploiter:</strong> {selectedScenario.Exploiter}
                </p>
                <p>
                  <strong>Vraisemblence:</strong> {selectedScenario.Vraisemblence}
                </p>
                <div className="atelier4-page__modal-actions">
                  <button
                    className="atelier4-page__modal-btn"
                    onClick={handleCloseViewScenarioModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
    
          {/* Delete Scenario Modal */}
          {isDeleteConfirmationOpen && (
            <div className="atelier4-page__modal-overlay">
              <div className="atelier4-page__modal-content">
                <h3>Delete Scenario</h3>
                <p>Are you sure you want to delete this scenario?</p>
                <div className="atelier4-page__modal-actions">
                  <button
                    className="atelier4-page__modal-btn"
                    onClick={handleDeleteScenario}
                  >
                    Yes, Delete
                  </button>
                  <button
                    className="atelier4-page__modal-btn"
                    onClick={() => setDeleteConfirmationOpen(false)}
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

export default Atelier4;
