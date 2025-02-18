import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/logInServices/signInService";


const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await signIn(email, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Sign-in failed. Please try again."
      );
    }
  };

  return (
    <div className="sign-in">
      <h2>Sign In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignIn}>
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
