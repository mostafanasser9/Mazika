import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Fade,
  IconButton,
  InputAdornment,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';

import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import MiniPlayer, { MINIPLAYER_HEIGHT } from '../components/layout/Miniplayer';

const sidebarWidth = 240;
const NAVBAR_HEIGHT = 64;

// Example playlist data - replace with actual data source
const examplePlaylist = {
  id: 1,
  title: "Today's Top Hits",
  description: "The most popular tracks right now",
  coverImage: "https://picsum.photos/300/300?random=42",
  songs: [
    { 
      id: 1, 
      title: "Is It A Crime", 
      artist: "Sade", 
      album: "The Best of Sade", 
      duration: "6:22",
      img: "https://picsum.photos/200/200?random=1",
      dateAdded: "2025-03-15" 
    },
    { 
      id: 2, 
      title: "Running Up That Hill", 
      artist: "Kate Bush", 
      album: "Hounds of Love", 
      duration: "4:58",
      img: "https://picsum.photos/200/200?random=2",
      dateAdded: "2025-03-10" 
    },
    { 
      id: 3, 
      title: "Under Pressure", 
      artist: "Queen & David Bowie", 
      album: "Hot Space", 
      duration: "4:04",
      img: "https://picsum.photos/200/200?random=3",
      dateAdded: "2025-04-05" 
    },
    { 
      id: 4, 
      title: "Dreams", 
      artist: "Fleetwood Mac", 
      album: "Rumours", 
      duration: "4:17",
      img: "https://picsum.photos/200/200?random=4",
      dateAdded: "2025-02-18" 
    },
    { 
      id: 5, 
      title: "Billie Jean", 
      artist: "Michael Jackson", 
      album: "Thriller", 
      duration: "4:54",
      img: "https://picsum.photos/200/200?random=5",
      dateAdded: "2025-05-01" 
    },
  ]
};

