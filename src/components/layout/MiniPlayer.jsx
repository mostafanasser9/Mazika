import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Slider,
  Tooltip,
} from '@mui/material';

import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const sidebarWidth = 240;
export const MINIPLAYER_HEIGHT = 80;

// Play Button toggles between PlayArrowIcon and PauseIcon
export const PlayButton = ({ onClick, isPlaying, size = 40, ariaLabel }) => {
  const theme = useTheme();
  return (
    <IconButton
      onClick={onClick}
      aria-label={ariaLabel}
      sx={{
        bgcolor: { xs: 'primary.light', md: 'white' },
        width: size,
        height: size,
        transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeInOut,
        }),
        '&:hover': {
          bgcolor: { xs: 'primary.hover', md: 'white' },
          transform: 'scale(1.1)',
          boxShadow: theme.shadows[8],
        },
        boxShadow: theme.shadows[4],
      }}
    >
      {isPlaying ? (
        <PauseIcon sx={{ 
          color: { xs: 'black', md: 'black' }, 
          fontSize: size * 0.6,
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeInOut,
          }),
        }} />
      ) : (
        <PlayArrowIcon sx={{ 
          color: { xs: 'black', md: 'black' }, 
          fontSize: size * 0.6,
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeInOut,
          }),
        }} />
      )}
    </IconButton>
  );
};

// Utility to format seconds into mm:ss
const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const MiniPlayer = ({ song, isPlaying, onPlayPause }) => {
  const theme = useTheme();
  const [shuffleActive, setShuffleActive] = useState(false);
  const [repeatActive, setRepeatActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (song) {
      // Reset states when a new song is loaded
      setCurrentTime(0);
      setProgress(0);
      // Set duration from song if available, otherwise use default
      setDuration(song.duration ? parseDuration(song.duration) : 180);
    }
  }, [song]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            onPlayPause(false);
            return 0;
          }
          const newTime = prev + 1;
          setProgress((newTime / duration) * 100);
          return newTime;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, duration, onPlayPause]);

  // Parse duration string (e.g. "3:45") to seconds
  const parseDuration = (durationStr) => {
    if (!durationStr) return 180;
    const [minutes, seconds] = durationStr.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  if (!song) return null;

  const title = song.title || song.name || 'Playing...';
  const subtitle = song.artist || song.host || '';

  const handlePlayPause = () => {
    if (onPlayPause) {
      onPlayPause(!isPlaying);
    }
  };

  const handleVolumeChange = (e, val) => {
    setVolume(val);
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e, newValue) => {
    const newTime = (newValue / 100) * duration;
    setCurrentTime(newTime);
    setProgress(newValue);
  };

  const handleProgressChangeCommitted = (e, newValue) => {
    const newTime = (newValue / 100) * duration;
    setCurrentTime(newTime);
    setProgress(newValue);
    // Resume playback if it was playing
    if (isPlaying) {
      onPlayPause(false);
      setTimeout(() => onPlayPause(true), 0);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: { xs: 70, md: MINIPLAYER_HEIGHT },
        bgcolor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        padding: { xs: '0 12px', md: '0 16px' },
        zIndex: 1500,
        boxShadow: theme.shadows[8],
        borderTop: `1px solid ${theme.palette.divider}`,
        transition: theme.transitions.create(['height', 'transform'], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeInOut,
        }),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          px: { xs: 1, md: 2 },
        }}
      >
        {/* Left section - Song info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: { xs: '80%', md: '30%' } }}>
          <Box
            component="img"
            src={song?.img ? (song.img.startsWith('/') ? song.img : `/${song.img}`) : 'images/default-cover.jpeg'}
            alt={song?.title || 'No song playing'}
            sx={{
              width: { xs: 48, md: 56 },
              height: { xs: 48, md: 56 },
              borderRadius: 1,
              objectFit: 'cover',
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shorter,
                easing: theme.transitions.easing.easeInOut,
              }),
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'normal',
                fontSize: { xs: '0.85rem', md: '0.9rem' },
                color: 'text.primary',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: theme.transitions.create('opacity'),
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              {song?.title || 'No song playing'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.75rem', md: '0.8rem' },
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: theme.transitions.create('opacity'),
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Box>

        {/* Center section - Playback controls */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 1,
          width: '40%',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton size="small" onClick={() => setShuffleActive(!shuffleActive)}>
              <ShuffleIcon />
            </IconButton>
            <IconButton size="small">
              <SkipPreviousIcon />
            </IconButton>
            <PlayButton isPlaying={isPlaying} onClick={handlePlayPause} />
            <IconButton size="small">
              <SkipNextIcon />
            </IconButton>
            <IconButton size="small" onClick={() => setRepeatActive(!repeatActive)}>
              <RepeatIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', minWidth: 40 }}>
              {formatTime(currentTime)}
            </Typography>
            <Slider 
              size="small" 
              value={progress} 
              onChange={handleProgressChange}
              sx={{
                color: 'white',
                '& .MuiSlider-thumb': {
                  color: 'white',
                },
                '& .MuiSlider-track': {
                  color: 'white',
                },
                '& .MuiSlider-rail': {
                  color: 'rgba(255, 255, 255, 0.3)',
                }
              }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary', minWidth: 40 }}>
              {formatTime(duration)}
            </Typography>
          </Box>
        </Box>

        {/* Right section - Mobile Play Button & Desktop Volume Control */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          width: { xs: '20%', md: '30%' },
          justifyContent: 'flex-end',
          ml: 'auto'
        }}>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <PlayButton
              size={40}
              isPlaying={isPlaying}
              onClick={handlePlayPause}
              ariaLabel={isPlaying ? "Pause" : "Play"}
            />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <IconButton size="small" onClick={toggleMute}>
              {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
            <Slider
              size="small"
              value={isMuted ? 0 : volume}
              max={100}
              onChange={handleVolumeChange}
              sx={{ 
                width: 100,
                color: 'white',
                '& .MuiSlider-thumb': {
                  color: 'white',
                },
                '& .MuiSlider-track': {
                  color: 'white',
                },
                '& .MuiSlider-rail': {
                  color: 'rgba(255, 255, 255, 0.3)',
                }
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Add audio element for playback */}
      <audio
        ref={audioRef}
        src={song.audio ? song.audio : undefined}
        style={{ display: 'none' }}
        onTimeUpdate={e => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={e => setDuration(e.target.duration)}
        onEnded={() => onPlayPause(false)}
        autoPlay={isPlaying}
      />
    </Box>
  );
};

export default MiniPlayer;
