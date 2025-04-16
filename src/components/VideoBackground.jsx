import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ mainMovieData, isMuted }) => {
  const trailerDetails = useSelector((state) => state.movies.currentTrailerDetails);
  const iframeRef = useRef(null);

  useMovieTrailer(mainMovieData);

  // Initial mute when iframe loads
  const handleIframeLoad = () => {
    if (!iframeRef.current) return;
    const message = JSON.stringify({
      event: 'command',
      func: 'mute',
      args: [],
    });
    iframeRef.current.contentWindow.postMessage(message, '*');
  };

  // Mute/unmute when prop changes
  useEffect(() => {
    if (!iframeRef.current) return;
    const message = JSON.stringify({
      event: 'command',
      func: isMuted ? 'mute' : 'unMute',
      args: [],
    });
    iframeRef.current.contentWindow.postMessage(message, '*');
  }, [isMuted]);

  return (
    <div className="w-screen">
      {trailerDetails?.key && (
        <iframe
          ref={iframeRef}
          title="YouTube video player"
          className="w-screen aspect-video"
          src={`https://www.youtube.com/embed/${trailerDetails.key}?autoplay=1&enablejsapi=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={handleIframeLoad}
        ></iframe>
      )}
    </div>
  );
};

export default VideoBackground;
