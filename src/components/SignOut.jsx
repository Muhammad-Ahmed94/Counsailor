import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebaseConfig";
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";

const SignOut = () => {
  const [user, setUser] = useState(auth.currentUser);

  const handleGoogleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      <Navigate to={<Home />} />
      
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
