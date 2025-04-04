/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

/* eslint-disable no-empty-pattern */
const MainContainer = ({}) => {
     
    const movies = useSelector((state) => state.movies.nowPlayingMovies);

    return (
        <div>
            <VideoTitle mainMovieData={ movies?.[0] || {}}/>
            <VideoBackground mainMovieData={ movies?.[0] || {}}/>
        </div>
    )
}

export default MainContainer;