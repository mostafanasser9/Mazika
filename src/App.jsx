// src/App.jsx
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './styles/theme';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage';
import Navbar from './components/layout/Navbar';
import ArtistPage from './pages/ArtistPage';
import AlbumPage from './pages/AlbumPage';
import { PlayerProvider } from './context/PlayerContext';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PlayerProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
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
              path="/album/:id"
              element={
                <>
                  <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                  <AlbumPage />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </PlayerProvider>
    </ThemeProvider>
  );
}

export default App;
