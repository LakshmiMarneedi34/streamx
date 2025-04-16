import { useDispatch } from "react-redux";
import { IMG_CDN } from "../utils/constants";
import { addCurrentMovieID, addDialogToOpen } from "../utils/movieSlice";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="relative w-[250px] h-[140px] sm:w-[300px] sm:h-[170px] lg:w-[340px] lg:h-[190px] 
                 rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 
                 cursor-pointer group"
      onClick={() => {
        dispatch(addCurrentMovieID(movie?.id));
        dispatch(addDialogToOpen(true));
      }}
    >
      <img
        src={movie.poster_path ? IMG_CDN + movie.poster_path : "/placeholder.jpg"}
        alt={movie.title}
        className="w-full h-full object-cover rounded-md shadow-md"
        loading="lazy"
      />

      {/* Hover overlay for movie name */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center p-2">
        <h3 className="text-white text-lg font-semibold">
          {movie.title || "Untitled"}
        </h3>
      </div>
    </div>
  );
};

export default MovieCard;
