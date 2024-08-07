import React from 'react'
import { Link } from 'react-router-dom';
import UserAuth from '../components/UserAuth';
import { auth } from '../config/firebaseConfig';

const Home = () => {
    if(auth.currentUser) {
        console.log(auth.currentUser.email);
    }
  return (
    <div className="min-h-screen bg-orange-500 ">
      <div>
        <nav className='min-h-20 w-full bg-stone-500 p-4 flex justify-between items-center text-2xl font-bold gap-3'>
            <Link className='underline font-bold text-2xl' to="/about">Want to Know more</Link>
            <header className='text-3xl font-bold'>Counsailor</header>
            <UserAuth />
        </nav>

      </div>
    </div>
  );
}

export default Home