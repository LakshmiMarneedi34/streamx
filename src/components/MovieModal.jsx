/* eslint-disable no-unused-vars */
import React from "react";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import useGetMovieDetails from "../hooks/useGetMovieDetails";
import { addDialogToOpen, addWatchList, setWatchList } from "../utils/movieSlice";
import { getWishlistFromFirestore, saveWishlistToFirestore } from "../utils/firestoreUtils";

const MovieModal = () => {
  const dispatch = useDispatch();
  const movieDetails = useSelector((state) => state.movies.currentMovieDetails);
  const displayMoreInfo = useSelector((state) => state.movies.dialogToOpen);
  const user = useSelector((state) => state.user); // Assuming user data is stored in Redux
  const watchList = useSelector((state) => state.movies.watchList); // Get the current watchlist

  console.log("### movieDetails", movieDetails);
  useGetMovieDetails();

  if (!movieDetails) return null;

  const trailerKey = movieDetails?.trailer?.key;
  const releaseYear = movieDetails.release_date?.split("-")[0] || "";
  const genres = movieDetails.genres?.map((genre) => genre.name).join(", ");
  const productionCompanies = movieDetails.production_companies?.map((comp) => comp.name).join(", ");
  const languages = movieDetails.spoken_languages?.map((lang) => lang.english_name).join(", ");

  const handleAddToWatchList = async () => {
    // Dispatch the movie to the Redux watchlist
    dispatch(addWatchList(movieDetails));
  
    // If the user is logged in, update the Firestore wishlist
    // if (user?.uid) {
    //   // Use the current watchlist from the Redux state
    //   const updatedWatchlist = [...watchList, movieDetails];
      
    //   // Save to Firestore
    //   await saveWishlistToFirestore(user.uid, updatedWatchlist);
  
    //   // Refetch the updated wishlist from Firestore
    //   const updatedWishlistFromFirestore = await getWishlistFromFirestore(user.uid);
    //   dispatch(setWatchList(updatedWishlistFromFirestore)); // Update Redux state with the new wishlist
    // }
  };
  

  return (
    <Dialog
      visible={displayMoreInfo}
      onHide={() => dispatch(addDialogToOpen(false))}
      dismissableMask
      blockScroll
      draggable={false}
      style={{ width: "95vw", maxWidth: "1000px" }}
      className="bg-black text-white p-0 overflow-hidden rounded-md"
      header={null}
    >
      {/* -- Trailer Section -- */}
      {trailerKey && (
        <div className="relative w-full aspect-video bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&enablejsapi=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 flex flex-col justify-end p-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{movieDetails.title || "Untitled Movie"}</h2>
            <div className="flex gap-4">
              <button className="flex items-center bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>
              <button
                onClick={handleAddToWatchList}
                className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 fill-current" viewBox="0 0 24 24">
                  <path d="M19 11H13V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2Z" />
                </svg>
                My List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -- Movie Info Section -- */}
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-gray-300 mt-2 text-sm">
          {releaseYear && <span>{releaseYear}</span>}
          {movieDetails.runtime && <span>{movieDetails.runtime} min</span>}
          <span>{movieDetails.original_language.toUpperCase()}</span>
          <span>HD</span>
        </div>

        {movieDetails.tagline && <p className="italic text-yellow-300">"{movieDetails.tagline}"</p>}

        <p className="text-gray-200 leading-relaxed">
          <strong>Overview:</strong> {movieDetails.overview}
        </p>

        {genres && (
          <p className="text-gray-400">
            <strong>Genres:</strong> {genres}
          </p>
        )}

        {productionCompanies && (
          <p className="text-gray-400">
            <strong>Produced By:</strong> {productionCompanies}
          </p>
        )}

        {languages && (
          <p className="text-gray-400">
            <strong>Languages:</strong> {languages}
          </p>
        )}

        {movieDetails.homepage && (
          <a
            href={movieDetails.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300 transition-colors"
          >
            Visit Official Website
          </a>
        )}
      </div>
    </Dialog>
  );
};

export default MovieModal;
