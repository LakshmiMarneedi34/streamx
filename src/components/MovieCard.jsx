import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ poster_path }) => {
  return (
    <div className="w-[250px] h-[140px] sm:w-[300px] sm:h-[170px] lg:w-[340px] lg:h-[190px] rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 cursor-pointer">
      <img
        src={`${IMG_CDN + poster_path}`}
        alt="movie"
        className="w-full h-full object-cover rounded-md shadow-md"
      />
    </div>
  );
};

export default MovieCard;
