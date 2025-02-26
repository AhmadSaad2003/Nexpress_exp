import React, { useState } from "react";
import { signUp } from "../../services/logInServices/signUpService";
import "../../Style/SignUp.css";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await signUp(email, userName, password);
      setSuccess("Sign up successful!");
    } catch (err) {
      setError("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="auth-signup">
      <h2>Sign Up</h2>
      {error && <p className="auth-error">{error}</p>}
      {success && <p className="auth-success">{success}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
