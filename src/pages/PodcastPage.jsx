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
        <Sidebar width={sidebarWidth} topOffset={NAVBAR_HEIGHT} />

        <Box
          component="main"
          sx={{
            ml: `${sidebarWidth}px`,
            mt: `${NAVBAR_HEIGHT}px`,
            color: theme.palette.text.primary,
            flexGrow: 1,
            paddingBottom: `${MINIPLAYER_HEIGHT + 16}px`,
          }}
        >
          <Fade in timeout={400}>
            <Box>
              {/* Podcast Header */}
              <Box 
                sx={{ 
                  p: { xs: 2, md: 4 },
                  background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.background.default})`,
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
                    alignItems: 'flex-start', // align to left
                    width: { xs: '200px', sm: '232px' },
                    minWidth: { xs: '200px', sm: '232px' },
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
                  {/* Follow and More Buttons under image, side by side */}
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mt: 2, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: theme.palette.text.secondary,
                        color: theme.palette.text.primary,
                        borderRadius: theme.shape.borderRadius,
                        textTransform: 'none',
                        width: '55%', // less width
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
                <Box sx={{ flex: 1, pb: { xs: 0, sm: 2 } }}>
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
                      fontSize: { xs: '1.2rem', sm: '1.7rem', md: '2.2rem' }, // smaller font size
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
                </Box>
              </Box>
            
              <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
                <Grid container spacing={4} alignItems="flex-start">
                  {/* Episodes + About Section Side by Side */}
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
                          >
                            {/* Left: Image */}
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 140, height: 180, flexShrink: 0, ml: 2 }}>
                              <Avatar
                                src={podcast.coverImage.startsWith('/') ? podcast.coverImage : `/${podcast.coverImage}`}
                                alt={episode.title}
                                variant="square"
                                sx={{ width: 150, height: 150, borderRadius: 0 }}
                              />
                            </Box>
                            {/* Center: Info */}
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 3, py: 2 }}>
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mb: 0.5 }}
                              >
                                {episode.title}
                              </Typography>
                              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                                {podcast.title}
                              </Typography>
                              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                {episode.description || 'No description available.'}
                              </Typography>
                              {/* White section for date/duration and action buttons */}
                              <Box sx={{ px: 0, py: 0, bgcolor: 'transparent', boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {episode.duration}
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
                            {/* Right: Play/Pause Button styled like MiniPlayer */}
                            <Box sx={{ display: 'flex', alignItems: 'center', pr: 3, pl: 2, bgcolor: 'transparent', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                              <PlayButton
                                onClick={e => {
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
                      {/* About Section next to first episode */}
                      <Box sx={{ flex: 1, minWidth: 280, maxWidth: 480, borderRadius: 0, p: 0, boxShadow: 'none', ml: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.text.primary, fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}>
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

                {/* Copyright & Release Info */}
                <Box sx={{ my: 4, color: theme.palette.text.secondary }}>
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

      <MiniPlayer 
        song={currentSong} 
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
      />

      <Footer />
    </Box>
  );
}