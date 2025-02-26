import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PACS } from "../../interfaces/PACS";
import { EvenementRedoute } from "../../interfaces/evenementRedoute";
import { CheminStrategique } from "../../interfaces/cheminStrategique";
import { ScenarioOperationnel } from "../../interfaces/cheminoperationnel";
import { createpacs } from "../../services/Atelier5Services/createPacsService";
import { updatepacs } from "../../services/Atelier5Services/updatePacsService";
import { deletepacs } from "../../services/Atelier5Services/deletePacsService";
import { getapppacs } from "../../services/Atelier5Services/getAppPacsService";
import "../../Style/atelier5.css";

//source de risque
import { getappsource } from "../../services/Atelier2Services/getAppSourceService";
//mission
import { getappmissions } from "../../services/Atelier1Services/getAppMissionsService";
//evenement redoute
import { getvaleurevent } from "../../services/Atelier1Services/getValeurEventsService";
//valeur metier
import { getmissionvaleurmetier } from "../../services/Atelier1Services/getValeurMetierService"

import {getsourcestrat} from "../../services/Atelier3Services/getSourceScenarioStratService";

import {getscenarioopp} from "../../services/Atelier4Services/getScenarioOppService";

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
  const [isUpdatePACSModalOpen, setUpdatePACSModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [showViewPACSModal, setShowViewPACSModal] = useState<boolean>(false);
  const [evenements, setEvenements] = useState<EvenementRedoute[]>([]);
  const [scenarioStrat, setscenarioStrat] = useState<CheminStrategique[]>([]);
  const [scenarioOpp, setscenarioOpp] = useState<ScenarioOperationnel[]>([]);
  const [scenarioGroups, setScenarioGroups] = useState({});


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

        const sourceResponse = await getappsource(appId);

        // Fetch data for each source
        const scenarioStratResponses = await Promise.all(
            sourceResponse.map((source) => getsourcestrat(source.id))
        );

        // Flatten the array
        const flatScenarioStrat = scenarioStratResponses.flat();
        setscenarioStrat(flatScenarioStrat);

        // Fetch scenario opportunities
        const scenarioResponse = await Promise.all(
            flatScenarioStrat.map((scenario) => getscenarioopp(scenario.id))
        );

        const flatScenarioOpp = scenarioResponse.flat();
        setscenarioOpp(flatScenarioOpp);

        // Create Map with Defensive Check
        const scenarioStratMap = new Map(flatScenarioStrat.map(s => [s.id, s]));

        const newscenarioGroups = {};

        flatScenarioOpp.forEach(scenario => {
            
            const strat = scenarioStratMap.get(scenario.IdCheminStrategique);
            
            if (!strat) {
                console.warn(`No scenarioStrat found for IdCheminStrategique: ${scenario.IdCheminStrategique}`);
                return;
            }

            const gravite = strat.Gravite ?? "Undefined";
            const vraisemblance = scenario.Vraisemblence ?? "Undefined";

            if (gravite === "Undefined" || vraisemblance === "Undefined") {
                console.warn(`Skipping scenario due to undefined values -> Gravite: ${gravite}, Vraisemblance: ${vraisemblance}`);
                return;
            }

            // Ensuring values are within range
            if (gravite < 1 || gravite > 4 || vraisemblance < 1 || vraisemblance > 4) return;

            const key = `G${gravite}_V${vraisemblance}`;

            if (!newscenarioGroups[key]) {
                newscenarioGroups[key] = [];
            }
            newscenarioGroups[key].push(scenario.Intitul);
        });
        setScenarioGroups(newscenarioGroups);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const getCellColor = (gravite, vraisemblance) => {
  const key = `G${gravite}_V${vraisemblance}`;

  const greenCells = ["G1_V1", "G1_V2", "G2_V1", "G2_V2", "G3_V1"];
  const orangeCells = ["G1_V1", "G1_V4", "G1_V3", "G2_V3", "G3_V2", "G4_V1", "G4_V2"];
  const redCells = ["G2_V4", "G3_V3", "G3_V4", "G4_V3", "G4_V4"];

  if (greenCells.includes(key)) return "cell-green";
  if (orangeCells.includes(key)) return "cell-orange";
  if (redCells.includes(key)) return "cell-red";

  return ""; // Pas de couleur par défaut
};


  const handleSelectedPacs = (pacs: PACS) => {
    if (selectedPACS && selectedPACS.id === pacs.id) {
      setSelectedPACS(null);
    } else {
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
    if (
      !newPACSComplexite ||
      !newPACSDifficulteDeMisEnOeuvre.trim() ||
      !newPACSDureeEcheance ||
      !newPACSMesureDeSecurite.trim() ||
      !newPACSResponsable.trim() ||
      !newPACSStatus ||
      !app
    ) {
      alert("Please enter a valid PACS.");
      return;
    }
    try {
      const response = await createpacs(
        newPACSMesureDeSecurite,
        newPACSResponsable,
        newPACSDifficulteDeMisEnOeuvre,
        newPACSComplexite,
        newPACSDureeEcheance,
        newPACSStatus,
        app.id
      );
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
    if (
      !newPACSComplexite ||
      !newPACSDifficulteDeMisEnOeuvre.trim() ||
      !newPACSDureeEcheance ||
      !newPACSMesureDeSecurite.trim() ||
      !newPACSResponsable.trim() ||
      !newPACSStatus ||
      !selectedPACS
    ) {
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
        newPACSStatus
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
      setShowViewPACSModal(true);
    } else {
      alert("Please select a PACS to view.");
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
    <div className="atelier5-page">
      <div className="atelier5-page__matrix">
    <h3>Matrice des scénarios</h3>
    <table className="scenario-matrix">
      <thead>
        <tr>
          <th>Gravité / Vraisemblance</th>
          {[1, 2, 3, 4].map(v => <th key={`V-${v}`}>{v}</th>)}
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4].map(gravite => (
          <tr key={`G-${gravite}`}>
            <td><strong>{gravite}</strong></td>
            {[1, 2, 3, 4].map(vraisemblance => {
              const key = `G${gravite}_V${vraisemblance}`;
              const cellColor = getCellColor(gravite, vraisemblance); // 🔥 Récupérer la couleur
              return (
                <td key={key} className={`scenario-cell ${cellColor}`}>
                  {scenarioGroups[key] ? (
                    <ul>
                      {scenarioGroups[key].map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="empty-cell"></span>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* 🔽 PACS Section */}
  <div className="atelier5-page__content">
    <h4>Plan d'amélioration continue de sécurité "PACS"</h4>
    <ul className="atelier5-page__source-list">
      {pacs.length > 0 ? (
        pacs.map((pac) => (
          <li
            key={pac.id}
            className={`atelier5-page__source-item ${
              selectedPACS && selectedPACS.id === pac.id
                ? "atelier5-page__source-item--selected"
                : ""
            }`}
            onClick={() => handleSelectedPacs(pac)}
          >
            {pac.MesureDeSecurite || `PACS ${pac.id}`}
          </li>
        ))
      ) : (
        <p className="atelier5-page__empty-message">No PACS available.</p>
      )}
    </ul>
    <div className="atelier5-page__source-actions">
      <button className="atelier5-page__btn atelier5-page__btn--view" onClick={handleViewPACS}>
        View PACS
      </button>
      <button className="atelier5-page__btn atelier5-page__btn--add" onClick={handleAddPACSClick}>
        Add PACS
      </button>
      <button className="atelier5-page__btn atelier5-page__btn--update" onClick={handleUpdatePACSClick}>
        Update PACS
      </button>
      <button className="atelier5-page__btn atelier5-page__btn--delete" onClick={handleDeletePACSClick}>
        Delete PACS
      </button>
    </div>
  </div>

      {/*===========================================pacs modals================================================*/}

      {/* Add PACS Modal */}
      {isAddPACSModalOpen && (
        <div className="atelier5-page__modal-overlay">
          <div className="atelier5-page__modal-content">
            <h3>Add PACS</h3>
            <textarea
              placeholder="Mesure de sécurité"
              value={newPACSMesureDeSecurite}
              onChange={(e) => setNewPACSMesureDeSecurite(e.target.value)}
              className="atelier5-page__modal-input"
            />
            <input
              type="text"
              placeholder="Responsable"
              value={newPACSResponsable}
              onChange={(e) => setNewPACSResponsable(e.target.value)}
              className="atelier5-page__modal-input"
            />
            <textarea
              placeholder="Difficulté de mise en oeuvre"
              value={newPACSDifficulteDeMisEnOeuvre}
              onChange={(e) => setNewPACSDifficulteDeMisEnOeuvre(e.target.value)}
              className="atelier5-page__modal-input"
            />
            <input
              type="number"
              placeholder="Complexité"
              value={newPACSComplexite}
              onChange={(e) => setNewPACSComplexite(Number(e.target.value))}
              min={1}
              max={4}
              className="atelier5-page__modal-input"
            />
            <input
              type="number"
              placeholder="Durée d'échéance"
              value={newPACSDureeEcheance}
              onChange={(e) => setNewPACSDureeEcheance(Number(e.target.value))}
              className="atelier5-page__modal-input"
            />
            <select
              value={newPACSStatus}
              onChange={(e) =>
                setNewPACSStatus(e.target.value as "termine" | "a lancer" | "en cours")
              }
              className="atelier5-page__modal-input"
            >
              <option value="termine">Terminé</option>
              <option value="a lancer">À lancer</option>
              <option value="en cours">En cours</option>
            </select>
            <div className="atelier5-page__modal-actions">
              <button
                className="atelier5-page__modal-btn"
                onClick={handleCreatePACS}
              >
                Create
              </button>
              <button
                className="atelier5-page__modal-btn"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update PACS Modal */}
      {isUpdatePACSModalOpen && (
        <div className="atelier5-page__modal-overlay">
          <div className="atelier5-page__modal-content">
            <h3>Update PACS</h3>
            <textarea
              placeholder="Mesure de sécurité"
              value={newPACSMesureDeSecurite}
              onChange={(e) => setNewPACSMesureDeSecurite(e.target.value)}
              className="atelier5-page__modal-input"
            />
            <input
              type="text"
              placeholder="Responsable"
              value={newPACSResponsable}
              onChange={(e) => setNewPACSResponsable(e.target.value)}
              className="atelier5-page__modal-input"
            />
            <textarea
              placeholder="Difficulté de mise en oeuvre"
              value={newPACSDifficulteDeMisEnOeuvre}
              onChange={(e) => setNewPACSDifficulteDeMisEnOeuvre(e.target.value)}
              className="atelier5-page__modal-input"
            />
            <input
              type="number"
              placeholder="Complexité"
              value={newPACSComplexite}
              onChange={(e) => setNewPACSComplexite(Number(e.target.value))}
              min={1}
              max={4}
              className="atelier5-page__modal-input"
            />
            <input
              type="number"
              placeholder="Durée d'échéance"
              value={newPACSDureeEcheance}
              onChange={(e) => setNewPACSDureeEcheance(Number(e.target.value))}
              className="atelier5-page__modal-input"
            />
            <select
              value={newPACSStatus}
              onChange={(e) =>
                setNewPACSStatus(e.target.value as "termine" | "a lancer" | "en cours")
              }
              className="atelier5-page__modal-input"
            >
              <option value="termine">Terminé</option>
              <option value="a lancer">À lancer</option>
              <option value="en cours">En cours</option>
            </select>
            <div className="atelier5-page__modal-actions">
              <button
                className="atelier5-page__modal-btn"
                onClick={handleUpdatePACS}
              >
                Save
              </button>
              <button
                className="atelier5-page__modal-btn"
                onClick={() => setUpdatePACSModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmationOpen && (
        <div className="atelier5-page__modal-overlay">
          <div className="atelier5-page__modal-content">
            <h3>Are you sure you want to delete this PACS?</h3>
            <div className="atelier5-page__modal-actions">
              <button
                className="atelier5-page__modal-btn"
                onClick={handleDeletePACS}
              >
                Yes
              </button>
              <button
                className="atelier5-page__modal-btn"
                onClick={handleCloseDeleteConfirmation}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View PACS Modal */}
      {showViewPACSModal && selectedPACS && (
        <div className="atelier5-page__modal-overlay">
          <div className="atelier5-page__modal-content">
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
            <div className="atelier5-page__modal-actions">
              <button
                className="atelier5-page__modal-btn"
                onClick={handleCloseViewPACSModal}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Atelier5;
