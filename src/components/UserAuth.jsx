import React, { useState } from 'react'
import { auth, googleProvider } from '../config/firebaseConfig'
import { signInWithPopup } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
const UserAuth = () => {
    const [ user, setUser ] = useState(null);
    const navigate = useNavigate();

    const handleGoogleSignInClick = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setUser(auth.currentUser)
            console.log(auth.currentUser.email);
        } catch(error) {
            console.error(error);
        }
    }
            console.log(auth.currentUser);

            if(user) {
                return <Navigate to="/chatroom" />
            }
  return (
    <div>
        <button onClick={handleGoogleSignInClick} className='border rounded bg-slate-500 border-slate-500 p-2'>Sign in Google</button>
    </div>
  )
}

export default UserAuth