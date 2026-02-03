import { useState, useEffect, useCallback } from "react";
import { useYouTubePlayer } from "./useYouTubePlayer";
import { Queue } from "./queue";

// Replace with your actual key
const YOUTUBE_API_KEY = "AIzaSyCIRC_omaZt52y-g18eaQcpjBtSnIY5Cls";

const queue = new Queue([
  {
    title: "Never Gonna Give You Up",
    videoId: "dQw4w9WgXcQ",
    artist: "Rick Astley",
    duration: "3:32",
  },
]);

export default function MusicPlayer() {
  const [current, setCurrent] = useState(queue.current());
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Store real results
  const [isSearching, setIsSearching] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // --- EXISTING PLAYER LOGIC (Unchanged) ---
  const onEnd = useCallback(() => {
    const next = queue.next();
    if (next) {
      setCurrent(next);
      load(next.videoId);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setProgress(0);
    }
  }, []);

  const {
    containerRef,
    load,
    play,
    pause,
    stop,
    seekTo,
    getDuration,
    getCurrentTime,
    setVolume: setPlayerVolume,
    mute,
    unMute,
  } = useYouTubePlayer(onEnd);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        const currentTime = getCurrentTime?.() || 0;
        const duration = getDuration?.() || 1;
        setProgress((currentTime / duration) * 100);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, getCurrentTime, getDuration]);

  const playSong = useCallback(
    (song) => {
      if (!song) return;
      setCurrent(song);
      load(song.videoId);
      setIsPlaying(true);
    },
    [load]
  );

  const togglePlayPause = () => {
    if (isPlaying) pause();
    else play();
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setPlayerVolume(newVolume);
  };

  const handleSeek = (e) => {
    const newProgress = parseInt(e.target.value);
    const duration = getDuration?.() || 0;
    const newTime = (newProgress / 100) * duration;
    seekTo(newTime);
    setProgress(newProgress);
  };

  // --- QUEUE MANAGEMENT (Unchanged) ---
  const addToQueue = (song) => {
    queue.enqueue(song);
    setCurrent(queue.current());
  };

  const removeFromQueue = (videoId) => {
    queue.remove(videoId);
    setCurrent(queue.current());
  };

  // --- NEW: REAL SEARCH FUNCTION ---
  const handleSearch = async () => {
    if (!query) return;
    setIsSearching(true);

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
          query
        )}&type=video&key=${YOUTUBE_API_KEY}`
      );

      const data = await response.json();

      if (data.items) {
        const formattedResults = data.items.map((item) => ({
          title: item.snippet.title,
          videoId: item.id.videoId,
          artist: item.snippet.channelTitle,
          duration: "N/A", // API doesn't return duration in search results
        }));
        setSearchResults(formattedResults);
      }
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
      alert("Search failed. Check API Key or quota.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <div ref={containerRef} />

      {/* Player UI */}
      <div
        style={{
          marginBottom: 20,
          padding: 20,
          background: "#f8f9fa",
          borderRadius: 8,
        }}
      >
        <h3>Now Playing</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <img
            src={`https://img.youtube.com/vi/${current?.videoId}/default.jpg`}
            alt="thumbnail"
            style={{
              width: 120,
              height: 90,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
          <div>
            <strong style={{ display: "block", fontSize: "1.1em" }}>
              {current?.title}
            </strong>
            <span style={{ color: "#666" }}>{current?.artist}</span>
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          style={{ width: "100%", margin: "15px 0" }}
        />

        <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
          <button
            onClick={() => {
              if (queue.index > 0) {
                queue.index--;
                playSong(queue.current());
              }
            }}
          >
            ⏮ Prev
          </button>

          <button onClick={togglePlayPause} style={{ minWidth: 80 }}>
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>

          <button
            onClick={() => {
              const next = queue.next();
              if (next) playSong(next);
            }}
          >
            Next ⏭
          </button>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span>🔈</span>
            <input
              type="range"
              value={volume}
              onChange={handleVolumeChange}
              style={{ width: 80 }}
            />
          </div>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div style={{ marginBottom: 20 }}>
        <h4>Search YouTube</h4>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="text"
            placeholder="Search for a song..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            style={{ flex: 1, padding: 8 }}
          />
          <button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Results List */}
        {searchResults.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, marginTop: 10 }}>
            {searchResults.map((song) => (
              <li
                key={song.videoId}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "70%",
                  }}
                >
                  {song.title}{" "}
                  <span style={{ color: "#888", fontSize: "0.9em" }}>
                    - {song.artist}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      addToQueue(song);
                      // Optional: Play immediately if nothing is playing
                      if (!isPlaying) playSong(song);
                    }}
                    style={{ marginRight: 5 }}
                  >
                    + Queue
                  </button>
                  <button onClick={() => playSong(song)}>▶ Play</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Queue UI */}
      <div>
        <h4>Up Next</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {queue.getAll().map((song, idx) => (
            <li
              key={`${song.videoId}-${idx}`}
              style={{
                padding: 8,
                backgroundColor: idx === queue.index ? "#e3f2fd" : "white",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                onClick={() => playSong(song)}
                style={{ cursor: "pointer" }}
              >
                {idx === queue.index && "▶ "} {song.title}
              </span>
              <button
                onClick={() => removeFromQueue(song.videoId)}
                style={{ color: "red", border: "none", background: "none" }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
