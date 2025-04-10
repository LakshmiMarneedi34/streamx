import { useSelector } from "react-redux";
import MovieList from "./MovieList"; // assuming you already have this

const MovieSuggestions = () => {
  const { searchedMovies } = useSelector((state) => state.movies);

  if (!searchedMovies || searchedMovies.length === 0) return null;

  return (
    <div className="bg-black px-6 py-4">
 
      <MovieList title="searched" movies={searchedMovies} />
    </div>
  );
};

export default MovieSuggestions;
