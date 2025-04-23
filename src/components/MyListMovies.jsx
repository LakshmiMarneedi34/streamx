import { useSelector,  } from 'react-redux';
import MovieCard from './MovieCard';  // Assuming your MovieCard component is already set up
import MovieModal from './MovieModal';


const MyList = () => {
  const myListMovies = useSelector(state => state.movies.watchList); // Assuming movies are stored in this format
  const dialogTopen = useSelector(state => state.movies.dialogToOpen);

  // const handleMovieClick = (movie) => {
  //   dispatch(addCurrentMovieID(movie.id));  // Set the current movie ID
  //   dispatch(addDialogToOpen(true));  // Open the modal
  // };

  return (
    <div className="my-16 px-8">
      <h1 className="text-2xl font-bold text-white mb-6">My List</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {myListMovies.length === 0 ? (
          <div className="col-span-full text-center text-white">Your list is empty!</div>
        ) : (
          myListMovies.map(movie => (
            <div key={movie.id} >
              <MovieCard movie={movie} />
            </div>
          ))
        )}
      </div>
      {dialogTopen && <MovieModal />}
    </div>
  );
};

export default MyList;
