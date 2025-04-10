/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useCallback, useState } from "react";

/* eslint-disable no-empty-pattern */
const MainContainer = ({}) => {
    const [isMuted, setIsMuted] = useState(true);

    const handleToggleMute = useCallback(() => {
        console.log('### function trigred')
        setIsMuted((prev) => !prev);
      }, [setIsMuted]);
    
// const handleToggleMute = () => {
//     console.log('### function trigred')
//     setIsMuted((prev) => !prev);
//   };
    const movies = useSelector((state) => state.movies.nowPlayingMovies);

    return (
        <div>
            <VideoTitle mainMovieData={ movies?.[0] || {}} isMuted={isMuted}   onToggleMute={handleToggleMute}/>
            <VideoBackground mainMovieData={ movies?.[0] || {}}  isMuted={isMuted}
          />
        </div>
    )
}

export default MainContainer;