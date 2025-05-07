import React, { useState } from 'react';
import { auth } from '../utils/firebase';
import {  signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { logoURL } from '../utils/constants';
import SearchBar from './SearchBar';
import { setMode } from '../utils/movieSlice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  
  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      navigate("/");  // Navigate to home page after sign out
    }).catch((error) => {
      console.error(error);
    });
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async(user) => {
  //     if (user) {
  //       const { uid, email, displayName, photoURL } = user;
  //       dispatch(addUser({ uid, email, displayName, photoURL }));

  //       const watchList = await getWatchListFromFirestore(uid);
  //       dispatch(setWatchList(watchList));
  //       navigate("/browse");  // Navigate to browse page after successful login
  //     } else {
  //       dispatch(removeUser());
  //       dispatch(setWatchList([]));
  //       navigate("/");  // Navigate to home page if user is not logged in
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <div className="fixed top-0 left-0 w-full px-8 py-2 bg-gradient-to-b from-black z-50 flex justify-between items-center h-16">
      {/* Logo */}
      <div className="flex justify-between gap-6">
      <img 
        className="w-40 object-contain flex-shrink-0"
        src={logoURL}
        alt="logo"
      />

      {/* Navigation Buttons */}
     
        <button
          className="text-white font-semibold hover:text-gray-400"
          onClick={() => {
            dispatch(setMode('home'))
            navigate("/browse")
          }}
        >
          Home
        </button>

        <button
          className="text-white font-semibold hover:text-gray-400"
          onClick={() => navigate("/myList")}
        >
          My List
        </button>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-2 relative">
        {userDetails && <SearchBar />}
        
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
              onClick={handleSignOut}
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
