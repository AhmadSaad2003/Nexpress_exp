import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ScenarioOperationnel } from "../../interfaces/cheminoperationnel";
import {CheminStrategique} from "../../interfaces/cheminStrategique";
import {SourceRisque} from "../../interfaces/sourceRisque"

import {createscenarioopp} from "../../services/Atelier4Services/createScenarioOppService";
import {updatescenarioopp} from "../../services/Atelier4Services/updateScenarioOppService";
import {deleteopp} from "../../services/Atelier4Services/deleteScenarioOppService";
import {getscenarioopp} from "../../services/Atelier4Services/getScenarioOppService";
import {getappsource} from "../../services/Atelier2Services/getAppSourceService";
import {getsourcestrat} from "../../services/Atelier3Services/getSourceScenarioStratService";

const Atelier2: React.FC = () => {
    
    
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

        <h4>Scenarios strategique</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {scenarioStrat.length > 0 ? (
            scenarioStrat.map((scenario) => (
              <li
                key={scenario.id}
                onClick={() => handleSelectedScenarioStrat(scenario)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedScenarioStrat && selectedScenarioStrat.id === scenario.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
              >
                {scenario.Intitul || `ScenarioStrat ${scenario.id}`}
              </li>
            ))
          ) : (
            <p>No scenario strategique available.</p>
          )}
        </ul>
        {/* Buttons for updating or deleting */}
        <div
        className="content"
        style={{
          flex: 1,
          padding: "20px",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >

        {selectedScenarioStrat  && (
          <div>
            <h3>Scenario strategique {selectedScenarioStrat.Intitul}</h3>
            <h4>Scenario opperationnels</h4>
            {scenarioOpp.map((scenario) => (
              <div 
              key={scenario.id}
              onClick={() => handleSelectedScenario(scenario)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedScenario &&
                    selectedScenario.id === scenario.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
              >{scenario.Intitul}</div>
            ))}

            <button onClick={() => handleViewScenario()}>
              View Scenario
            </button>
            <button onClick={handleAddScenarioClick}>
              Add Scenario
            </button>
            <button onClick={handleUpdateScenarioClick}>
              Update Scenario
            </button>
            <button onClick={handleDeleteScenarioClick}>
              Delete Scenario
            </button>
          </div>
        )}
      </div>
      </div>


      {/*======================================== Source de risque modals ============================================*/}
      {isAddScenarioModalOpen && (
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
            <h3>Add Scenario</h3>
            <input
              type="text"
              placeholder="Intitule"
              value={newScenarioIntitule}
              onChange={(e) => setNewScenarioIntitule(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="Connaitre"
              value={newScenarioConnaitre}
              onChange={(e) => setNewScenarioConnaitre(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="Rentrer"
              value={newScenarioRentrer}
              onChange={(e) => setNewScenarioRentrer(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="Trouver"
              value={newScenarioTrouver}
              onChange={(e) => setNewScenarioTrouver(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="Exploiter"
              value={newScenarioExploiter}
              onChange={(e) => setNewScenarioExploiter(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="Vraisemblance"
              value={newScenarioVraisemblence}
              onChange={(e) => setNewScenarioVraisemblence(Number(e.target.value))}
              min={1}
              max={4}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleCreateScenario}
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
      {isUpdateScenarioModalOpen && (
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
            <h3>Update Scenario</h3>
            <input
              type="text"
              placeholder="Intitule"
              value={newScenarioIntitule}
              onChange={(e) => setNewScenarioIntitule(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="Connaitre"
              value={newScenarioConnaitre}
              onChange={(e) => setNewScenarioConnaitre(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="Rentrer"
              value={newScenarioRentrer}
              onChange={(e) => setNewScenarioRentrer(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="Trouver"
              value={newScenarioTrouver}
              onChange={(e) => setNewScenarioTrouver(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="Exploiter"
              value={newScenarioExploiter}
              onChange={(e) => setNewScenarioExploiter(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="Vraisemblance"
              value={newScenarioVraisemblence}
              onChange={(e) => setNewScenarioVraisemblence(Number(e.target.value))}
              min={1}
              max={4}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdateScenario}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={() => setUpdateScenarioModalOpen(false)}
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
                onClick={handleDeleteScenario}
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

      {showViewScenarioModal && selectedScenario && (
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
            <button
              onClick={handleCloseViewScenarioModal}
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

    </div>
    );
};

export default Atelier2;
