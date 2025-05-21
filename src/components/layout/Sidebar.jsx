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
} from '@mui/material';

import { useNavigate } from 'react-router-dom'; // <--- Import this

import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import HistoryIcon from '@mui/icons-material/History';
import DownloadIcon from '@mui/icons-material/Download';

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const addBtnRef = useRef(null);

  const navigate = useNavigate(); // <--- Initialize navigate

  const handleToggleMenu = (event) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

  const open = Boolean(anchorEl);

  // Handler for playlist clicks
  const handlePlaylistClick = (playlist) => {
    // You can pass playlist name as state or query param if needed
    // Example with state: navigate('/playlist', { state: { playlist } });
    // For now, just navigate to /playlist
    navigate('/playlist');
  };

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
      }}
    >
      {/* Top section */}
      <Box sx={{ px: 3, pt: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.3rem' }}>
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
        <Typography variant="subtitle1" fontWeight="medium" sx={{ fontSize: '1.1rem' }}>
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
        >
          <AddIcon fontSize="medium" />
        </IconButton>
      </Box>

      {/* Popper Menu for Create Playlist */}
      <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition sx={{ zIndex: 1300 }}>
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
                boxShadow: 3,
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
          <ListItem button sx={{ py: 1.2 }} onClick={() => navigate('/liked')}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <FavoriteIcon color="secondary" fontSize="medium" />
            </ListItemIcon>
            <ListItemText
              primary="Liked Songs"
              slotProps={{ primary: { fontSize: '1rem', fontWeight: 'medium' } }}
            />
          </ListItem>

          {/* Playlists */}
          {['Jazz', 'Rap', 'Rock', 'Metal', 'Pop', 'Country', 'Reggae'].map((playlist, index) => (
            <ListItem
              button
              key={index}
              sx={{
                py: 1.2,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              onClick={() => handlePlaylistClick(playlist)} // <--- Navigate on click
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LibraryMusicIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary={playlist} slotProps={{ fontSize: '1rem' }} />
            </ListItem>
          ))}

          <Divider sx={{ my: 2 }} />

          {/* Recently Played */}
          <ListItem button sx={{ py: 1.2 }} onClick={() => navigate('/recent')}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <HistoryIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Recently Played" slotProps={{ fontSize: '1rem' }} />
          </ListItem>

          {/* Downloads */}
          <ListItem button sx={{ py: 1.2 }} onClick={() => navigate('/downloads')}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <DownloadIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Downloads" slotProps={{ fontSize: '1rem' }} />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
