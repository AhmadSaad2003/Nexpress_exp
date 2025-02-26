import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "../../Style/LoginPage.css";

const LoginPage: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <div className="auth-toggle-buttons">
          <button onClick={() => setIsSignIn(true)}>Sign In</button>
          <button onClick={() => setIsSignIn(false)}>Sign Up</button>
        </div>
        {isSignIn ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default LoginPage;
