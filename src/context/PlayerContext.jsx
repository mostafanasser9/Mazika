import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySong = (song) => {
    if (currentSong?.id === song.id) {
      // If clicking the same song, toggle play/pause
      setIsPlaying(!isPlaying);
    } else {
      // If clicking a different song, play it
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = (playing) => {
    setIsPlaying(playing);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        handlePlaySong,
        handlePlayPause,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
} 