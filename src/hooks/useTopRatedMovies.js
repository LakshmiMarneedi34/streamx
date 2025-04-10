/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux"
import { API_OPTIONS } from "../utils/constants"
import {  addTopRatedMovies } from "../utils/movieSlice"
import { useEffect } from "react"

const useTopRatedMovies = () => {
    const topRatedMovies = useSelector((store)=>store.movies.topRatedMovies)
    const dispatch = useDispatch()

    const getTopRatedMovies = async() => {
        const topRated = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1',API_OPTIONS)
        const jsonData = await topRated?.json()
        // console.log("#### jsonData",jsonData)
        if(jsonData?.results?.length>0){
            dispatch(addTopRatedMovies(jsonData?.results))
        }else{
            console.error("Fetched data is empty");
        }
    }

    useEffect(()=>{
       !topRatedMovies && getTopRatedMovies()
    },[topRatedMovies])
}

export default useTopRatedMovies;