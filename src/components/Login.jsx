/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const formRef = useRef({
    name: "",
    email: "",
    password: "",
  });

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errors, setErrors] = useState({});

  const handleFormChange = () => setIsSignInForm(!isSignInForm);

  const handleInputChange = (e) => {
    formRef.current[e.target.name] = e.target.value.trim();
  };


  const handleSignUpApiCall = (email,password,name) => {
    createUserWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("### user :",user)


      updateProfile(user, {
        displayName:name, photoURL: "https://i.pinimg.com/1200x/7c/48/9d/7c489dfa6cb5724bfe34af136f5d90c6.jpg"
      }).then(() => {
        // Profile updated!
          const{uid,email,displayName,photoURL} = auth.currentUser;
          console.log("##### auth.currentUser",auth.currentUser)

          dispatch(addUser({
            uid:uid,
            email:email,
            displayName:displayName,
            photoURL:photoURL
          }))
        navigate("/browse")
      }).catch((error) => {
        // An error occurred
        
      });


    })
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
});
  }

  const handleSignInApiCall = (email,password,name) => {
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      updateProfile(user, {
        displayName:name, photoURL: "https://i.pinimg.com/1200x/7c/48/9d/7c489dfa6cb5724bfe34af136f5d90c6.jpg"
      }).then(() => {
        // Profile updated!
        navigate("/browse")
      }).catch((error) => {
        // An error occurred
        
      });

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("##### errorMessage :",errorMessage)
    });
  }

  const handleAuthorization = () => {

    const { email, password,name } = formRef?.current;
    
    if(!isSignInForm){
      handleSignUpApiCall(email,password,name)
    }else{
      handleSignInApiCall(email,password,name)
     

    }
  
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = formRef.current;
    const validationErrors = checkValidateData(email, password);

    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form submitted successfully:", { name, email, password });
      handleAuthorization();

    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f6e7f6df-6973-46ef-b98f-12560d2b3c69/web/IN-en-20250317-TRIFECTA-perspective_26f87873-6014-460d-a6fb-1d96d85ffe5f_small.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
      <form
        className="w-3/12 absolute p-12 bg-black/80 text-white my-36 mx-auto right-0 left-0 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="p-4 my-2 bg-gray-700 w-full rounded"
            onChange={handleInputChange}
          />
        )}

        <input
          type="text"
          name="email"
          placeholder="Email Address"
          className="p-4 my-2 bg-gray-700 w-full rounded"
          onChange={handleInputChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-4 my-2 bg-gray-700 w-full rounded"
          onChange={handleInputChange}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <button className="p-4 my-4 bg-red-700 w-full rounded hover:bg-red-800 transition" type="submit">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer text-gray-400 hover:text-white transition" onClick={handleFormChange}>
          {isSignInForm ? "Don't have an account? Sign up now!" : "Already have an account? Sign in here!"}
        </p>
      </form>
    </div>
  );
};
