/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useCallback, useState } from "react";
import MovieModal from "./MovieModal";

/* eslint-disable no-empty-pattern */
const MainContainer = ({}) => {
  //StoreValues
  const movies = useSelector((state) => state.movies.nowPlayingMovies);

  //States
    const [isMuted, setIsMuted] = useState(true);
    const [displayMoreInfo,setDisplayMoreInfo] = useState(false);



    const handleToggleMute = useCallback(() => {
        console.log('### function trigred')
        setIsMuted((prev) => !prev);
      }, [setIsMuted]);
    
      const onHide = ()=>{
        setDisplayMoreInfo(false)
      }
    

    return (
        <div>
            <VideoTitle 
              mainMovieData={ movies?.[0] || {}}
             isMuted={isMuted}   
             onToggleMute={handleToggleMute}
             displayMoreInfo={displayMoreInfo}
             setDisplayMoreInfo={setDisplayMoreInfo}
             />
            <VideoBackground mainMovieData={ movies?.[0] || {}}  isMuted={isMuted}
          />
         
        </div>
    )
}

export default MainContainer;