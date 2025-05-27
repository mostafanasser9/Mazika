// 


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
  Avatar,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';

import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import MiniPlayer, { MINIPLAYER_HEIGHT, PlayButton } from '../components/layout/MiniPlayer';
import { getPodcastById, getHostById } from '../data/podcasts.js';
import { usePlayer } from '../context/PlayerContext';

const sidebarWidth = 240;
const NAVBAR_HEIGHT = 64;

export default function PodcastPage() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState(null);
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const { currentSong, isPlaying, handlePlaySong, handlePlayPause } = usePlayer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const podcastData = getPodcastById(id);
        if (!podcastData) {
          console.error('Podcast not found:', id);
          navigate('/');
          return;
        }

        setPodcast(podcastData);
        const hostData = getHostById(podcastData.hostId);
        if (!hostData) {
          console.error('Host not found:', podcastData.hostId);
        }
        setHost(hostData);
      } catch (error) {
        console.error('Error fetching podcast data:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleHostClick = () => {
    if (podcast && podcast.hostId) {
      navigate(`/host/${podcast.hostId}`);
    }
  };

  const handleLikePodcast = () => {
    setIsLiked(!isLiked);
  };

  const handlePlayPodcast = () => {
    if (podcast?.episodes?.length > 0) {
      if (!currentSong) {
        const firstEpisode = {
          ...podcast.episodes[0],
          podcast: podcast.title,
          host: podcast.host,
          audio: podcast.episodes[0].audioUrl,
          img: podcast.coverImage.startsWith('/') ? podcast.coverImage : `/${podcast.coverImage}`
        };
        handlePlaySong(firstEpisode);
      }
      handlePlayPause(!isPlaying);
    }
  };

  const handlePlayEpisode = (episode) => {
    const episodeToPlay = {
      ...episode,
      podcast: podcast.title,
      host: podcast.host,
      audio: episode.audioUrl,
      img: podcast.coverImage.startsWith('/') ? podcast.coverImage : `/${podcast.coverImage}`
    };
    handlePlaySong(episodeToPlay);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!podcast) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar - hidden on mobile */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Sidebar width={sidebarWidth} topOffset={NAVBAR_HEIGHT} />
        </Box>

        <Box
          component="main"
          sx={{
            ml: { xs: 0, md: `${sidebarWidth}px` },
            mt: `${NAVBAR_HEIGHT}px`,
            color: theme.palette.text.primary,
            flexGrow: 1,
            width: '100%',
            paddingBottom: `${MINIPLAYER_HEIGHT + 16}px`,
          }}
        >
          <Fade in timeout={400}>
            <Box>
              {/* Podcast Header */}
              <Box 
                sx={{ 
                  p: { xs: 2, md: 4 },
                  background: { 
                    xs: 'none', 
                    md: 'linear-gradient(180deg, rgba(3,26,68,1) 0%, rgba(18,18,18,1) 100%)' 
                  },
                  display: 'flex',
                  gap: { xs: 3, md: 4 },
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'center', sm: 'flex-start' },
                }}
              >
                {/* Podcast Cover + Actions */}
                <Box 
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    width: { xs: '160px', sm: '200px', md: '232px' },
                    minWidth: { xs: '160px', sm: '200px', md: '232px' },
                    height: '100%',
                    flexShrink: 0,
                  }}
                >
                  <img 
                    src={podcast.coverImage.startsWith('/') ? podcast.coverImage : `/${podcast.coverImage}`} 
                    alt={podcast.title}
                    style={{ 
                      width: '100%', 
                      height: '232px', 
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: theme.shape.borderRadius
                    }}
                  />
                  {/* Follow and More Buttons - hidden on mobile */}
                  <Box sx={{ 
                    display: { xs: 'none', md: 'flex' }, 
                    flexDirection: 'row', 
                    gap: 1, 
                    mt: 2, 
                    width: '100%', 
                    justifyContent: 'flex-start', 
                    alignItems: 'center' 
                  }}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: theme.palette.text.secondary,
                        color: theme.palette.text.primary,
                        borderRadius: theme.shape.borderRadius,
                        textTransform: 'none',
                        width: '55%',
                        minWidth: 60,
                        maxWidth: 120,
                        '&:hover': {
                          borderColor: theme.palette.text.primary,
                          backgroundColor: theme.palette.action.hover
                        }
                      }}
                    >
                      Follow
                    </Button>
                    <IconButton sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.text.primary } }}>
                      <MoreHorizIcon />
                    </IconButton>
                  </Box>
                </Box>

                {/* Podcast Info */}
                <Box sx={{ 
                  flex: 1, 
                  pb: { xs: 0, sm: 2 },
                  textAlign: { xs: 'center', md: 'left' }
                }}>
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                      color: theme.palette.text.secondary
                    }}
                  >
                    Podcast
                  </Typography>

                  <Typography 
                    variant="h2" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.2rem' },
                      letterSpacing: '-0.02em',
                      mb: 1,
                      color: theme.palette.text.primary
                    }}
                  >
                    {podcast.title}
                  </Typography>

                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      '&:hover': {
                        textDecoration: 'underline',
                        cursor: 'pointer'
                      },
                      color: theme.palette.text.primary
                    }}
                    onClick={handleHostClick}
                  >
                    {podcast.host}
                  </Typography>

                  {/* Mobile Actions */}
                  <Box sx={{ 
                    display: { xs: 'flex', md: 'none' }, 
                    gap: 2,
                    mt: 2,
                    justifyContent: 'center'
                  }}>
                    <IconButton
                      onClick={handlePlayPodcast}
                      sx={{
                        p: { xs: 2, md: 1.5 },
                        bgcolor: '#50C5F9',
                        color: 'black',
                        '&:hover': { 
                          bgcolor: '#88DBFF',
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
                    >
                      {isPlaying && currentSong?.podcast === podcast.title ? 
                        <PauseIcon sx={{ fontSize: { xs: 44, md: 38 }, color: 'black' }} /> :
                        <PlayArrowIcon sx={{ fontSize: { xs: 44, md: 38 }, color: 'black' }} />
                      }
                    </IconButton>
                    <IconButton onClick={handleLikePodcast}>
                      {isLiked ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton>
                      <MoreHorizIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>

              {/* Content Section */}
              <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
                {/* Desktop Layout */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Grid container spacing={4} alignItems="flex-start">
                    <Grid item xs={12} md={8}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.text.primary }}>
                        ALL EPISODES
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                        <Box sx={{ flex: 2, minWidth: 0 }}>
                          {podcast.episodes.map((episode, idx) => (
                            <Box
                              key={episode.id}
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                mb: 3,
                                minHeight: 180,
                                borderRadius: 0,
                                overflow: 'hidden',
                                bgcolor: 'transparent',
                                boxShadow: 'none',
                                position: 'relative',
                                transition: 'background 0.2s',
                                cursor: 'pointer',
                                '&:hover': {
                                  bgcolor: theme.palette.action.hover,
                                },
                              }}
                              onClick={() => handlePlayEpisode(episode)}
                            >
                              {/* Episode Layout - Desktop */}
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 140, height: 180, flexShrink: 0, ml: 2 }}>
                                <Avatar
                                  src={podcast.coverImage.startsWith('/') ? podcast.coverImage : `/${podcast.coverImage}`}
                                  alt={episode.title}
                                  variant="square"
                                  sx={{ width: 150, height: 150, borderRadius: 0 }}
                                />
                              </Box>
                              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 3, py: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mb: 0.5 }}>
                                  {episode.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                                  {podcast.title}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: theme.palette.text.secondary, 
                                  mb: 1, 
                                  overflow: 'hidden', 
                                  textOverflow: 'ellipsis', 
                                  display: '-webkit-box', 
                                  WebkitLineClamp: 2, 
                                  WebkitBoxOrient: 'vertical' 
                                }}>
                                  {episode.description || 'No description available.'}
                                </Typography>
                                <Box sx={{ px: 0, py: 0, bgcolor: 'transparent', boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                                    {episode.date} • {episode.duration}
                                  </Typography>
                                  <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
                                      <AddIcon />
                                    </IconButton>
                                    <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
                                      <DownloadIcon />
                                    </IconButton>
                                    <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
                                      <ShareIcon />
                                    </IconButton>
                                    <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
                                      <MoreHorizIcon />
                                    </IconButton>
                                  </Box>
                                </Box>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', pr: 3, pl: 2 }}>
                                <PlayButton
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlayEpisode(episode);
                                  }}
                                  isPlaying={currentSong && currentSong.id === episode.id && isPlaying}
                                  size={56}
                                  ariaLabel={currentSong && currentSong.id === episode.id && isPlaying ? 'Pause' : 'Play'}
                                />
                              </Box>
                            </Box>
                          ))}
                        </Box>
                        {/* About Section - Desktop */}
                        <Box sx={{ flex: 1, minWidth: 280, maxWidth: 480, borderRadius: 0, p: 0, boxShadow: 'none', ml: 3 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.text.primary }}>
                            About
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            {podcast.description || 'No description available.'}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.primary.light,
                              mt: 1,
                              cursor: 'pointer',
                              '&:hover': { textDecoration: 'underline' }
                            }}
                          >
                            Show More
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                {/* Mobile Layout */}
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                    Episodes
                  </Typography>
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
                    <Table sx={{ minWidth: { xs: 300, sm: 650 } }}>
                      <TableHead>
                        <TableRow sx={{ borderBottom: '1px solid #282828' }}>
                          <TableCell sx={{ width: '50px', color: '#b3b3b3', borderBottom: 'none' }}>#</TableCell>
                          <TableCell sx={{ color: '#b3b3b3', borderBottom: 'none' }}>Title</TableCell>
                          <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, color: '#b3b3b3', borderBottom: 'none' }}>Date</TableCell>
                          <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' }, color: '#b3b3b3', borderBottom: 'none' }}>Duration</TableCell>
                          <TableCell align="right" sx={{ width: '70px', borderBottom: 'none' }}></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {podcast.episodes.map((episode, index) => (
                          <TableRow
                            key={episode.id}
                            hover
                            onClick={() => handlePlayEpisode(episode)}
                            sx={{ '&:hover': { cursor: 'pointer' } }}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography 
                                  sx={{ 
                                    color: currentSong?.id === episode.id ? '#50C5F9' : 'white',
                                    fontWeight: currentSong?.id === episode.id ? 'bold' : 'normal',
                                  }}
                                >
                                  {episode.title}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  display: { xs: 'block', md: 'none' },
                                  fontSize: '0.875rem',
                                  color: '#b3b3b3'
                                }}>
                                  {episode.date} • {episode.duration}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{episode.date}</TableCell>
                            <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>{episode.duration}</TableCell>
                            <TableCell align="right">
                              <IconButton size="small">
                                <MoreHorizIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>

                {/* Copyright & Release Info */}
                <Box sx={{ 
                  my: 4, 
                  color: theme.palette.text.secondary,
                  display: { xs: 'none', md: 'block' }
                }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {podcast.releaseDate}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    {podcast.copyright}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Box>
      </Box>

      {/* MiniPlayer */}
      <MiniPlayer 
        song={currentSong} 
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
      />

      {/* Footer - hidden on mobile */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, ml: `${sidebarWidth}px` }}>
        <Footer />
      </Box>
    </Box>
  );
}