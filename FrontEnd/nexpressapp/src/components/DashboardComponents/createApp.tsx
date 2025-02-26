import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createapp } from "../../services/DashboardServices/createAppService";
import "../../Style/createApp.css";

const CreateApp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    dateofcreation: "",
    capital: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Veuillez vous connecter");
      return;
    }
    try {
      const response = await createapp(
        formData.name,
        formData.dateofcreation,
        formData.capital
      );
      if (response && response.status >= 200 && response.status < 300) {
        alert("App created successfully!");
        navigate("/dashboard");
      } else {
        alert("Failed to create app. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="create-app">
      <h3>Create New App</h3>
      <form className="create-app__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="App Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="create-app__input"
        />
        <input
          type="date"
          name="dateofcreation"
          placeholder="Date of Creation"
          value={formData.dateofcreation}
          onChange={handleInputChange}
          required
          className="create-app__input"
        />
        <input
          type="text"
          name="capital"
          placeholder="Capital"
          value={formData.capital}
          onChange={handleInputChange}
          required
          className="create-app__input"
        />
        <button type="submit" className="create-app__submit-btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateApp;
