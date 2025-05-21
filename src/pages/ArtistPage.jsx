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
  Tabs,
  Tab,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedIcon from '@mui/icons-material/Verified';

import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import MiniPlayer, { MINIPLAYER_HEIGHT } from '../components/layout/Miniplayer';
import { getArtistById } from '../data/artists';

const sidebarWidth = 240;
const NAVBAR_HEIGHT = 64;

export default function ArtistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchArtist = () => {
      setLoading(true);
      console.log('ArtistPage - Fetching artist with ID:', id);
      const artistData = getArtistById(id);
      console.log('ArtistPage - Artist data:', artistData);
      
      if (artistData) {
        setArtist(artistData);
      } else {
        console.log('ArtistPage - Artist not found, redirecting to home');
        navigate('/');
      }
      setLoading(false);
    };

    fetchArtist();
  }, [id, navigate]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  const handlePlayArtist = () => {
    setIsPlaying(!isPlaying);
    // Add your play logic here
  };

  const handleLikeArtist = () => {
    setIsLiked(!isLiked);
    // Add your like logic here
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

  const renderDiscography = () => (
    <Box sx={{ mb: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Discography
        </Typography>
        <Button 
          sx={{ 
            color: 'text.secondary',
            textTransform: 'none',
            '&:hover': {
              color: 'text.primary',
              bgcolor: 'transparent'
            }
          }}
        >
          Show all
        </Button>
      </Box>

      <Grid container spacing={2}>
        {artist.albums.map((album) => (
          <Grid item xs={6} sm={4} md={3} lg={2.4} key={album.id}>
            <Card 
              sx={{ 
                bgcolor: 'background.card',
                borderRadius: 1,
                transition: theme => theme.transitions.create('all'),
                '&:hover': {
                  bgcolor: 'background.cardHover',
                  transform: 'translateY(-4px)'
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              onClick={() => handleAlbumClick(album.id)}
            >
              <CardMedia
                component="img"
                image={album.coverImage}
                alt={album.title}
                sx={{ 
                  aspectRatio: '1/1',
                  width: '100%'
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="body1" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  {album.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {album.releaseYear} • {album.songCount} songs
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!artist) {
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
            color: 'text.primary',
            flexGrow: 1,
            paddingBottom: `${MINIPLAYER_HEIGHT + 16}px`,
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress color="primary" size={60} thickness={4.5} />
            </Box>
          ) : (
            <Fade in timeout={400}>
              <Box>
                {/* Artist Header with Cover Image */}
                <Box 
                  sx={{ 
                    position: 'relative',
                    height: { xs: 240, md: 340 },
                    backgroundImage: theme => `linear-gradient(${theme.palette.background.gradient.overlay}, ${theme.palette.background.gradient.overlayDark}), url(${artist.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    p: { xs: 2, md: 4 },
                  }}
                >
                  <Box>
                    {/* Verified Badge */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {artist.verified && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <VerifiedIcon sx={{ color: 'primary.light', fontSize: 20 }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            Verified Artist
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Artist Name */}
                    <Typography 
                      variant="h1" 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '3rem', sm: '5rem', md: '6rem' },
                        letterSpacing: '-0.02em',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        mb: 2
                      }}
                    >
                      {artist.name}
                    </Typography>

                    {/* Monthly Listeners */}
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      {artist.monthlyListeners} monthly listeners
                    </Typography>
                  </Box>
                </Box>
                
                {/* Controls Row */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 2,
                    p: { xs: 2, md: 4 },
                    backgroundImage: theme => theme.palette.background.gradient.content,
                  }}
                >
                  {/* Play Button */}
                  <IconButton 
                    onClick={handlePlayArtist}
                    sx={{
                      bgcolor: 'primary.light',
                      color: 'common.white',
                      p: 1.5,
                      '&:hover': {
                        bgcolor: 'primary.dark',
                        transform: 'scale(1.04)'
                      },
                      transition: theme => theme.transitions.create(['background-color', 'transform'], {
                        duration: theme.transitions.duration.shorter,
                        easing: theme.transitions.easing.easeInOut,
                      }),
                    }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <PauseIcon sx={{ fontSize: 38 }} /> : <PlayArrowIcon sx={{ fontSize: 38 }} />}
                  </IconButton>

                  {/* Like Button */}
                  <IconButton onClick={handleLikeArtist}>
                    {isLiked ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                  </IconButton>

                  {/* More Options Button */}
                  <IconButton sx={{ color: 'text.secondary' }}>
                    <MoreHorizIcon />
                  </IconButton>
                </Box>

                {/* Content Tabs */}
                <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
                  <Tabs 
                    value={activeTab} 
                    onChange={handleTabChange}
                    sx={{ mb: 3 }}
                  >
                    <Tab label="Overview" />
                    <Tab label="Discography" />
                    <Tab label="About" />
                  </Tabs>

                  {/* Overview Tab Content */}
                  {activeTab === 0 && (
                    <Box>
                      {/* Popular Section */}
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                        Popular
                      </Typography>

                      {/* Popular Songs Table */}
                      <TableContainer 
                        component={Paper} 
                        sx={{ 
                          bgcolor: 'transparent', 
                          boxShadow: 'none',
                          '& .MuiTableRow-root:hover': {
                            bgcolor: 'action.hover'
                          },
                          mb: 5
                        }}
                      >
                        <Table sx={{ minWidth: 650 }} aria-label="popular songs table">
                          <TableHead>
                            <TableRow sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                              <TableCell sx={{ width: '40px', borderBottom: 'none' }}>#</TableCell>
                              <TableCell sx={{ borderBottom: 'none' }}>TITLE</TableCell>
                              <TableCell sx={{ borderBottom: 'none' }}>PLAYS</TableCell>
                              <TableCell align="right" sx={{ borderBottom: 'none' }}>
                                <AccessTimeIcon fontSize="small" />
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {artist.popularSongs.map((song, index) => (
                              <TableRow 
                                key={song.id}
                                onClick={() => handleAlbumClick(song.albumId)}
                                sx={{ 
                                  cursor: 'pointer',
                                  '&:last-child td, &:last-child th': { border: 0 },
                                }}
                              >
                                <TableCell 
                                  sx={{ 
                                    color: 'text.secondary',
                                    fontWeight: 'normal',
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
                                          color: 'text.primary',
                                          fontWeight: 'normal',
                                        }}
                                      >
                                        {song.title}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell sx={{ color: 'text.secondary', borderBottom: 'none' }}>
                                  {formatPlayCount(song.playCount)}
                                </TableCell>
                                <TableCell align="right" sx={{ color: 'text.secondary', borderBottom: 'none' }}>
                                  {song.duration}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      {/* Discography Section */}
                      {renderDiscography()}

                      {/* Artist Bio Section */}
                      <Box sx={{ mb: 5 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                          About
                        </Typography>
                        
                        <Grid container spacing={4}>
                          <Grid item xs={12}>
                            <Box 
                              sx={{ 
                                backgroundImage: `url(${artist.profileImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: 2,
                                height: { xs: 200, sm: 300, md: 400 },
                                mb: 3
                              }}
                            />
                            <Typography variant="body1" sx={{ mb: 2 }}>
                              {artist.biography}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                              {artist.monthlyListeners} monthly listeners
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  )}

                  {/* Discography Tab Content */}
                  {activeTab === 1 && (
                    <Box>
                      {renderDiscography()}
                    </Box>
                  )}

                  {/* About Tab Content */}
                  {activeTab === 2 && (
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                        About
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {artist.biography}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {artist.monthlyListeners} monthly listeners
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Fade>
          )}
        </Box>
      </Box>

      {/* Mini Player */}
      <MiniPlayer />

      {/* Footer */}
      <Footer />
    </Box>
  );
}
    