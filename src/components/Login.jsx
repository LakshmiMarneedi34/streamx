 
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { checkAllFields, checkValidateData } from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { backgroundIMG } from "../utils/constants";
import { debounce } from "../utils/Debounce";


export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  }
  const [formData,setFormData] = useState(initialValues)
  // const formRef = useRef({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errors, setErrors] = useState({});

  const handleFormChange = () => {
    setIsSignInForm(!isSignInForm);
    setFormData(initialValues);
    setErrors({});
  };

const validateOnChange = (name,value) => {
  const error = checkValidateData(name,value)
  setErrors((prevErrors) =>{
    if(!error[name]){
      const updatedErrors = {...prevErrors};
      delete updatedErrors[name];
      return updatedErrors;
    }
    return {...prevErrors,...error}
  })
  
}
const debounceValidations = debounce(validateOnChange,1000);
  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      return;
    }
    // formRef.current[e.target.name] = e.target.value.trim();
    setFormData({...formData,[e.target.name]:e.target.value.trim()})
    debounceValidations(e.target.name,e.target.value.trim())
  };
console.log("#### values",formData)

  const handleSignUpApiCall = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Update profile
      await updateProfile(user, {
        displayName: name,
        photoURL: "https://i.pinimg.com/1200x/7c/48/9d/7c489dfa6cb5724bfe34af136f5d90c6.jpg",
      });
  
      // Ensure user data is available

  
      dispatch(addUser({
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
      }));
  
      navigate("/browse");
 
    } catch (error) {
      console.error("SignUp Error:", error.code, error.message);

      if (error.code === "auth/email-already-in-use") {
         setErrors({ email: "This email is already registered. Please use another email." });
      } else {
        setErrors({ general: error.message });
      }
    
    }
  };
  
  const handleSignInApiCall = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

  
      dispatch(addUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }));
      setFormData({ name: "", email: "", password: "" });
      navigate("/browse");
    } catch (error) {
      console.error("SignIn Error:", error);
    
      if (error.code === "auth/invalid-credential") {
        setErrors({ email: "Invalid email or password" });
      } else {
        setErrors({ general: error.message });
      }
    }
  };
  

  const handleAuthorization = () => {

    const { email, password,name } = formData || {};
    
    if(!isSignInForm){
      handleSignUpApiCall(email,password,name)
    }else{
      handleSignInApiCall(email,password,name)
     

    }
  
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = formData || {};
    let validationErrors ;
    if(!isSignInForm){
    validationErrors = checkAllFields({name, email, password});
    }else{
      validationErrors = checkAllFields({email, password});
    }
    
    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // console.log("Form submitted successfully:", { name, email, password });
      handleAuthorization();

    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = checkValidateData(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));
  };
const errorTag = (feildName) => {
  return(
    <p className="text-red-500 text-sm">{feildName}</p>
  )
}
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
        onSubmit={(e) => {
          handleSubmit(e)
        }}
         
        
      >
        <h1 className="font-bold text-xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (
          <>
          <input
            type="text"
            name="name"
            value={formData?.name}
            placeholder="Full Name"
            className="p-4 my-2 bg-gray-700 w-full rounded"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            autoComplete="off" 
          />
           {errors.name && errorTag(errors.name)}
          </>
        )}

        <input
          type="text"
          name="email"
          value={formData?.email}
          placeholder="Email Address"
          className="p-4 my-2 bg-gray-700 w-full rounded"
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          autoComplete="off" 
        />
        {errors.email && errorTag(errors.email)}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData?.password}
          className="p-4 my-2 bg-gray-700 w-full rounded"
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          autoComplete="off" 
        />
        {errors.password && errorTag(errors.password)}

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
