import React from "react";
import { useLocation } from "react-router-dom";
import "../../Style/guide.css";

const Guide: React.FC = () => {
  const location = useLocation();
  const app = location.state?.app;

  if (!app) {
    return <p className="error-message">Erreur : Aucune donnée d'application trouvée. Veuillez revenir à la page principale.</p>;
  }

  return (
    <div className="guide-wrapper">
      <h1 className="guide-title">Guide de la méthode EBIOS Risk Manager</h1>
      <p className="guide-subtitle">Une démarche itérative en 5 ateliers</p>

      <div className="atelier-section">
        <div className="atelier-box">
          <h2>Atelier 1 - Cadrage et socle de sécurité</h2>
          <p>Le but de ce premier atelier est de définir le cadre de l’étude, son périmètre
              métier et technique, les événements redoutés associés et le socle de sécurité.
              Cet atelier est un prérequis à la réalisation d’une appréciation des risques.
              La période à considérer pour cet atelier est celle du cycle stratégique.</p>
          <ul>
            <li><strong>Missions :</strong> Définition des objectifs et finalités de l'entreprise.</li>
            <li><strong>Valeurs métier :</strong> Les valeurs métier représentent le patrimoine informationnel qu’une source de risque aurait intérêt à attaquer pour atteindre ses objectifs. </li>
            <li><strong>Biens supports :</strong> Il s’agit des éléments du système d’information sur lesquels les valeurs métier reposent.</li>
            <li><strong>Événements redoutés :</strong> Dans EBIOS RM, les événements redoutés sont associés aux valeurs métiers et traduisent une atteinte préjudiciable pour l’organisation en évaluant la gravité de chaque événement. </li>
            <li><strong>Socle de sécurité :</strong> Identifier l’ensemble des référentiels de sécurité qui s’appliquent à l’objet de l’étude.</li>
            <li><strong>Écarts :</strong> Identification des failles pour chaque Socle de securité.</li>
          </ul>
        </div>

        <div className="atelier-box">
          <h2>Atelier 2 - Identification des sources de risque</h2>
          <p>Le but de l’atelier 2 est d’identifier les sources de risque (SR) et leurs objectifs visés (OV), en lien avec le contexte particulier de l’étude. L’atelier
              vise à répondre à la question suivante : qui ou quoi pourrait porter atteinte
              aux missions et valeurs métier identifiées dans l’atelier 1, et dans quels buts ?</p>
          <ul>
            <li><strong>Sources de risque :</strong> Qui ou quoi représente une menace ?</li>
            <li><strong>Objectifs visés :</strong> Motivations et intentions des attaquants.</li>
          </ul>
        </div>

        <div className="atelier-box">
          <h2>Atelier 3 - Construction des scénarios stratégiques</h2>
          <p>L’objectif de l’atelier 3 est de disposer d’une vision claire de l’écosystème,
            afin d’en identifier les parties prenantes les plus vulnérables. Il s’agit ensuite
            de bâtir des scénarios de haut niveau, appelés scénarios stratégiques.</p>
          <ul>
            <li><strong>Écosystème :</strong> L’écosystème comprend l’ensemble des parties prenantes qui gravitent autour
                      de l’objet de l’étude et concourent à la réalisation de ses missions (partenaires,
                      sous-traitants, filiales, etc.)</li>
            <li><strong>Scénarios stratégiques :</strong> Imaginer des scénarios réalistes de haut niveau,
                      indiquant de quelle façon un attaquant pourrait procéder pour atteindre son
                      objectif.</li>
            <li><strong>Mesures de sécurité :</strong> Les mesures de sécurité auront pour vocation de réduire le niveau de menace
                        intrinsèque induit par les parties prenantes critiques .</li>
          </ul>
        </div>

        <div className="atelier-box">
          <h2>Atelier 4 - Développement des scénarios opérationnels</h2>
          <p>L’objectif de l’atelier 4 est de construire des scénarios opérationnels.Cet atelier adopte une
              démarche similaire à celle de l’atelier précédent mais se concentre sur les
              biens supports.</p>
          <ul>
            <li><strong>Scénarios opérationnels :</strong>  Schématiser les modes opératoires que pourraient mettre en œuvre les sources
            de risque pour réaliser les scénarios stratégiques en évaluant la vraisemblance de chaque scénario. </li>
          </ul>
        </div>

        <div className="atelier-box">
          <h2>Atelier 5 - Traitement du risque et amélioration continue</h2>
          <p>Le but de cet atelier est de réaliser une synthèse des scénarios de risque
          identifiés et de définir une stratégie de traitement du risque. </p>
          <ul>
            <li><strong>PACS :</strong> Une fois la stratégie de traitement validée pour chaque scénario, définissez
            les mesures de sécurité associées pour le traiter.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Guide;
