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
import { backgroundIMG } from "../utils/constants";

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


  const handleSignUpApiCall = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created:", user);
  
      // Update profile
      await updateProfile(user, {
        displayName: name,
        photoURL: "https://i.pinimg.com/1200x/7c/48/9d/7c489dfa6cb5724bfe34af136f5d90c6.jpg",
      });
  
      // Ensure user data is available
      console.log("Updated User:", auth.currentUser);
  
      dispatch(addUser({
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
      }));
  
      navigate("/browse");
    } catch (error) {
      console.error("SignUp Error:", error.code, error.message);
    }
  };
  
  const handleSignInApiCall = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log("User Signed In:", user);
  
      dispatch(addUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }));
  
      navigate("/browse");
    } catch (error) {
      console.error("SignIn Error:", error.code, error.message);
    }
  };
  

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
          src={backgroundIMG}
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
      <form
        className="w-3/12 absolute p-12 bg-black/80 text-white my-36 mx-auto right-0 left-0 rounded-lg"
        onSubmit={(e) => handleSubmit(e)}
         
        
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
