
import { Play, Info, VolumeX, Volume2 } from "lucide-react";
const VideoTitle = ({ mainMovieData,isMuted, onToggleMute }) => {
    const { overview, title } = mainMovieData;
  
    return (
      <div className="w-full aspect-video absolute top-0 left-0 text-white overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-black/80 via-black/40 to-transparent px-4 sm:px-8 md:px-12 lg:px-16 pt-[20%]">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="py-6 text-lg w-1/4">{overview}</p>
          <div className="flex items-center gap-4">
            {/* Play Button */}
            <button className="flex items-center gap-2 text-gray-300 bg-white/20 px-5 py-2 rounded hover:bg-white/30 transition">
              <Play size={20} />
              <span className="font-medium">Play</span>
            </button>
  
            {/* Info Button */}
            <button className="flex items-center gap-2 text-gray-300 bg-white/20 px-5 py-2 rounded hover:bg-white/30 transition">
              <Info size={20} />
              <span className="font-medium">Info</span>
            </button>
  
            {/* Mute/Unmute Toggle */}
            <button
              onClick={onToggleMute}
              className="flex items-center gap-2 text-gray-300 bg-white/20 px-5 py-2 rounded hover:bg-white/30 transition"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              <span className="font-medium">{isMuted ? "Unmute" : "Mute"}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default VideoTitle;
  
  