export default function PlaylistPage({ playlist = examplePlaylist }) {
  const [miniPlayerSong, setMiniPlayerSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState('title');
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const openSortMenu = Boolean(sortAnchorEl);

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortSelect = (method) => {
    setSortMethod(method);
    handleSortClose();
  };

  const getSortMethodText = () => {
    switch (sortMethod) {
      case 'custom': return 'Custom Order';
      case 'title': return 'Title';
      case 'artist': return 'Artist';
      case 'album': return 'Album';
      case 'dateAdded': return 'Date Added';
      case 'duration': return 'Duration';
      default: return 'Title';
    }
  };

  const allSongs = playlist?.songs || [];
  
  // Filter songs based on search term
  const filteredSongs = allSongs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort songs based on selected sort method
  const sortedSongs = [...filteredSongs].sort((a, b) => {
    switch (sortMethod) {
      case 'custom':
        return 0; // Maintain original order
      case 'title':
        return a.title.localeCompare(b.title);
      case 'artist':
        return a.artist.localeCompare(b.artist);
      case 'album':
        return a.album.localeCompare(b.album);
      case 'dateAdded':
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      case 'duration':
        const aDuration = a.duration.split(':').reduce((acc, time) => (60 * acc) + parseInt(time), 0);
        const bDuration = b.duration.split(':').reduce((acc, time) => (60 * acc) + parseInt(time), 0);
        return aDuration - bDuration;
      default:
        return 0;
    }
  });

  const handlePlaySong = (song) => {
    setMiniPlayerSong(song);
    setIsPlaying(true);
    console.log(`Playing song:`, song);
  };

  const handlePlayPausePlaylist = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && allSongs.length > 0 && !miniPlayerSong) {
      setMiniPlayerSong(allSongs[0]);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar width={sidebarWidth} topOffset={NAVBAR_HEIGHT} />

        <Box
          component="main"
          sx={{
            ml: `${sidebarWidth}px`,
            mt: `${NAVBAR_HEIGHT}px`,
            p: 3,
            color: 'white',
            background: 'linear-gradient(180deg, rgba(3,26,68,1) 0%, rgba(18,18,18,1) 100%)',
            flexGrow: 1,
            paddingBottom: `${MINIPLAYER_HEIGHT + 16}px`,
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress color="secondary" size={60} thickness={4.5} />
            </Box>
          ) : (
            <Fade in timeout={400}>
              <Box>
                {/* Playlist Header */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'center', sm: 'flex-end' },
                    gap: 3,
                    mb: 4,
                    pt: 2,
                  }}
                >
                  {/* Playlist Cover */}
                  <Box
                    component="img"
                    sx={{
                      width: { xs: 180, sm: 220 },
                      height: { xs: 180, sm: 220 },
                      objectFit: 'cover',
                      boxShadow: '0 4px 60px rgba(0,0,0,0.5)',
                    }}
                    src={playlist.coverImage}
                    alt={playlist.title}
                  />
                  
                  {/* Playlist Details */}
                  <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, flexGrow: 1, pb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      PLAYLIST
                    </Typography>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                        letterSpacing: '-0.02em',
                        mb: 1
                      }}
                    >
                      {playlist.title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#b3b3b3', mb: 2 }}>
                      {playlist.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                      {allSongs.length} songs
                    </Typography>
                  </Box>
                </Box>

                {/* Controls Row */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                    flexWrap: 'wrap',
                    gap: 2
                  }}
                >
                  {/* Play Button - Updated with your blue color scheme */}
                  <IconButton 
                    onClick={handlePlayPausePlaylist}
                    sx={{
                      bgcolor: '#50C5F9',  // Changed from green to dark blue
                      color: 'white',
                      p: 1.5,
                      '&:hover': {
                        bgcolor: '#31a44f', // Changed hover from light green to light blue
                        transform: 'scale(1.04)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <PauseIcon sx={{ fontSize: 38 }} /> : <PlayArrowIcon sx={{ fontSize: 38 }} />}
                  </IconButton>

                  {/* Search and Sort */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      placeholder="Search in playlist"
                      variant="outlined"
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'gray' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#2a2a2a',
                          borderRadius: '4px',
                          '& fieldset': { border: 'none' },
                          '&:hover fieldset': { border: 'none' },
                          '&.Mui-focused fieldset': { border: 'none' },
                        },
                        width: { xs: '100%', sm: '220px' }
                      }}
                    />
                    <IconButton 
                      aria-label="Sort"
                      aria-controls={openSortMenu ? 'sort-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openSortMenu ? 'true' : undefined}
                      onClick={handleSortClick}
                      sx={{ color: '#b3b3b3' }}
                    >
                      <SortIcon />
                    </IconButton>
                    <Menu
                      id="sort-menu"
                      anchorEl={sortAnchorEl}
                      open={openSortMenu}
                      onClose={handleSortClose}
                      MenuListProps={{
                        'aria-labelledby': 'sort-button',
                      }}
                      sx={{ 
                        '& .MuiPaper-root': { 
                          bgcolor: '#282828', 
                          color: 'white',
                          boxShadow: '0 16px 24px rgba(0,0,0,0.3)',
                          borderRadius: '4px',
                          minWidth: '180px',
                        }
                      }}
                    >
                      <MenuItem 
                        onClick={() => handleSortSelect('custom')}
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          color: sortMethod === 'custom' ? '#50C5F9' : 'white',
                        }}
                      >
                        Custom Order
                        {sortMethod === 'custom' && <CheckIcon fontSize="small" />}
                      </MenuItem>
                      <MenuItem 
                        onClick={() => handleSortSelect('title')}
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          color: sortMethod === 'title' ? '#50C5F9' : 'white',
                        }}
                      >
                        Title
                        {sortMethod === 'title' && <CheckIcon fontSize="small" />}
                      </MenuItem>
                      <MenuItem 
                        onClick={() => handleSortSelect('artist')}
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          color: sortMethod === 'artist' ? '#50C5F9' : 'white',
                        }}
                      >
                        Artist
                        {sortMethod === 'artist' && <CheckIcon fontSize="small" />}
                      </MenuItem>
                      <MenuItem 
                        onClick={() => handleSortSelect('album')}
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          color: sortMethod === 'album' ? '#50C5F9' : 'white',
                        }}
                      >
                        Album
                        {sortMethod === 'album' && <CheckIcon fontSize="small" />}
                      </MenuItem>
                      <MenuItem 
                        onClick={() => handleSortSelect('dateAdded')}
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          color: sortMethod === 'dateAdded' ? '#50C5F9' : 'white',
                        }}
                      >
                        Date Added
                        {sortMethod === 'dateAdded' && <CheckIcon fontSize="small" />}
                      </MenuItem>
                      <MenuItem 
                        onClick={() => handleSortSelect('duration')}
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          color: sortMethod === 'duration' ? '#50C5F9' : 'white',
                        }}
                      >
                        Duration
                        {sortMethod === 'duration' && <CheckIcon fontSize="small" />}
                      </MenuItem>
                    </Menu>
                  </Box>
                </Box>

                {/* Songs Table */}
                <TableContainer 
                  component={Paper} 
                  sx={{ 
                    bgcolor: 'transparent', 
                    boxShadow: 'none',
                    '& .MuiTableRow-root:hover': {
                      bgcolor: '#282828'
                    }
                  }}
                >
                  <Table sx={{ minWidth: 650 }} aria-label="playlist songs table">
                    <TableHead>
                      <TableRow sx={{ borderBottom: '1px solid #282828' }}>
                        <TableCell sx={{ color: '#b3b3b3', width: '40px', borderBottom: 'none' }}>#</TableCell>
                        <TableCell sx={{ color: '#b3b3b3', borderBottom: 'none' }}>TITLE</TableCell>
                        <TableCell sx={{ color: '#b3b3b3', borderBottom: 'none' }}>ALBUM</TableCell>
                        <TableCell align="right" sx={{ color: '#b3b3b3', borderBottom: 'none' }}>
                          <AccessTimeIcon fontSize="small" />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedSongs.map((song, index) => (
                        <TableRow 
                          key={song.id}
                          onClick={() => handlePlaySong(song)}
                          sx={{ 
                            cursor: 'pointer',
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell 
                            sx={{ 
                              color: miniPlayerSong?.id === song.id ? '#50C5F9' : '#b3b3b3',
                              fontWeight: miniPlayerSong?.id === song.id ? 'bold' : 'normal',
                              borderBottom: 'none'
                            }}
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell sx={{ borderBottom: 'none' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar 
                                src={song.img} 
                                alt={song.title}
                                variant="square"
                                sx={{ width: 40, height: 40 }}
                              />
                              <Box>
                                <Typography 
                                  variant="body1"
                                  sx={{ 
                                    color: miniPlayerSong?.id === song.id ? '#50C5F9' : 'white',
                                    fontWeight: miniPlayerSong?.id === song.id ? 'bold' : 'normal',
                                  }}
                                >
                                  {song.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                                  {song.artist}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ color: '#b3b3b3', borderBottom: 'none' }}>{song.album}</TableCell>
                          <TableCell align="right" sx={{ color: '#b3b3b3', borderBottom: 'none' }}>{song.duration}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Fade>
          )}
        </Box>
      </Box>

      <MiniPlayer song={miniPlayerSong} isPlaying={isPlaying} onPlayPause={handlePlayPausePlaylist} />
      <Footer />
    </Box>
  );
}