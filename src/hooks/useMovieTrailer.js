import { useEffect } from "react";
import { addCurrentTrailerDetails } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";

const useMovieTrailer = (mainMovieData) => {
    const dispatch = useDispatch();
     const getMovieTrailer = async () => {
        try {
          const movieInfo = await fetch(
            `https://api.themoviedb.org/3/movie/${mainMovieData?.id}/videos?language=en-US`,
            API_OPTIONS
          );
          
          const jsonData = await movieInfo.json(); 
          const trailers = jsonData?.results?.filter((eachVideo) => eachVideo?.type === "Trailer");
          if(trailers?.length){
            dispatch(addCurrentTrailerDetails(trailers?.[0]))
          }else{
            dispatch(addCurrentTrailerDetails(jsonData?.results?.[0]))
          }

        } catch (error) {
          console.error("Error fetching trailer:", error);
        }
      };
      
      useEffect(() => {
        if (mainMovieData?.id) { 
          getMovieTrailer();
        }
      }, [mainMovieData]);
}

export default useMovieTrailer