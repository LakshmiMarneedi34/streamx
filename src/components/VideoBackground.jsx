/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import {API_OPTIONS} from '../utils/constants'
import {  useSelector } from 'react-redux';
import { addCurrentTrailerDetails } from '../utils/movieSlice';
import useMovieTrailer from '../hooks/useMovieTrailer';
const VideoBackground = ({
  mainMovieData
}) => {
const trailerDetails = useSelector((state)=> state.movies.currentTrailerDetails)
useMovieTrailer(mainMovieData)
    return (
      <div className='w-screen'>
        <iframe  
        title = "YouTube video player"
        className='w-screen aspect-video'
        src={`https://www.youtube.com/embed/${trailerDetails?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  
    ></iframe>
      </div>
    )
}
export default VideoBackground