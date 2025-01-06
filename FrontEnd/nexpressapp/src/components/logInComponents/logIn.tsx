import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/logInServices/signUpService";

import SignIn from "./signIn";
import SignUp from "./signUp";

const LoginPage: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="login-page">
      <div className="form-container">
        <div className="toggle-buttons">
          <button onClick={() => setIsSignIn(true)}>Sign In</button>
          <button onClick={() => setIsSignIn(false)}>Sign Up</button>
        </div>
        {isSignIn ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default LoginPage;
