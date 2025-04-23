/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react'
import { Login } from './Login.jsx'
import Browser from './Browser.jsx'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import MyList from './MyListMovies.jsx'
import Layout from './Layout.jsx'


const Body = () => {

    const appRouter = createBrowserRouter([
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/browse',
            element: <Browser />
          },
          {
            path: '/myList',
            element: <MyList />
          }
        ]
      }
    ]);

  return (
    <div>
       <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body