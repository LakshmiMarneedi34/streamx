import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentMovieDetails } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useFetchMovieDetailsAndTrailer = () => {
  const dispatch = useDispatch();
const movieId = useSelector((store) => store.movies.currentMovieID)
  const fetchMovieDetailsAndTrailer = async () => {
    try {
      // Fetch movie details
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        API_OPTIONS
      );
      const movieData = await movieRes.json();

      // Fetch trailer videos
      const trailerRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const trailerData = await trailerRes.json();

      const trailers = trailerData?.results?.filter(
        (eachVideo) => eachVideo?.type === "Trailer"
      );

      const selectedTrailer = trailers?.[0] || trailerData?.results?.[0] || null;

      // Combine both into a single payload
      const combinedMovieDetails = {
        ...movieData,
        trailer: selectedTrailer,
      };
      console.log("combinedMovieDetails",combinedMovieDetails);
      dispatch(addCurrentMovieDetails(combinedMovieDetails));
    } catch (error) {
      console.error("Error fetching movie details or trailer:", error);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieDetailsAndTrailer();
    }
  }, [movieId]);
};

export default useFetchMovieDetailsAndTrailer;
