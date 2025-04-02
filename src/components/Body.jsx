
import React, { useEffect } from 'react'
import { Login } from './Login.jsx'
import Browser from './Browser.jsx'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase.js'
import { useDispatch } from 'react-redux'
import { addUser, removeUser, } from '../utils/userSlice.js'

const Body = () => {
  const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/browse",
            element:<Browser/>
        }
    ])
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, displayName, photoURL } = user;
          dispatch(addUser({ uid, email, displayName, photoURL }));
        } else {
          dispatch(removeUser());
        }
      });
  
      // Cleanup function to avoid memory leaks
      return () => unsubscribe();
    }, [dispatch]); 
  


  return (
    <div>
       <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body