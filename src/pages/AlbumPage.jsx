import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Fade,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Divider,
  useTheme,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';

import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import MiniPlayer, { MINIPLAYER_HEIGHT } from '../components/layout/Miniplayer';
import { getAlbumById } from '../data/albums';
import { getArtistById } from '../data/artists';

const sidebarWidth = 240;
const NAVBAR_HEIGHT = 64;

export default function AlbumPage() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [miniPlayerSong, setMiniPlayerSong] = useState(null);
  const [currentlyPlayingTrackId, setCurrentlyPlayingTrackId] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const albumData = getAlbumById(id);
      if (albumData) {
        setAlbum(albumData);
        const artistData = getArtistById(albumData.artistId);
        setArtist(artistData);
      } else {
        navigate('/');
      }
      setLoading(false);
    };

    fetchData();
  }, [id, navigate]);

  const handleArtistClick = () => {
    if (album && album.artistId) {
      console.log('Navigating to artist:', album.artistId);
      navigate(`/artist/${album.artistId}`);
    }
  };

  const handleLikeAlbum = () => {
    setIsLiked(!isLiked);
  };

  const handlePlayAlbum = () => {
    if (album.tracks.length > 0) {
      // Set the first track if nothing is playing
      if (!miniPlayerSong) {
        const firstTrack = {
          ...album.tracks[0],
          album: album.title,
          artist: album.artist,
          coverImage: album.coverImage
        };
        setMiniPlayerSong(firstTrack);
        setCurrentlyPlayingTrackId(firstTrack.id);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePlayTrack = (track) => {
    const trackToPlay = {
      ...track,
      album: album.title,
      artist: album.artist,
      coverImage: album.coverImage
    };
    setMiniPlayerSong(trackToPlay);
    setCurrentlyPlayingTrackId(track.id);
    setIsPlaying(true);
  };

  // Format play count to shorter format (e.g. 1.2M)
  const formatPlayCount = (count) => {
    const num = parseInt(count.replace(/,/g, ''));
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  // Calculate total duration from tracks
  const calculateTotalDuration = () => {
    let totalMinutes = 0;
    let totalSeconds = 0;
    
    album.tracks.forEach(track => {
      const [minutes, seconds] = track.duration.split(':').map(Number);
      totalMinutes += minutes;
      totalSeconds += seconds;
    });
    
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    
    return `${totalMinutes} min ${totalSeconds} sec`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!album) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar width={sidebarWidth} topOffset={NAVBAR_HEIGHT} />

        <Box
          component="main"
          sx={{
            ml: `${sidebarWidth}px`,
            mt: `${NAVBAR_HEIGHT}px`,
            color: 'white',
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
                {/* Album Header with Cover Image */}
                <Box 
                  sx={{ 
                    p: { xs: 2, md: 4 },
                    background: 'linear-gradient(transparent 0, rgba(0,0,0,.5) 100%), var(--background-noise)',
                    '--background-noise': `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA1IDAiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIwLjM1Ii8+PC9zdmc+")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    gap: { xs: 3, md: 6 },
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'center', sm: 'flex-end' },
                  }}
                >
                  {/* Album Cover */}
                  <Box 
                    sx={{
                      width: { xs: '200px', sm: '232px' },
                      height: { xs: '200px', sm: '232px' },
                      boxShadow: '0 4px 60px rgba(0,0,0,.5)',
                      flexShrink: 0,
                    }}
                  >
                    <img 
                      src={album.coverImage} 
                      alt={album.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </Box>

                  {/* Album Info */}
                  <Box sx={{ flex: 1, pb: { xs: 0, sm: 2 } }}>
                    <Typography 
                      variant="overline" 
                      sx={{ 
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: '0.75rem'
                      }}
                    >
                      {album.albumType}
                    </Typography>

                    <Typography 
                      variant="h2" 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                        letterSpacing: '-0.02em',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        mb: 1
                      }}
                    >
                      {album.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: { xs: 0.5, md: 1 }, mb: 1 }}>
                      <Box
                        component="img"
                        src={artist?.profileImage}
                        alt={album.artist}
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          mr: 1
                        }}
                      />
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 'bold',
                          '&:hover': {
                            textDecoration: 'underline',
                            cursor: 'pointer'
                          }
                        }}
                        onClick={handleArtistClick}
                      >
                        {album.artist}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        • {new Date(album.releaseDate).getFullYear()} • {album.totalTracks} songs, {calculateTotalDuration()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                {/* Controls Row */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 2,
                    p: { xs: 2, md: 4 },
                    pt: 2,
                    backgroundImage: 'linear-gradient(180deg, rgba(18,18,18,0.8) 0%, rgba(18,18,18,1) 100%)',
                  }}
                >
                  {/* Play Button */}
                  <IconButton 
                    onClick={handlePlayAlbum}
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

                  {/* Like Button */}
                  <IconButton 
                    onClick={handleLikeAlbum}
                    sx={{ 
                      color: isLiked ? '#e91e63' : '#b3b3b3',
                      '&:hover': {
                        color: isLiked ? '#e91e63' : 'white'
                      }
                    }}
                  >
                    {isLiked ? <FavoriteIcon sx={{ fontSize: 30 }} /> : <FavoriteBorderIcon sx={{ fontSize: 30 }} />}
                  </IconButton>

                  {/* Download Button */}
                  <IconButton sx={{ color: '#b3b3b3', '&:hover': { color: 'white' } }}>
                    <DownloadIcon />
                  </IconButton>

                  {/* More Options Button */}
                  <IconButton sx={{ color: '#b3b3b3', '&:hover': { color: 'white' } }}>
                    <MoreHorizIcon />
                  </IconButton>
                </Box>

                {/* Tracks Section */}
                <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
                  {/* Tracks Table */}
                  <TableContainer 
                    component={Paper} 
                    sx={{ 
                      bgcolor: 'transparent', 
                      boxShadow: 'none',
                      '& .MuiTableRow-root:hover': {
                        bgcolor: '#282828'
                      },
                      mb: 5
                    }}
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="album tracks table">
                      <TableHead>
                        <TableRow sx={{ borderBottom: '1px solid #282828' }}>
                          <TableCell sx={{ color: '#b3b3b3', width: '40px', borderBottom: 'none' }}>#</TableCell>
                          <TableCell sx={{ color: '#b3b3b3', borderBottom: 'none' }}>TITLE</TableCell>
                          <TableCell sx={{ color: '#b3b3b3', borderBottom: 'none', display: { xs: 'none', md: 'table-cell' } }}>PLAYS</TableCell>
                          <TableCell align="right" sx={{ color: '#b3b3b3', borderBottom: 'none' }}>
                            <AccessTimeIcon fontSize="small" />
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {album.tracks.map((track) => (
                          <TableRow 
                            key={track.id}
                            onClick={() => handlePlayTrack(track)}
                            sx={{ 
                              cursor: 'pointer',
                              '&:last-child td, &:last-child th': { border: 0 },
                              bgcolor: currentlyPlayingTrackId === track.id ? 'rgba(80, 197, 249, 0.1)' : 'transparent',
                            }}
                          >
                            <TableCell 
                              sx={{ 
                                color: currentlyPlayingTrackId === track.id ? '#50C5F9' : '#b3b3b3',
                                fontWeight: currentlyPlayingTrackId === track.id ? 'bold' : 'normal',
                                borderBottom: 'none',
                                width: '40px'
                              }}
                            >
                              {currentlyPlayingTrackId === track.id && isPlaying ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '16px', height: '16px' }}>
                                  <img 
                                    src="data:image/gif;base64,R0lGODlhFAAUALMIAPh2AP92AP+IAP+ZAP+zAJkAAMwAAP/MAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAIACwAAAAAFAAUAAAEUxDJSau9iBDMtebTMEjehgTqJwiZp5QWBRIM6w3b90E3YgEFq+FmVHBkhLBTkgQ5dEaxGqeKxNIS34rgYKDYlCTCINowhVlvyRC51IKy76GYqXWuJAgAIfkEBQoACAAsCAABAA0AEgAABDYQyEkrurXsxRj91FMVfF1yjoSZuVskKCQGQGw3XA9oVMsRBGVCLZVK+M8q1MhUOkGSxwpJ9sJJAgAh+QQFCgAIACwJAAIACwARAAAEMRDICQK9Cuu9xoBweuJIXDJJBXmZ6MdmEo4eqq5RmMwEe9MyUPNE0dUr0QiSkCHPiiQAIfkEBQoACAAsCQADAAoAEgAABC4QSAmLtSsAEXPb8v7bZnFVOJ3WlCnDOUgBrwbLd5O5yT6FLqFFCTSXocdKRQIAIfkEBQoACAAsCQAEAAoAEgAABC8QSAmLtSsAETt8svr/X1ZWeZ0UlcElnQWsKsF0j+YkpFBzb16FISg1n8ZnJQEYAgAh+QQFCgAIACwJAAMADQARAAAEPBDJSau9OOvNe1VhdkVpJoSbF5Jpa8JmBUVz3GE8K3xTT2hbMrLDmYAi1ME2NMkWyVEDyTBVOmKIInRkCQA7" 
                                    alt="Playing"
                                    style={{ width: '16px', height: '16px' }}
                                  />
                                </Box>
                              ) : (
                                track.number
                              )}
                            </TableCell>
                            <TableCell sx={{ borderBottom: 'none' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar 
                                  src={album.coverImage} 
                                  alt={track.title}
                                  variant="square"
                                  sx={{ width: 40, height: 40 }}
                                />
                                <Box>
                                  <Typography 
                                    variant="body1"
                                    sx={{ 
                                      color: currentlyPlayingTrackId === track.id ? '#50C5F9' : 'white',
                                      fontWeight: currentlyPlayingTrackId === track.id ? 'bold' : 'normal',
                                    }}
                                  >
                                    {track.title}
                                    {track.explicit && (
                                      <Box
                                        component="span"
                                        sx={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          ml: 1,
                                          bgcolor: '#b3b3b3',
                                          color: '#121212',
                                          width: 16,
                                          height: 16,
                                          borderRadius: '2px',
                                          fontSize: '10px',
                                          fontWeight: 'bold',
                                        }}
                                      >
                                        E
                                      </Box>
                                    )}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell 
                              sx={{ 
                                color: '#b3b3b3', 
                                borderBottom: 'none',
                                display: { xs: 'none', md: 'table-cell' }
                              }}
                            >
                              {formatPlayCount(track.playCount)}
                            </TableCell>
                            <TableCell 
                              align="right" 
                              sx={{ 
                                color: '#b3b3b3', 
                                borderBottom: 'none',
                                width: '100px'
                              }}
                            >
                              {track.duration}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Copyright & Release Info */}
                  <Box sx={{ my: 4, color: '#b3b3b3' }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {album.releaseDate}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      {album.copyright}
                    </Typography>
                  </Box>

                  {/* Album Credits */}
                  <Box sx={{ mb: 5 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Credits
                    </Typography>
                    <Grid container spacing={2}>
                      {album.credits.map((credit, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                            {credit.role}
                          </Typography>
                          <Typography variant="body1">
                            {credit.name}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Fade>
          )}
        </Box>
      </Box>

      {/* Mini Player */}
      <MiniPlayer 
        song={miniPlayerSong} 
        isPlaying={isPlaying}
        onPlayPause={setIsPlaying}
      />

      {/* Footer */}
      <Footer />
    </Box>
  );
}