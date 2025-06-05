// src/App.jsx
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import theme from './styles/theme';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/layout/Navbar';
import ArtistPage from './pages/ArtistPage';
import AlbumPage from './pages/AlbumPage';
import PodcastPage from './pages/PodcastPage';
import { PlayerProvider } from './context/PlayerContext';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PlayerProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/home"
              element={
                <>
                  <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                  <HomePage searchQuery={searchQuery} />
                </>
              }
            />
            <Route
              path="/playlist/:id"
              element={
                <>
                  <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                  <PlaylistPage />
                </>
              }
            />
            <Route
              path="/artist/:id"
              element={
                <>
                  <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                  <ArtistPage />
                </>
              }
            />
            <Route
              path="/podcast/:id"
              element={
                <>
                  <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                  <PodcastPage />
                </>
              }
            />
            <Route
              path="/album/:id"
              element={
                <>
                  <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                  <AlbumPage />
                </>
              }
            />
          </Routes>
        </Router>
      </PlayerProvider>
    </ThemeProvider>
  );
}

export default App;
