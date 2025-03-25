import React, { useState } from 'react'
import Header from './Header'

export const Login = () => {

  const [isSignInForm,setIsSignInForm] = useState()

const handleFormChange = () => {
  setIsSignInForm(!isSignInForm)
}

  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f6e7f6df-6973-46ef-b98f-12560d2b3c69/web/IN-en-20250317-TRIFECTA-perspective_26f87873-6014-460d-a6fb-1d96d85ffe5f_small.jpg"
        alt="backgroundimg"
        />
      </div>
      <form className='w-3/12 absolute p-12 bg-black/80 text-white my-36 mx-auto right-0 left-0'>
      
      <h1 className='font-bold text-xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
      
      {!isSignInForm && <input type="text" placeholder="Full Name"
          className="p-4 my-4  bg-gray-700 w-full"/>}

      <input type="text" placeholder="Email Address"
       className="p-4 my-4  bg-gray-700 w-full"/>
      


      <input type="password" placeholder="Password" 
      className="p-4 my-4 bg-gray-700 w-full"/>

        <button className='p-4 my-4 bg-red-700 w-full'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={()=> {
          handleFormChange()
        }}>{isSignInForm ? "Don't have an account? Sign up now!" : "Already have an account? Sign in here!"}</p>
      </form>
    </div>
  )
}
