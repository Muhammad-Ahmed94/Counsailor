import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const [user, setUser] = useState(auth.currentUser);

  const navigate = useNavigate();

  const handleGoogleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignOut}
        className="border rounded bg-slate-500 border-slate-500 p-2"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
