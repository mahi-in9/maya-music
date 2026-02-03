import { useEffect, useRef } from "react";
import { loadYouTubeAPI } from "./YouTubeAPI";

export function useYouTubePlayer(onEnd) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    loadYouTubeAPI().then(() => {
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        height: "0",
        width: "0",
        playerVars: {
          autoplay: 1, // Auto play when loaded
          controls: 0,
        },
        events: {
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED) {
              onEnd?.();
            }
          },
        },
      });
    });
  }, [onEnd]); // Added onEnd dependency for best practice

  const load = (videoId) => {
    playerRef.current?.loadVideoById(videoId);
  };

  const play = () => playerRef.current?.playVideo();
  const pause = () => playerRef.current?.pauseVideo();
  const stop = () => playerRef.current?.stopVideo();
  const seekTo = (seconds) => playerRef.current?.seekTo(seconds, true);
  const getDuration = () => playerRef.current?.getDuration();
  const getCurrentTime = () => playerRef.current?.getCurrentTime();
  const setVolume = (volume) => playerRef.current?.setVolume(volume);
  const getVolume = () => playerRef.current?.getVolume();
  const mute = () => playerRef.current?.mute();
  const unMute = () => playerRef.current?.unMute();

  return {
    containerRef,
    load,
    play,
    pause,
    stop,
    seekTo,
    getDuration,
    getCurrentTime,
    setVolume,
    getVolume,
    mute,
    unMute,
  };
}
