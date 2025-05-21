import React, { useState } from 'react';
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Slider,
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
const MINIPLAYER_HEIGHT = 70;

// Play Button toggles between PlayArrowIcon and PauseIcon
export const PlayButton = ({ onClick, isPlaying, size = 40, ariaLabel }) => {
  const theme = useTheme();
  return (
    <IconButton
      onClick={onClick}
      aria-label={ariaLabel}
      sx={{
        bgcolor: theme.palette.primary.light,
        width: size,
        height: size,
        '&:hover': {
          bgcolor: theme.palette.primary.main,
        },
        boxShadow: '0 4px 8px rgb(0 0 0 / 0.3)',
      }}
    >
      {isPlaying ? (
        <PauseIcon sx={{ color: 'white', fontSize: size * 0.6 }} />
      ) : (
        <PlayArrowIcon sx={{ color: 'white', fontSize: size * 0.6 }} />
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

const MiniPlayer = ({ song, onClose }) => {
  const theme = useTheme();
  const [shuffleActive, setShuffleActive] = useState(false);
  const [repeatActive, setRepeatActive] = useState(false);
  const [progress, setProgress] = useState(30);
  const duration = 240;
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);

  if (!song) return null;

  const title = song.title || song.name || 'Playing...';
  const subtitle = song.artist || song.host || '';

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e, val) => {
    setVolume(val);
    setMuted(val === 0);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: `${MINIPLAYER_HEIGHT}px`,
        bgcolor: '#121212',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        zIndex: 1500,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.7)',
      }}
    >
      {/* Song Image */}
      <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 160, mr: 2 }}>
        <Box
          component="img"
          src={song.img}
          alt={title}
          sx={{ width: 48, height: 48, borderRadius: 1, mr: 1.5 }}
        />
        <Box sx={{ overflow: 'hidden', minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              display: 'block',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'grey.500',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              display: 'block',
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>

      {/* Controls */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 2,
          color: 'grey.400',
          userSelect: 'none',
          minWidth: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          {/* Shuffle */}
          <IconButton
            onClick={() => setShuffleActive(!shuffleActive)}
            aria-label="Shuffle"
            sx={{
              color: shuffleActive ? theme.palette.primary.light : 'inherit',
              transition: 'color 0.3s',
              '&:hover': {
                color: theme.palette.primary.light,
                transform: 'scale(1.1)',
              },
              padding: '4px',
            }}
            size="small"
          >
            <ShuffleIcon fontSize="small" />
          </IconButton>

          {/* Previous */}
          <IconButton
            aria-label="Previous"
            sx={{
              '&:hover': {
                color: theme.palette.primary.light,
                transform: 'scale(1.1)',
              },
              transition: 'color 0.3s, transform 0.3s',
              padding: '4px',
            }}
            size="small"
          >
            <SkipPreviousIcon fontSize="small" />
          </IconButton>

          {/* Play/Pause */}
          <PlayButton
            size={40}
            ariaLabel={isPlaying ? 'Pause' : 'Play'}
            isPlaying={isPlaying}
            onClick={handlePlayPause}
          />

          {/* Next */}
          <IconButton
            aria-label="Next"
            sx={{
              '&:hover': {
                color: theme.palette.primary.light,
                transform: 'scale(1.1)',
              },
              transition: 'color 0.3s, transform 0.3s',
              padding: '4px',
            }}
            size="small"
          >
            <SkipNextIcon fontSize="small" />
          </IconButton>

          {/* Repeat */}
          <IconButton
            onClick={() => setRepeatActive(!repeatActive)}
            aria-label="Repeat"
            sx={{
              color: repeatActive ? theme.palette.primary.light : 'inherit',
              transition: 'color 0.3s',
              '&:hover': {
                color: theme.palette.primary.light,
                transform: 'scale(1.1)',
              },
              padding: '4px',
            }}
            size="small"
          >
            <RepeatIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Progress bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: 1,
            userSelect: 'none',
          }}
        >
          <Typography sx={{ fontSize: '0.65rem', color: 'grey.500', width: 30, textAlign: 'right', flexShrink: 0 }}>
            {formatTime(progress)}
          </Typography>

          <Slider
            aria-label="progress"
            size="small"
            value={progress}
            max={duration}
            onChange={(e, val) => setProgress(val)}
            sx={{
              color: 'white',
              '& .MuiSlider-thumb': {
                width: 10,
                height: 10,
              },
              '& .MuiSlider-rail': {
                opacity: 0.3,
              },
              flexGrow: 1,
            }}
          />

          <Typography sx={{ fontSize: '0.65rem', color: 'grey.500', width: 30, flexShrink: 0 }}>
            {formatTime(duration)}
          </Typography>
        </Box>
      </Box>

      {/* Volume controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          minWidth: 120,
          color: 'grey.400',
          ml: 2,
          flexShrink: 0,
        }}
      >
        <IconButton
          aria-label={muted ? 'Unmute' : 'Mute'}
          onClick={toggleMute}
          size="small"
          sx={{
            color: muted ? theme.palette.primary.light : 'inherit',
            transition: 'color 0.3s',
            '&:hover': {
              color: theme.palette.primary.light,
            },
          }}
        >
          {muted ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
        </IconButton>
        <Slider
          aria-label="volume"
          size="small"
          value={muted ? 0 : volume}
          min={0}
          max={100}
          onChange={handleVolumeChange}
          sx={{
            width: 80,
            color: 'white',
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
            },
            '& .MuiSlider-rail': {
              opacity: 0.3,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export { MINIPLAYER_HEIGHT };
export default MiniPlayer;
