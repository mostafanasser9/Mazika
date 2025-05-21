import React, { useState } from 'react';
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
import VerifiedIcon from '@mui/icons-material/Verified';

import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import MiniPlayer, { MINIPLAYER_HEIGHT } from '../components/layout/Miniplayer';

const sidebarWidth = 240;
const NAVBAR_HEIGHT = 64;

// Example artist data - replace with actual data source
const exampleArtist = {
  id: 1,
  name: "The Weeknd",
  verified: true,
  coverImage: "https://picsum.photos/1200/400?random=23",
  profileImage: "https://picsum.photos/300/300?random=42",
  monthlyListeners: "82,503,616",
  biography: "Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer, songwriter, and record producer. He is known for his sonic versatility and dark lyricism, his music exploring escapism, romance, and melancholia, and is inspired by personal experiences.",
  popularSongs: [
    { 
      id: 1, 
      title: "Blinding Lights", 
      album: "After Hours", 
      playCount: "3,242,125,689",
      duration: "3:20",
      img: "https://picsum.photos/200/200?random=1",
    },
    { 
      id: 2, 
      title: "Starboy", 
      album: "Starboy", 
      playCount: "2,821,348,294",
      duration: "3:50",
      img: "https://picsum.photos/200/200?random=2",
    },
    { 
      id: 3, 
      title: "Save Your Tears", 
      album: "After Hours", 
      playCount: "1,784,526,789",
      duration: "3:35",
      img: "https://picsum.photos/200/200?random=3",
    },
    { 
      id: 4, 
      title: "The Hills", 
      album: "Beauty Behind the Madness", 
      playCount: "1,495,876,324",
      duration: "4:02",
      img: "https://picsum.photos/200/200?random=4",
    },
    { 
      id: 5, 
      title: "Die For You", 
      album: "Starboy", 
      playCount: "1,302,456,789",
      duration: "4:20",
      img: "https://picsum.photos/200/200?random=5",
    },
    { 
      id: 6, 
      title: "Earned It", 
      album: "Beauty Behind the Madness", 
      playCount: "1,092,456,123",
      duration: "4:37",
      img: "https://picsum.photos/200/200?random=6",
    },
    { 
      id: 7, 
      title: "Call Out My Name", 
      album: "My Dear Melancholy", 
      playCount: "986,543,210",
      duration: "3:48",
      img: "https://picsum.photos/200/200?random=7",
    },
    { 
      id: 8, 
      title: "Can't Feel My Face", 
      album: "Beauty Behind the Madness", 
      playCount: "945,678,123",
      duration: "3:33",
      img: "https://picsum.photos/200/200?random=8",
    },
    { 
      id: 9, 
      title: "I Feel It Coming", 
      album: "Starboy", 
      playCount: "876,345,678",
      duration: "4:29",
      img: "https://picsum.photos/200/200?random=9",
    },
    { 
      id: 10, 
      title: "After Hours", 
      album: "After Hours", 
      playCount: "742,156,789",
      duration: "6:01",
      img: "https://picsum.photos/200/200?random=10",
    },
  ],
  albums: [
    {
      id: 1,
      title: "After Hours",
      year: "2020",
      coverImage: "https://picsum.photos/300/300?random=11",
      songCount: 14
    },
    {
      id: 2,
      title: "Starboy",
      year: "2016",
      coverImage: "https://picsum.photos/300/300?random=12",
      songCount: 18
    },
    {
      id: 3,
      title: "Beauty Behind the Madness",
      year: "2015",
      coverImage: "https://picsum.photos/300/300?random=13",
      songCount: 14
    },
    {
      id: 4,
      title: "My Dear Melancholy,",
      year: "2018",
      coverImage: "https://picsum.photos/300/300?random=14",
      songCount: 6
    },
    {
      id: 5,
      title: "Dawn FM",
      year: "2022",
      coverImage: "https://picsum.photos/300/300?random=15",
      songCount: 16
    },
  ],
  relatedArtists: [
    {
      id: 1,
      name: "Drake",
      image: "https://picsum.photos/150/150?random=16"
    },
    {
      id: 2,
      name: "Post Malone",
      image: "https://picsum.photos/150/150?random=17"
    },
    {
      id: 3,
      name: "Doja Cat",
      image: "https://picsum.photos/150/150?random=18"
    },
    {
      id: 4,
      name: "Bruno Mars",
      image: "https://picsum.photos/150/150?random=19"
    },
  ]
};

