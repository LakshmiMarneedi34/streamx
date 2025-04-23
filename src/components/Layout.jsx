import React, { useEffect } from 'react';
import Header from './Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { addUser, removeUser } from '../utils/userSlice';


const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
  
        // Fetch the watchlist from Firestore again after refresh
        // const watchList = await getWishlistFromFirestore(uid);
        // console.log("✅ Watchlist from Firestore:", watchList);
        // dispatch(setWatchList(watchList));
  
        navigate('/browse');
      } else {
        dispatch(removeUser());
        // dispatch(setWatchList([]));
        navigate('/');
      }
    });
  
    return () => unsubscribe();
  }, []); // This will trigger when the component mounts (including after a page refresh)
  

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
