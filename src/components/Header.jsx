/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate()
  const userDetails = useSelector((state) => state.user);
  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  const handleSingOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center h-16">
  

    <img 
      className="w-40 object-contain flex-shrink-0"
      src="https://i.imgur.com/8uaiZ1h.png" 
      // src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      alt="logo" 
    />
  
    <div className="relative">

      <img
        className="w-10 h-10 cursor-pointer"
        src={userDetails?.photoURL ? userDetails.photoURL : "https://i.pinimg.com/736x/91/86/1b/91861b749841221d52122f0c2933d8a6.jpg"}
        alt="avatar"
        onClick={toggleCard}
      />
  

      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-black/80 shadow-lg rounded-md p-4">
          <button 
            className="w-full text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
            onClick={handleSingOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  </div>
  
  );
}

export default Header;
