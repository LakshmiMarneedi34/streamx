const VideoTitle = ({ mainMovieData }) => {
    const { overview, title } = mainMovieData;
  
    return (
      <div className="w-full aspect-video absolute top-0 left-0 text-white overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-black/80 via-black/40 to-transparent px-4 sm:px-8 md:px-12 lg:px-16 pt-[20%]">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="py-6 text-lg w-1/4">{overview}</p>
          <div className="flex">
            <button className="bg-white text-black px-8 py-2 text-lg rounded-lg hover:bg-opacity-80 transition duration-300">
              ▶ Play
            </button>
            <button className="ml-4 bg-gray-500 text-white px-8 py-2 text-lg rounded-lg hover:bg-opacity-80 transition duration-300">
              More Info
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default VideoTitle;
  
  