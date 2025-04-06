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

const Browser = () => {
  useNowPlayingMovies()
  usePopularPlayingMovies()
  useTopRatedMovies()
  useUpcomingMovies()


  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
    </div>
  )
}

export default Browser