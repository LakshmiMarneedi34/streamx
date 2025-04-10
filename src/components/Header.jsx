/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { use, useEffect, useState } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { logoURL } from '../utils/constants';
import SearchBar from './SearchBar';
import { Play, Info } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  const handleSingOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(removeUser());
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
  }

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });

    // Cleanup function to avoid memory leaks
    return () => unsubscribe();
  }, []); 

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center h-16">
  

    <img 
      className="w-40 object-contain flex-shrink-0"
      src={logoURL}
      // src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      alt="logo" 
    />
  
    <div className="flex items-center gap-2 relative">
      {userDetails && (
        <SearchBar/>
      )}
      {userDetails && (
      <img
      className="w-10 h-10 cursor-pointer"
        src={userDetails?.photoURL ? userDetails.photoURL : "https://i.pinimg.com/736x/91/86/1b/91861b749841221d52122f0c2933d8a6.jpg"}
        alt="avatar"
        onClick={toggleCard}
      />
      )}
        {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-48 bg-black/80 shadow-lg rounded-md p-4">
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
