import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Fade,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import MiniPlayer, { MINIPLAYER_HEIGHT } from '../components/layout/Miniplayer';
import MediaCard from '../components/layout/Mediacard';

const sidebarWidth = 240;
const NAVBAR_HEIGHT = 64;

const trendingSongs = [
  { id: 1, title: 'Emshy', artist: 'Tommy Gun, Rally', img: '/images/emshy.jpeg', type: 'song' },
  { id: 2, title: 'Kadaba', artist: 'Karim Osama', img: '/images/kadaba.webp', type: 'song' },
  { id: 3, title: 'FAWATER EL 3ETAB', artist: 'Marwan Moussa', img: '/images/fawater.webp', type: 'song' },
];

const allSongs = [
  ...trendingSongs,
  { id: 4, title: 'Heart Shaped Box', artist: 'Nirvana', img: '/images/heartshapedbox.webp', type: 'song' },
  { id: 5, title: 'عالعموم', artist: 'Shehab', img: '/images/3al3mom.webp', type: 'song' },
  { id: 6, title: 'Strangers In The Night', artist: 'Frank Sinatra', img: '/images/strangers.webp', type: 'song' },
  { id: 7, title: 'Wicked Game', artist: 'Chris Isaak', img: '/images/wickedgame.webp', type: 'song' },
];

const artists = [
  { id: 1, name: 'Nirvana', img: 'images/nirvana.jpeg', type: 'artist' },
  { id: 2, name: 'Fayrouz', img: 'images/fairouz.jpeg', type: 'artist' },
  { id: 3, name: 'Amr Diab', img: 'images/amrdiab.jpeg', type: 'artist' },
  { id: 4, name: 'Bahaa Sultan', img: 'images/bahaasultan.webp', type: 'artist' },
  { id: 5, name: 'Lege-cy', img: '/images/legecy.jpeg', type: 'artist' },
  { id: 6, name: 'The Beatles', img: '/images/beatles.webp', type: 'artist' },
  { id: 7, name: 'Marwan Pablo', img: '/images/pablo.jpeg', type: 'artist' },
  { id: 8, name: 'The Weeknd', img: '/images/theweeknd.jpeg', type: 'artist' },
];

const podcasts = [
  { id: 1, title: 'Ma3 Kamel A7teramy - مع كامل احترامي', host: 'Mohamed Abdelaty', img: '/images/ab67656300005f1f150c92eb6cc313adc54f050f.jpeg', type: 'podcast' },
  { id: 2, title: 'الدحيح', host: 'Daheeh', img: '/images/ab67656300005f1f3b0df41c54f6b1a1f6cc8e52.jpeg', type: 'podcast' },
  { id: 3, title: 'The Joe Rogan Experience', host: 'Joe Rogan', img: '/images/joe.webp', type: 'podcast' },
  { id: 4, title: 'TED Daily Talks', host: 'TED', img: '/images/ted.webp', type: 'podcast' },
  { id: 5, title: 'The Daily', host: 'New York Times', img: '/images/daily.webp', type: 'podcast' },
];

const filterBySearch = (items, fields, searchQuery) => {
  if (!searchQuery) return items;
  const query = searchQuery.toLowerCase();

  return items.filter(item =>
    fields.some(field => {
      const value = item[field];
      return value && value.toLowerCase().includes(query);
    })
  );
};

export default function Home({ searchQuery }) {
  const [miniPlayerSong, setMiniPlayerSong] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlaySong = (item) => {
    setMiniPlayerSong(item);
    console.log(`Playing ${item.type}:`, item);
  };

  const handleArtistClick = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  const handleFilterChange = (newFilter) => {
    if (newFilter !== filter) {
      setLoading(true);
      setTimeout(() => {
        setFilter(newFilter);
        setLoading(false);
      }, 500);
    }
  };

  const filteredSongs =
    (filter === 'songs' || filter === 'all')
      ? filterBySearch(allSongs, ['title', 'artist'], searchQuery)
      : [];

  const filteredPodcasts =
    (filter === 'podcasts' || filter === 'all')
      ? filterBySearch(podcasts, ['title', 'host'], searchQuery)
      : [];

  const filteredArtists =
    filter === 'all'
      ? filterBySearch(artists, ['name'], searchQuery)
      : [];

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
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, mb: 4 }}>
            {['all', 'songs', 'podcasts'].map((option) => (
              <Box
                key={option}
                role="button"
                tabIndex={0}
                onClick={() => handleFilterChange(option)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleFilterChange(option);
                }}
                sx={{
                  px: 2.5,
                  py: 1,
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                  backgroundColor: (theme) =>
                    filter === option ? theme.palette.primary.light : theme.palette.grey[800],
                  color: (theme) =>
                    filter === option ? theme.palette.common.white : theme.palette.grey[400],
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: (theme) =>
                      filter === option ? theme.palette.primary.main : theme.palette.grey[700],
                  },
                  userSelect: 'none',
                }}
                aria-pressed={filter === option}
                aria-label={`Filter by ${option}`}
              >
                {option}
              </Box>
            ))}
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress color="secondary" size={60} thickness={4.5} />
            </Box>
          ) : (
            <Fade in timeout={400}>
              <Box>
                {filter === 'all' && !searchQuery && (
                  <>
                    <Typography variant="h4" gutterBottom>
                      Trending Songs
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {trendingSongs.map((song) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={song.id}>
                          <MediaCard item={song} type="song" onPlay={handlePlaySong} />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}

                {filteredSongs.length > 0 && (
                  <>
                    <Typography variant="h4" gutterBottom>
                      All Songs
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {filteredSongs.map((song) => (
                        <Grid item xs={12} sm={6} md={3} lg={2} xl={1.5} key={song.id}>
                          <MediaCard item={song} type="song" onPlay={handlePlaySong} />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}

                {filter === 'all' && filteredArtists.length > 0 && (
                  <>
                    <Typography variant="h4" gutterBottom>
                      Artists
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {filteredArtists.map((artist) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} xl={1.5} key={artist.id}>
                          <Box onClick={() => handleArtistClick(artist.id)} sx={{ cursor: 'pointer' }}>
                            <MediaCard item={artist} type="artist" />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}

                {filteredPodcasts.length > 0 && (
                  <>
                    <Typography variant="h4" gutterBottom>
                      Podcasts
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {filteredPodcasts.map((podcast) => (
                        <Grid item xs={12} sm={6} md={3} lg={2} xl={1.5} key={podcast.id}>
                          <MediaCard item={podcast} type="podcast" onPlay={handlePlaySong} />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </Box>
            </Fade>
          )}
        </Box>
      </Box>

      <MiniPlayer song={miniPlayerSong} />
      <Footer />
    </Box>
  );
}
