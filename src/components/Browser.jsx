/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
 
import React, { useEffect } from 'react'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import Header from './Header'
import usePopularPlayingMovies from '../hooks/usePopularPlayingMovies'
import useTopRatedMovies from '../hooks/useTopRatedMovies'
import useUpcomingMovies from '../hooks/useUpcomingMovies'
import { useSelector } from 'react-redux'
import MovieSuggestions from './MovieSuggestions'
import MovieModal from './MovieModal'

const Browser = () => {
  useNowPlayingMovies()
  usePopularPlayingMovies()
  useTopRatedMovies()
  useUpcomingMovies()
  const { searchedMovies } = useSelector((state) => state.movies);
  const dialogTopen = useSelector((state) => state.movies.dialogToOpen);
  return (
    <div>
      {/* <Header /> */}
      {searchedMovies?.length > 0 ? (
        <MovieSuggestions />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
       {dialogTopen && (
          <MovieModal
          />
          )}
    </div>
  );
}

export default Browser