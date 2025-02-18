import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PACS } from "../../interfaces/PACS";

import {createpacs} from "../../services/Atelier5Services/createPacsService";
import {updatepacs} from "../../services/Atelier5Services/updatePacsService";
import {deletepacs} from "../../services/Atelier5Services/deletePacsService";
import {getapppacs} from "../../services/Atelier5Services/getAppPacsService";

const Atelier5: React.FC = () => {
    
    const [pacs, setPacs] = useState<PACS[]>([]);
    const [selectedPACS, setSelectedPACS] = useState<PACS | null>(null);
    const [isAddPACSModalOpen, setAddPACSModalOpen] = useState(false);
    const [newPACSMesureDeSecurite, setNewPACSMesureDeSecurite] = useState("");
    const [newPACSResponsable, setNewPACSResponsable] = useState("");
    const [newPACSDifficulteDeMisEnOeuvre, setNewPACSDifficulteDeMisEnOeuvre] = useState("");
    const [newPACSComplexite, setNewPACSComplexite] = useState(0);
    const [newPACSDureeEcheance, setNewPACSDureeEcheance] = useState(0);
    const [newPACSStatus, setNewPACSStatus] = useState("");
    const [isUpdatePACSModalOpen, setUpdatePACSModalOpen] = useState(false); // Update modal state
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // Delete confirmation modal
    const [showViewPACSModal, setShowViewPACSModal] =useState<boolean>(false);
    

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
          const pacsResponse = await getapppacs(appId);
          setPacs(pacsResponse);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const handleSelectedPacs = (pacs: PACS) => {
          if(selectedPACS != null && selectedPACS.id==pacs.id)
          {
            setSelectedPACS(null);
          }else{
            setSelectedPACS(pacs);
          }
        };

    const handleAddPACSClick = () => {
        setNewPACSMesureDeSecurite("");
        setNewPACSResponsable("");
        setNewPACSDifficulteDeMisEnOeuvre("");
        setNewPACSComplexite(0);
        setNewPACSDureeEcheance(0);
        setNewPACSStatus("");
        setAddPACSModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setAddPACSModalOpen(false);
        setNewPACSMesureDeSecurite("");
        setNewPACSResponsable("");
        setNewPACSDifficulteDeMisEnOeuvre("");
        setNewPACSComplexite(0);
        setNewPACSDureeEcheance(0);
        setNewPACSStatus("");
      };
    
      const handleCreatePACS = async () => {
        if (!newPACSComplexite || 
            !newPACSDifficulteDeMisEnOeuvre.trim() ||
            !newPACSDureeEcheance ||
            !newPACSMesureDeSecurite.trim() ||
            !newPACSResponsable.trim() ||
            !newPACSStatus ||
            !app) {
            alert("Please enter a valid source de risque.");
          return;
        }
    
        try {
          const response = await createpacs(newPACSMesureDeSecurite, newPACSResponsable, newPACSDifficulteDeMisEnOeuvre, newPACSComplexite, newPACSDureeEcheance, newPACSStatus, app.id);
    
          if (response && response.status >= 200 && response.status < 300) {
            alert("PACS created successfully!");
            fetchData(app.id);
            handleCloseModal();
          } else {
            alert("Failed to create PACS. Please try again.");
          }
        } catch (error) {
          console.error("Error creating PACS:", error);
          alert("Failed to create PACS.");
        }
      };
    
      // Update Mission
      const handleUpdatePACSClick = () => {
        if (!selectedPACS) {
          alert("Please select a PACS");
        } else {
          setNewPACSMesureDeSecurite(selectedPACS.MesureDeSecurite || "");
          setNewPACSResponsable(selectedPACS.Responsable || "");
          setNewPACSDifficulteDeMisEnOeuvre(selectedPACS.DifficulteDeMisEnOeuvre || "");
          setNewPACSComplexite(selectedPACS.Complexite || 0);
          setNewPACSDureeEcheance(selectedPACS.DureeEcheance || 0);
          setNewPACSStatus(selectedPACS.Status || "");
          setUpdatePACSModalOpen(true);
        }
      };
    
      const handleUpdatePACS = async () => {
        if (!newPACSComplexite || 
            !newPACSDifficulteDeMisEnOeuvre.trim() ||
            !newPACSDureeEcheance ||
            !newPACSMesureDeSecurite.trim() ||
            !newPACSResponsable.trim() ||
            !newPACSStatus ||
            !selectedPACS) {
          alert("Please fill all the fields.");
          return;
        }
    
        try {
          const response = await updatepacs(
            selectedPACS.id, 
            newPACSMesureDeSecurite,
            newPACSResponsable, 
            newPACSDifficulteDeMisEnOeuvre, 
            newPACSComplexite, 
            newPACSDureeEcheance, 
            newPACSStatus,
            
          );
          if (response && response.status >= 200 && response.status < 300) {
            alert("PACS updated successfully!");
            fetchData(app.id);
            setUpdatePACSModalOpen(false);
          } else {
            alert("Failed to update PACS. Please try again.");
          }
        } catch (error) {
          console.error("Error updating PACS:", error);
          alert("Failed to update PACS.");
        }
      };
    
      // Delete Mission
      const handleDeletePACSClick = () => {
        if (!selectedPACS) {
          alert("Please select a PACS");
        } else {
          setDeleteConfirmationOpen(true);
        }
      };
    
      const handleDeletePACS = async () => {
        if (selectedPACS) {
          try {
            const response = await deletepacs(selectedPACS.id);
            if (response && response.status >= 200 && response.status < 300) {
              alert("PACS deleted successfully!");
              fetchData(app.id);
              setDeleteConfirmationOpen(false);
            } else {
              alert("Failed to delete PACS. Please try again.");
            }
          } catch (error) {
            console.error("Error deleting PACS:", error);
            alert("Failed to delete PACS.");
          }
        }
      };
    
      const handleCloseDeleteConfirmation = () => {
        setDeleteConfirmationOpen(false);
      };

      const handleViewPACS = () => {
        if (selectedPACS) {
          setNewPACSMesureDeSecurite(selectedPACS.MesureDeSecurite);
          setNewPACSResponsable(selectedPACS.Responsable);
          setNewPACSDifficulteDeMisEnOeuvre(selectedPACS.DifficulteDeMisEnOeuvre);
          setNewPACSComplexite(selectedPACS.Complexite);
          setNewPACSDureeEcheance(selectedPACS.DureeEcheance);
          setNewPACSStatus(selectedPACS.Status);
          setShowViewPACSModal(true); // Show the view modal
        } else {
          alert("Please select an PACS to view.");
        }
      };
    
      const handleCloseViewPACSModal = () => {
          setNewPACSMesureDeSecurite("");
          setNewPACSResponsable("");
          setNewPACSDifficulteDeMisEnOeuvre("");
          setNewPACSComplexite(0);
          setNewPACSDureeEcheance(0);
          setNewPACSStatus("");
          setShowViewPACSModal(false); 
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

        <h4>Plan d'amelioration continue de securite "PACS"</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {pacs.length > 0 ? (
            pacs.map((pac) => (
              <li
                key={pac.id}
                onClick={() => handleSelectedPacs(pac)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedPACS && selectedPACS.id === pac.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
              >
                {pac.MesureDeSecurite || `PACS ${pac.id}`}
              </li>
            ))
          ) : (
            <p>No PACS available.</p>
          )}
        </ul>
        {/* Buttons for updating or deleting */}
        <div>
          <button
            onClick={handleViewPACS}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            View PACS
          </button>
          <button
            onClick={handleAddPACSClick}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add PACS
          </button>
          <button
            onClick={handleUpdatePACSClick}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "#ffc107",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Update PACS
          </button>
          <button
            onClick={handleDeletePACSClick}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Delete PACS
          </button>
        </div>
      </div>
      

      {/*======================================== PACS modals ============================================*/}
      {isAddPACSModalOpen && (
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
            <h3>Add PACS</h3>
            <textarea
              placeholder="mesure de securite"
              value={newPACSMesureDeSecurite}
              onChange={(e) => setNewPACSMesureDeSecurite(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="text"
              placeholder="responsable"
              value={newPACSResponsable}
              onChange={(e) => setNewPACSResponsable(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="difficulte de mise en oeuvre"
              value={newPACSDifficulteDeMisEnOeuvre}
              onChange={(e) => setNewPACSDifficulteDeMisEnOeuvre(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="Complexite"
              value={newPACSComplexite}
              onChange={(e) => setNewPACSComplexite(Number(e.target.value))}
              min={1}
              max={4}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="duree d'echeance"
              value={newPACSDureeEcheance}
              onChange={(e) => setNewPACSDureeEcheance(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <select
              value={newPACSStatus}
              onChange={(e) =>
                setNewPACSStatus(
                  e.target.value as "termine" | "a lancer" |"en cours"
                )
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            >
              <option value="termine">termine</option>
              <option value="a lancer">a lancer</option>
              <option value="en cours">en cours</option>
            </select>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleCreatePACS}
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
      {isUpdatePACSModalOpen && (
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
            <h3>Update PACS</h3>
            <textarea
              placeholder="mesure de securite"
              value={newPACSMesureDeSecurite}
              onChange={(e) => setNewPACSMesureDeSecurite(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="text"
              placeholder="responsable"
              value={newPACSResponsable}
              onChange={(e) => setNewPACSResponsable(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="difficulte de mise en oeuvre"
              value={newPACSDifficulteDeMisEnOeuvre}
              onChange={(e) => setNewPACSDifficulteDeMisEnOeuvre(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="Complexite"
              value={newPACSComplexite}
              onChange={(e) => setNewPACSComplexite(Number(e.target.value))}
              min={1}
              max={4}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="duree d'echeance"
              value={newPACSDureeEcheance}
              onChange={(e) => setNewPACSDureeEcheance(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <select
              value={newPACSStatus}
              onChange={(e) =>
                setNewPACSStatus(
                  e.target.value as "termine" | "a lancer" |"en cours"
                )
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            >
              <option value="termine">termine</option>
              <option value="a lancer">a lancer</option>
              <option value="en cours">en cours</option>
            </select>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdatePACS}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={() => setUpdatePACSModalOpen(false)}
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
            <h3>Are you sure you want to delete this PACS?</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleDeletePACS}
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

      {/* View Modal */}
      {showViewPACSModal && selectedPACS && (
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
            <h3>PACS Details</h3>
            <p>
              <strong>Mesure De Securite:</strong> {selectedPACS.MesureDeSecurite}
            </p>
            <p>
              <strong>Responsable:</strong> {selectedPACS.Responsable}
            </p>
            <p>
              <strong>Difficulte De Mis En Oeuvre:</strong> {selectedPACS.DifficulteDeMisEnOeuvre}
            </p>
            <p>
              <strong>Complexite:</strong> {selectedPACS.Complexite}
            </p>
            <p>
              <strong>Duree Echeance:</strong> {selectedPACS.DureeEcheance}
            </p>
            <p>
              <strong>Status:</strong> {selectedPACS.Status}
            </p>
            <button
              onClick={handleCloseViewPACSModal}
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

export default Atelier5;
