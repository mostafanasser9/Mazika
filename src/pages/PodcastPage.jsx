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

import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import MiniPlayer, { MINIPLAYER_HEIGHT } from '../components/layout/Miniplayer';
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
                {/* Podcast Cover */}
                <Box 
                  sx={{
                    width: { xs: '200px', sm: '232px' },
                    height: { xs: '200px', sm: '232px' },
                    boxShadow: theme.shadows[4],
                    flexShrink: 0,
                  }}
                >
                  <img 
                    src={podcast.coverImage.startsWith('/') ? podcast.coverImage : `/${podcast.coverImage}`} 
                    alt={podcast.title}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
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
                      fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
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

                  {/* Follow and More Buttons */}
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: theme.palette.text.secondary,
                        color: theme.palette.text.primary,
                        borderRadius: theme.shape.borderRadius,
                        textTransform: 'none',
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
              </Box>
            
              <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
                <Grid container spacing={4}>
                  {/* Episodes Section */}
                  <Grid item xs={500} md={80}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.text.primary }}>
                      ALL EPISODES
                    </Typography>
                    {podcast.episodes.map((episode) => (

                      <Box
                        key={episode.id}
                        sx={{
    
        
                           
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                          p: 1,
                
                          bgcolor: currentSong && currentSong.id === episode.id ? 'rgba(80, 197, 249, 0.1)' : 'transparent',
                          '&:hover': {
                            bgcolor: theme.palette.background.cardHover,
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() => handlePlayEpisode(episode)}
                      >
                        <Avatar
                          src={podcast.coverImage.startsWith('/') ? podcast.coverImage : `/${podcast.coverImage}`}
                          alt={episode.title}
                          variant="square"
                          sx={{ width: 56, height: 56, mr: 2 }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              color: currentSong && currentSong.id === episode.id ? theme.palette.primary.light : theme.palette.text.primary,
                              fontWeight: currentSong && currentSong.id === episode.id ? 'bold' : 'normal',
                            }}
                          >
                            {episode.title}
                            {episode.explicit && (
                              <Box
                                component="span"
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  ml: 1,
                                  bgcolor: theme.palette.secondary.main,
                                  color: theme.palette.common.black,
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
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            {podcast.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {episode.duration}
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}>
                            Hosted on Acast. See acast.com/privacy for more information.
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.text.primary } }}>
                            <AddIcon />
                          </IconButton>
                          <IconButton sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.text.primary } }}>
                            <ShareIcon />
                          </IconButton>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayEpisode(episode);
                            }}
                            sx={{
                              color: theme.palette.text.secondary,
                              '&:hover': { color: theme.palette.primary.hover }
                            }}
                          >
                            {currentSong && currentSong.id === episode.id && isPlaying ? (
                              <PauseIcon />
                            ) : (
                              <PlayArrowIcon />
                            )}
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                  </Grid>

                  {/* About Section */}
                  <Grid item xs={12} md={4}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.text.primary }}>
                      About
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      On the first of September 2023 the world was introduced to "Ma3 Kamel A7terami" a comedy podcast that reflects what’s on everyone’s mind! Through colorful language...
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