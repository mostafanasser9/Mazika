import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Popper,
  Paper,
  Fade,
  Avatar,
  useTheme,
} from '@mui/material';

import { useNavigate, useLocation } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import DownloadIcon from '@mui/icons-material/Download';

const playlists = [
  {
    id: 'top-hits',
    name: "Today's Top Hits",
    image: 'https://picsum.photos/200/200?random=1',
  },
  {
    id: 'jazz',
    name: "Jazz Collection",
    image: 'https://picsum.photos/200/200?random=2',
  },
  {
    id: 'rap',
    name: "Rap Essentials",
    image: 'https://picsum.photos/200/200?random=3',
  },
  {
    id: 'rock',
    name: "Rock Classics",
    image: 'https://picsum.photos/200/200?random=4',
  },
  {
    id: 'metal',
    name: "Metal Masters",
    image: 'https://picsum.photos/200/200?random=5',
  },
  {
    id: 'pop',
    name: "Pop Hits",
    image: 'https://picsum.photos/200/200?random=6',
  },
  {
    id: 'country',
    name: "Country Roads",
    image: 'https://picsum.photos/200/200?random=7',
  },
  {
    id: 'reggae',
    name: "Reggae Vibes",
    image: 'https://picsum.photos/200/200?random=8',
  },
];

const Sidebar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const addBtnRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleMenu = (event) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

  const open = Boolean(anchorEl);

  const handlePlaylistClick = (playlist) => {
    navigate(`/playlist/${playlist.id}`);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 64,
        left: 0,
        width: 240,
        height: 'calc(100vh - 64px)',
        bgcolor: 'background.paper',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1200,
        borderRight: `1px solid ${theme.palette.divider}`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      {/* Library Section */}
      <Box sx={{ px: 3, pt: 3 }}>
        <Typography 
          variant="h6" 
          fontWeight="bold" 
          sx={{ 
            fontSize: '1.3rem',
            transition: theme.transitions.create('opacity'),
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          Your Library
        </Typography>
      </Box>

      {/* Create Playlist with Plus Button */}
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography 
          variant="subtitle1" 
          fontWeight="medium" 
          sx={{ 
            fontSize: '1.1rem',
            transition: theme.transitions.create('opacity'),
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          Create Playlist
        </Typography>
        <IconButton
          size="medium"
          color="inherit"
          ref={addBtnRef}
          onClick={handleToggleMenu}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          aria-label="Create new playlist menu"
          sx={{
            transition: theme.transitions.create(['background-color', 'transform']),
            '&:hover': {
              bgcolor: 'action.hover',
              transform: 'scale(1.1)',
            },
          }}
        >
          <AddIcon fontSize="medium" />
        </IconButton>
      </Box>

      {/* Popper Menu for Create Playlist */}
      <Popper 
        open={open} 
        anchorEl={anchorEl} 
        placement="bottom-end" 
        transition 
        sx={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                maxWidth: 220,
                bgcolor: 'background.paper',
                color: 'text.primary',
                borderRadius: 1,
                boxShadow: theme.shadows[3],
                transition: theme.transitions.create(['transform', 'opacity']),
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Create a new playlist
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Build a playlist with songs, or podcasts
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>

      <Divider />

      {/* Playlist and other items */}
      <Box sx={{ overflowY: 'auto', flexGrow: 1, mt: 3 }}>
        <List dense>
          {/* Liked Songs */}
          <ListItem 
            button 
            sx={{ 
              py: 1.2,
              borderRadius: 1,
              bgcolor: isActive('/liked') ? 'action.selected' : 'transparent',
              transition: theme.transitions.create(['background-color', 'transform']),
              '&:hover': {
                bgcolor: 'action.hover',
                transform: 'translateX(4px)',
              },
            }} 
            onClick={() => navigate('/liked')}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <FavoriteIcon 
                color={isActive('/liked') ? 'primary' : 'secondary'} 
                fontSize="medium"
                sx={{
                  transition: theme.transitions.create('transform'),
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Liked Songs"
              primaryTypographyProps={{
                fontWeight: isActive('/liked') ? 'bold' : 'medium',
                color: isActive('/liked') ? 'primary' : 'inherit',
                transition: theme.transitions.create(['color', 'font-weight']),
              }}
            />
          </ListItem>

          {/* Playlists with Images */}
          {playlists.map((playlist) => (
            <ListItem
              button
              key={playlist.id}
              sx={{
                py: 1.2,
                borderRadius: 1,
                bgcolor: isActive(`/playlist/${playlist.id}`) ? 'action.selected' : 'transparent',
                transition: theme.transitions.create(['background-color', 'transform']),
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'translateX(4px)',
                },
              }}
              onClick={() => handlePlaylistClick(playlist)}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Avatar
                  src={playlist.image}
                  alt={playlist.name}
                  variant="square"
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: 1,
                    boxShadow: theme.shadows[1],
                    transition: theme.transitions.create(['transform', 'box-shadow']),
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: theme.shadows[2],
                    },
                  }}
                />
              </ListItemIcon>
              <ListItemText 
                primary={playlist.name}
                primaryTypographyProps={{
                  fontWeight: isActive(`/playlist/${playlist.id}`) ? 'bold' : 'medium',
                  color: isActive(`/playlist/${playlist.id}`) ? 'primary' : 'inherit',
                  transition: theme.transitions.create(['color', 'font-weight']),
                }}
              />
            </ListItem>
          ))}

          <Divider sx={{ my: 2 }} />

          {/* Downloads */}
          <ListItem 
            button 
            sx={{ 
              py: 1.2,
              borderRadius: 1,
              bgcolor: isActive('/downloads') ? 'action.selected' : 'transparent',
              transition: theme.transitions.create(['background-color', 'transform']),
              '&:hover': {
                bgcolor: 'action.hover',
                transform: 'translateX(4px)',
              },
            }}
            onClick={() => navigate('/downloads')}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <DownloadIcon 
                color={isActive('/downloads') ? 'primary' : 'inherit'}
                sx={{
                  transition: theme.transitions.create('transform'),
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              />
            </ListItemIcon>
            <ListItemText 
              primary="Downloads"
              primaryTypographyProps={{
                fontWeight: isActive('/downloads') ? 'bold' : 'medium',
                color: isActive('/downloads') ? 'primary' : 'inherit',
                transition: theme.transitions.create(['color', 'font-weight']),
              }}
            />
          </ListItem>

          {/* History */}
          <ListItem 
            button 
            sx={{ 
              py: 1.2,
              borderRadius: 1,
              bgcolor: isActive('/history') ? 'action.selected' : 'transparent',
              transition: theme.transitions.create(['background-color', 'transform']),
              '&:hover': {
                bgcolor: 'action.hover',
                transform: 'translateX(4px)',
              },
            }}
            onClick={() => navigate('/history')}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <HistoryIcon 
                color={isActive('/history') ? 'primary' : 'inherit'}
                sx={{
                  transition: theme.transitions.create('transform'),
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              />
            </ListItemIcon>
            <ListItemText 
              primary="History"
              primaryTypographyProps={{
                fontWeight: isActive('/history') ? 'bold' : 'medium',
                color: isActive('/history') ? 'primary' : 'inherit',
                transition: theme.transitions.create(['color', 'font-weight']),
              }}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
