import { useState } from "react";

// Fake TMDB-style movie data
const demoMovie = {
    id: 54321,
    title: "Night of the Living Dead",
    overview:
      "A group of people hide from bloodthirsty zombies in a farmhouse.",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/p9ZUzCyy9wRTD5b0oLFfWdy0n2w.jpg", // TMDB backdrop
video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  };
  

// Fullscreen custom video player
const MoviePlayer = ({ movie, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black z-50">
        <button
          className="absolute top-5 right-5 text-white z-50 text-2xl"
          onClick={onClose}
        >
          ✖
        </button>
        <video controls autoPlay className="w-full h-full object-contain">
          <source src={movie.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-10 left-10 text-white bg-black bg-opacity-60 p-4 rounded-lg">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="max-w-xl mt-2 text-sm">{movie.overview}</p>
        </div>
      </div>
    );
  };
  

// Main test component
const TestMoviePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative text-white bg-black h-screen flex flex-col items-center justify-center">
      <img
        src={demoMovie.backdrop_path}
        alt="Movie"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
      />
      <div className="z-10 text-center">
        <h1 className="text-4xl font-bold">{demoMovie.title}</h1>
        <p className="max-w-xl mx-auto mt-4">{demoMovie.overview}</p>
        <button
          className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded"
          onClick={() => setIsPlaying(true)}
        >
          ▶ Play
        </button>
      </div>

      {isPlaying && (
        <MoviePlayer movie={demoMovie} onClose={() => setIsPlaying(false)} />
      )}
    </div>
  );
};

export default TestMoviePlayer;