export default function ArtistPage({ artist = exampleArtist }) {
  const [miniPlayerSong, setMiniPlayerSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePlaySong = (song) => {
    setMiniPlayerSong(song);
    setIsPlaying(true);
    console.log(`Playing song:`, song);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && artist.popularSongs.length > 0 && !miniPlayerSong) {
      setMiniPlayerSong(artist.popularSongs[0]);
    }
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
                {/* Artist Header with Cover Image */}
                <Box 
                  sx={{ 
                    position: 'relative',
                    height: { xs: 240, md: 340 },
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${artist.coverImage})`,
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
                          <VerifiedIcon sx={{ color: '#50C5F9', fontSize: 20 }} />
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
                    backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(18,18,18,1) 100%)',
                  }}
                >
                  {/* Play Button */}
                  <IconButton 
                    onClick={handlePlayPause}
                    sx={{
                      bgcolor: '#50C5F9',
                      color: 'white',
                      p: 1.5,
                      '&:hover': {
                        bgcolor: '#31a44f',
                        transform: 'scale(1.04)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <PauseIcon sx={{ fontSize: 38 }} /> : <PlayArrowIcon sx={{ fontSize: 38 }} />}
                  </IconButton>

                  {/* More Options Button */}
                  <IconButton sx={{ color: '#b3b3b3' }}>
                    <MoreHorizIcon />
                  </IconButton>
                </Box>

                {/* Content Tabs */}
                <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
                  <Tabs 
                    value={activeTab} 
                    onChange={handleTabChange}
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: '#50C5F9',
                      }
                    }}
                    sx={{
                      mb: 3,
                      '& .MuiTab-root': {
                        color: '#b3b3b3',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        minWidth: 100,
                        fontSize: '16px',
                        '&.Mui-selected': {
                          color: 'white',
                        }
                      }
                    }}
                  >
                    <Tab label="Overview" />
                    <Tab label="Discography" />
                    <Tab label="Related Artists" />
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
                            bgcolor: '#282828'
                          },
                          mb: 5
                        }}
                      >
                        <Table sx={{ minWidth: 650 }} aria-label="popular songs table">
                          <TableHead>
                            <TableRow sx={{ borderBottom: '1px solid #282828' }}>
                              <TableCell sx={{ color: '#b3b3b3', width: '40px', borderBottom: 'none' }}>#</TableCell>
                              <TableCell sx={{ color: '#b3b3b3', borderBottom: 'none' }}>TITLE</TableCell>
                              <TableCell sx={{ color: '#b3b3b3', borderBottom: 'none' }}>PLAYS</TableCell>
                              <TableCell align="right" sx={{ color: '#b3b3b3', borderBottom: 'none' }}>
                                <AccessTimeIcon fontSize="small" />
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {artist.popularSongs.map((song, index) => (
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
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell sx={{ color: '#b3b3b3', borderBottom: 'none' }}>
                                  {formatPlayCount(song.playCount)}
                                </TableCell>
                                <TableCell align="right" sx={{ color: '#b3b3b3', borderBottom: 'none' }}>
                                  {song.duration}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      {/* Discography Section */}
                      <Box sx={{ mb: 5 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Discography
                          </Typography>
                          <Button 
                            sx={{ 
                              color: '#b3b3b3', 
                              textTransform: 'none',
                              '&:hover': {
                                color: 'white',
                                bgcolor: 'transparent'
                              }
                            }}
                          >
                            Show all
                          </Button>
                        </Box>

                        <Grid container spacing={2}>
                          {artist.albums.slice(0, 5).map((album) => (
                            <Grid item xs={6} sm={4} md={3} lg={2.4} key={album.id}>
                              <Card 
                                sx={{ 
                                  bgcolor: '#181818', 
                                  borderRadius: 1,
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    bgcolor: '#282828',
                                    transform: 'translateY(-4px)'
                                  },
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column'
                                }}
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
                                  <Typography gutterBottom variant="body1" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
                                    {album.title}
                                  </Typography>
                                  <Typography variant="body2" color="#b3b3b3">
                                    {album.year} • {album.songCount} songs
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>

                      {/* Artist Bio Section */}
                      <Box sx={{ mb: 5 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                          About
                        </Typography>
                        
                        <Grid container spacing={4}>
                          <Grid item xs={12} md={8}>
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
                          
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                              Fans also like
                            </Typography>
                            <Grid container spacing={2}>
                              {artist.relatedArtists.map((relatedArtist) => (
                                <Grid item xs={6} key={relatedArtist.id}>
                                  <Card 
                                    sx={{ 
                                      bgcolor: '#181818', 
                                      borderRadius: 1,
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                        bgcolor: '#282828',
                                        transform: 'translateY(-4px)'
                                      }
                                    }}
                                  >
                                    <CardMedia
                                      component="img"
                                      image={relatedArtist.image}
                                      alt={relatedArtist.name}
                                      sx={{ 
                                        borderRadius: '50%',
                                        aspectRatio: '1/1',
                                        p: 2
                                      }}
                                    />
                                    <CardContent sx={{ textAlign: 'center', pt: 0 }}>
                                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                                        {relatedArtist.name}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              ))}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  )}

                  {/* Discography Tab Content */}
                  {activeTab === 1 && (
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                        Albums
                      </Typography>
                      
                      <Grid container spacing={3}>
                        {artist.albums.map((album) => (
                          <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
                            <Card 
                              sx={{ 
                                bgcolor: '#181818', 
                                borderRadius: 1,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  bgcolor: '#282828',
                                  transform: 'translateY(-4px)'
                                }
                              }}
                            >
                              <CardMedia
                                component="img"
                                image={album.coverImage}
                                alt={album.title}
                                sx={{ aspectRatio: '1/1' }}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="body1" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
                                  {album.title}
                                </Typography>
                                <Typography variant="body2" color="#b3b3b3">
                                  {album.year} • Album • {album.songCount} songs
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {/* Related Artists Tab Content */}
                  {activeTab === 2 && (
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                        Fans also like
                      </Typography>
                      
                      <Grid container spacing={3}>
                        {/* Showing extended list of related artists */}
                        {[...artist.relatedArtists, ...artist.relatedArtists].map((relatedArtist, index) => (
                          <Grid item xs={6} sm={4} md={3} lg={2} key={`${relatedArtist.id}-${index}`}>
                            <Card 
                              sx={{ 
                                bgcolor: '#181818', 
                                borderRadius: 1,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  bgcolor: '#282828',
                                  transform: 'translateY(-4px)'
                                }
                              }}
                            >
                              <CardMedia
                                component="img"
                                image={relatedArtist.image}
                                alt={relatedArtist.name}
                                sx={{ 
                                  borderRadius: '50%',
                                  aspectRatio: '1/1',
                                  p: 2
                                }}
                              />
                              <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                                  {relatedArtist.name}
                                </Typography>
                                <Typography variant="body2" color="#b3b3b3">
                                  Artist
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {/* About Tab Content */}
                  {activeTab === 3 && (
                    <Box>
                      <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                          <Box 
                            sx={{ 
                              backgroundImage: `url(${artist.profileImage})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              borderRadius: 2,
                              height: { xs: 300, md: 500 },
                              mb: 4
                            }}
                          />
                          
                          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Biography
                          </Typography>
                          
                          <Typography variant="body1" paragraph>
                            {artist.biography}
                          </Typography>
                          
                          <Typography variant="body1" paragraph>
                            Born in Toronto, Ontario, Tesfaye began his recording career in 2010, anonymously uploading several songs to YouTube. A year later, he co-founded the XO record label and released the critically acclaimed mixtapes House of Balloons, Thursday, and Echoes of Silence.
                          </Typography>
                          
                          <Typography variant="body1" paragraph>
                            He has won numerous accolades, including four Grammy Awards, a Latin Grammy Award, 20 Billboard Music Awards, 17 Juno Awards, six American Music Awards, two MTV Video Music Awards, and nominations for an Academy Award and a Primetime Emmy Award.
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                          <Box sx={{ bgcolor: '#181818', borderRadius: 2, p: 3, mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                              {artist.monthlyListeners} monthly listeners
                            </Typography>
                            <Divider sx={{ bgcolor: '#282828', my: 2 }} />
                            <Typography variant="body2" color="#b3b3b3" paragraph>
                              Where people listen to {artist.name}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">1. Los Angeles, US</Typography>
                                <Typography variant="body2" color="#b3b3b3">1,242,567</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">2. London, UK</Typography>
                                <Typography variant="body2" color="#b3b3b3">987,234</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">3. Toronto, CA</Typography>
                                <Typography variant="body2" color="#b3b3b3">825,763</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">4. Mexico City, MX</Typography>
                                <Typography variant="body2" color="#b3b3b3">724,182</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">5. Sydney, AU</Typography>
                                <Typography variant="body2" color="#b3b3b3">687,429</Typography>
                              </Box>
                            </Box>
                          </Box>
                          
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Fans also like
                          </Typography>
                          <Grid container spacing={2}>
                            {artist.relatedArtists.map((relatedArtist) => (
                              <Grid item xs={6} key={relatedArtist.id}>
                                <Card 
                                  sx={{ 
                                    bgcolor: '#181818', 
                                    borderRadius: 1,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      bgcolor: '#282828',
                                      transform: 'translateY(-4px)'
                                    }
                                  }}
                                >
                                  <CardMedia
                                    component="img"
                                    image={relatedArtist.image}
                                    alt={   relatedArtist.name}
                                        sx={{ 
                                          borderRadius: '50%',
                                          aspectRatio: '1/1',
                                          p: 2
                                        }}
                                      />
                                      <CardContent sx={{ textAlign: 'center' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                                          {relatedArtist.name}
                                        </Typography>
                                      </CardContent>
                                    </Card>
                                  </Grid>
                                ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Fade>
              )}
            </Box>
          </Box>
    
          {/* Mini Player */}
          <MiniPlayer song={miniPlayerSong} isPlaying={isPlaying} onPlayPause={handlePlayPause} />
    
          {/* Footer */}
          <Footer />
        </Box>
      );
    }
    