/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { addMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch()
    const getNowPlayingMovies = async()=>{
      const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)
      const jsonData = await response.json();
      if(jsonData?.results?.length>0){
        dispatch(addMovies(jsonData.results))
      }else{
        console.error("Fetched data is empty");
      }
  
    }
  useEffect(()=>{
    getNowPlayingMovies()
  },[])
}

export default useNowPlayingMovies;