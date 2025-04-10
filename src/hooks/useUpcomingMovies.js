/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {  addUpcomingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const upcomingMovies = useSelector((store)=>store.movies.upcomingMovies)
    const dispatch = useDispatch()
    const getUpComingMovies = async()=>{
      const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS)
      const jsonData = await response.json();
      if(jsonData?.results?.length>0){
        dispatch(addUpcomingMovies(jsonData.results))
      }else{
        console.error("Fetched data is empty");
      }
  
    }
  useEffect(()=>{
    !upcomingMovies && getUpComingMovies()
  },[upcomingMovies])
}

export default useUpcomingMovies;