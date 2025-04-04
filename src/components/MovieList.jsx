import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="mb-10 px-6">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 drop-shadow-md">
        {title}
      </h2>

      {/* Scrollable Movie Row */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
        {movies?.map((movie) => (
          <div key={movie?.id} className="snap-start shrink-0">
            <MovieCard poster_path={movie?.poster_path} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
