// src/App.jsx
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './styles/theme';
import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage'; // <- use this real one
import Navbar from './components/layout/Navbar';
import ArtistPage from './pages/ArtistPage';
import AlbumPage from './pages/AlbumPage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          {/* Add more routes as needed */} 
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
