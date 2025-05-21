import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { useTheme } from '@mui/material/styles';

import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import MiniPlayer, { MINIPLAYER_HEIGHT } from '../components/layout/Miniplayer';

const sidebarWidth = 240;
const NAVBAR_HEIGHT = 64;

// Example playlist data - replace with actual data source
const playlists = {
  'top-hits': {
    id: 'top-hits',
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
        img: "/images/isitacrime.jpeg",
        dateAdded: "2025-03-15" 
      },
      { 
        id: 2, 
        title: "Running Up That Hill", 
        artist: "Kate Bush", 
        album: "Hounds of Love", 
        duration: "4:58",
        img: "/images/runningupthathill.jpeg",
        dateAdded: "2025-03-10" 
      },
      { 
        id: 3, 
        title: "Under Pressure", 
        artist: "Queen & David Bowie", 
        album: "Hot Space", 
        duration: "4:04",
        img: "/images/underpressure.jpeg",
        dateAdded: "2025-04-05" 
      },
      { 
        id: 4, 
        title: "Dreams", 
        artist: "Fleetwood Mac", 
        album: "Rumours", 
        duration: "4:17",
        img: "/images/dreams.jpeg",
        dateAdded: "2025-02-18" 
      },
      { 
        id: 5, 
        title: "Billie Jean", 
        artist: "Michael Jackson", 
        album: "Thriller", 
        duration: "4:54",
        img: "/images/billiejean.jpeg",
        dateAdded: "2025-05-01" 
      },
    ]
  },
  'jazz': {
    id: 'jazz',
    title: "Jazz Collection",
    description: "The best jazz tracks",
    coverImage: "https://picsum.photos/300/300?random=43",
    songs: [
      {
        id: 1,
        title: "Take Five",
        artist: "Dave Brubeck Quartet",
        album: "Time Out",
        duration: "5:24",
        img: "/images/takefive.jpeg",
        dateAdded: "2025-03-01"
      },
      {
        id: 2,
        title: "So What",
        artist: "Miles Davis",
        album: "Kind of Blue",
        duration: "9:22",
        img: "/images/sowhat.jpeg",
        dateAdded: "2025-03-02"
      },
      {
        id: 3,
        title: "What a Wonderful World",
        artist: "Louis Armstrong",
        album: "What a Wonderful World",
        duration: "2:19",
        img: "/images/whatawonderful.jpeg",
        dateAdded: "2025-03-03"
      }
    ]
  },
  'rap': {
    id: 'rap',
    title: "Rap Essentials",
    description: "The best rap tracks of all time",
    coverImage: "https://picsum.photos/300/300?random=44",
    songs: [
      {
        id: 1,
        title: "Lose Yourself",
        artist: "Eminem",
        album: "8 Mile",
        duration: "5:26",
        img: "/images/loseurself.jpeg",
        dateAdded: "2025-03-04"
      },
      {
        id: 2,
        title: "Juicy",
        artist: "The Notorious B.I.G.",
        album: "Ready to Die",
        duration: "5:02",
        img: "/images/juicy.jpeg",
        dateAdded: "2025-03-05"
      },
      {
        id: 3,
        title: "Nuthin' But a 'G' Thang",
        artist: "Dr. Dre ft. Snoop Dogg",
        album: "The Chronic",
        duration: "3:58",
        img: "/images/nuthing.jpeg",
        dateAdded: "2025-03-06"
      }
    ]
  },
  'rock': {
    id: 'rock',
    title: "Rock Classics",
    description: "The greatest rock songs ever",
    coverImage: "https://picsum.photos/300/300?random=45",
    songs: [
      {
        id: 1,
        title: "Stairway to Heaven",
        artist: "Led Zeppelin",
        album: "Led Zeppelin IV",
        duration: "8:02",
        img: "/images/stairway.jpeg",
        dateAdded: "2025-03-07"
      },
      {
        id: 2,
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        duration: "5:55",
        img: "/images/bohemian.jpeg",
        dateAdded: "2025-03-08"
      },
      {
        id: 3,
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        album: "Appetite for Destruction",
        duration: "5:56",
        img: "/images/sweet.jpeg",
        dateAdded: "2025-03-09"
      }
    ]
  },
  'metal': {
    id: 'metal',
    title: "Metal Masters",
    description: "The heaviest metal tracks",
    coverImage: "https://picsum.photos/300/300?random=46",
    songs: [
      {
        id: 1,
        title: "Master of Puppets",
        artist: "Metallica",
        album: "Master of Puppets",
        duration: "8:35",
        img: "/images/masterofpuppets.jpeg",
        dateAdded: "2025-03-10"
      },
      {
        id: 2,
        title: "Iron Man",
        artist: "Black Sabbath",
        album: "Paranoid",
        duration: "5:55",
        img: "/images/iron.jpeg",
        dateAdded: "2025-03-11"
      },
      {
        id: 3,
        title: "Ace of Spades",
        artist: "Motörhead",
        album: "Ace of Spades",
        duration: "2:46",
        img: "/images/ace.jpeg",
        dateAdded: "2025-03-12"
      }
    ]
  },
  'pop': {
    id: 'pop',
    title: "Pop Hits",
    description: "The biggest pop songs",
    coverImage: "https://picsum.photos/300/300?random=47",
    songs: [
      {
        id: 1,
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        duration: "3:53",
        img: "/images/shapeofyou.jpeg",
        dateAdded: "2025-03-13"
      },
      {
        id: 2,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        img: "/images/blindinglights.jpeg",
        dateAdded: "2025-03-14"
      },
      {
        id: 3,
        title: "Bad Guy",
        artist: "Billie Eilish",
        album: "When We All Fall Asleep, Where Do We Go?",
        duration: "3:14",
        img: "/images/badguy.jpeg",
        dateAdded: "2025-03-15"
      }
    ]
  },
  'country': {
    id: 'country',
    title: "Country Roads",
    description: "The best country music",
    coverImage: "https://picsum.photos/300/300?random=48",
    songs: [
      {
        id: 1,
        title: "Take Me Home, Country Roads",
        artist: "John Denver",
        album: "Poems, Prayers & Promises",
        duration: "3:10",
        img: "/images/takemehome.jpeg",
        dateAdded: "2025-03-16"
      },
      {
        id: 2,
        title: "Ring of Fire",
        artist: "Johnny Cash",
        album: "Ring of Fire: The Best of Johnny Cash",
        duration: "2:38",
        img: "/images/ringoffire.jpeg",
        dateAdded: "2025-03-17"
      },
      {
        id: 3,
        title: "Jolene",
        artist: "Dolly Parton",
        album: "Jolene",
        duration: "2:41",
        img: "/images/jolene.jpeg",
        dateAdded: "2025-03-18"
      }
    ]
  },
  'reggae': {
    id: 'reggae',
    title: "Reggae Vibes",
    description: "The best reggae tracks",
    coverImage: "https://picsum.photos/300/300?random=49",
    songs: [
      {
        id: 1,
        title: "No Woman, No Cry",
        artist: "Bob Marley & The Wailers",
        album: "Live!",
        duration: "7:08",
        img: "/images/nowoman.jpeg",
        dateAdded: "2025-03-19"
      },
      {
        id: 2,
        title: "Three Little Birds",
        artist: "Bob Marley & The Wailers",
        album: "Exodus",
        duration: "3:00",
        img: "/images/buffalosoldier.jpeg",
        dateAdded: "2025-03-20"
      },
      {
        id: 3,
        title: "Buffalo Soldier",
        artist: "Bob Marley & The Wailers",
        album: "Confrontation",
        duration: "4:15",
        img: "/images/buffalosoldier.jpeg",
        dateAdded: "2025-03-21"
      }
    ]
  }
};

export default function PlaylistPage() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [miniPlayerSong, setMiniPlayerSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState('title');
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const openSortMenu = Boolean(sortAnchorEl);
  const theme = useTheme();

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    const playlistData = playlists[id];
    if (playlistData) {
      setPlaylist(playlistData);
    } else {
      // Handle playlist not found
      setPlaylist(playlists['top-hits']); // Fallback to top hits
    }
    setLoading(false);
  }, [id]);

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
                      bgcolor: 'primary.light',
                      color: 'black',
                      p: 1.5,
                      '&:hover': {
                        bgcolor: 'primary.hover',
                        transform: 'scale(1.1)',
                        boxShadow: theme.shadows[8],
                        color: 'black',
                      },
                      transition: theme.transitions.create(['transform', 'box-shadow'], {
                        duration: theme.transitions.duration.shorter,
                        easing: theme.transitions.easing.easeInOut,
                      }),
                      boxShadow: theme.shadows[4],
                    }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <PauseIcon sx={{ fontSize: 38, color: 'black' }} /> : <PlayArrowIcon sx={{ fontSize: 38, color: 'black' }} />}
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