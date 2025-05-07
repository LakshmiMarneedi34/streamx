/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { debounce } from "../utils/Debounce";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addRecommendedMovies, addSearchableMovies, setMode } from "../utils/movieSlice";

const SearchBar = () => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
const dispatch = useDispatch()
  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus();
    }
  }, [showInput]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const fetchDetails = async () => {
    const userQuery = inputRef.current.value || ""; // Your test query
  
    try {
      // Step 1: Search movies related to the query
      const searchResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(userQuery)}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const searchData = await searchResponse.json();
  
      if (!searchData.results.length) {
        console.log("No movies found for this query.");
        return;
      }
      
      const topMovie = searchData.results[0];
      console.log("Top match:",searchData.results);
      const searchMovies = searchData.results
      .slice(0, 5)
      .map((movie) => movie)
      .filter(Boolean); // In case some titles are missing

      dispatch(addSearchableMovies(searchMovies))
      dispatch(setMode("search"))
      // Step 2: Fetch recommendations based on top movie
      const recResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${topMovie.id}/recommendations?language=en-US&page=1`,
        API_OPTIONS
      );
      const recData = await recResponse.json();
  
      if (!recData.results.length) {
        console.log("No recommendations found.");
        return;
      }
  
      const recommendedMovies = recData.results
        .slice(0, 5)
        .map((movie) => movie)
        .filter(Boolean); // In case some titles are missing
  
      console.log("Recommended:", recommendedMovies);
      dispatch(addRecommendedMovies(recommendedMovies))
    } catch (err) {
      console.error("Error fetching movie data:", err);
    }
  };

  const debounceSearch = debounce(fetchDetails,2000)
  const handleOnChange = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value)
    debounceSearch(inputRef.current.value)
  
    
  }
  return (
    <div className="relative flex items-center">

      <button
        onClick={() => setShowInput((prev) => !prev)}
        className="text-white p-2 hover:bg-white/10 rounded-full transition"
      >
        <Search size={20} />
      </button>

  
      {showInput && (
        <input
          ref={inputRef}
          type="text"
          placeholder="Search movies..."
          onChange={(e)=>{
            handleOnChange(e)
          }}
          className="absolute right-10 bg-black text-white px-4 py-3 rounded-md focus:outline-none w-48 transition-all duration-300 border border-white/20"
        />
      )}
    </div>
  );
};

export default SearchBar;
