import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./components/logInComponents/logIn";
import Dashboard from "./components/DashboardComponents/dashboard";
import AppPage from "./components/appComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/app-details" element={<AppPage />} />
      </Routes>
    </Router>
  );
}

export default App;
