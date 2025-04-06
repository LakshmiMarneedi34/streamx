/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux"
import { API_OPTIONS } from "../utils/constants"
import { addPopularMovies } from "../utils/movieSlice"
import { useEffect } from "react"

const usePopularPlayingMovies = () => {
    const dispatch = useDispatch()

    const getPopularMovies = async() => {
        const popularMoviesResponse = await fetch('https://api.themoviedb.org/3/movie/popular?page=1',API_OPTIONS)
        const jsonData = await popularMoviesResponse?.json()
        // console.log("#### jsonData",jsonData)
        if(jsonData?.results?.length>0){
            dispatch(addPopularMovies(jsonData?.results))
        }else{
            console.error("Fetched data is empty");
        }
    }

    useEffect(()=>{
        getPopularMovies()
    },[])
}

export default usePopularPlayingMovies;