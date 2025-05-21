export const albums = {
  "after-hours": {
    id: "after-hours",
    title: "After Hours",
    artist: "The Weeknd",
    artistId: "the-weeknd",
    releaseDate: "March 20, 2020",
    albumType: "Album",
    coverImage: "https://picsum.photos/500/500?random=11",
    totalTracks: 14,
    totalDuration: "56:12",
    label: "XO / Republic Records",
    popularity: 85,
    tracks: [
      { 
        id: 1, 
        number: 1,
        title: "Alone Again", 
        duration: "4:10",
        playCount: "248,156,789",
        explicit: true,
      },
      // ... rest of the tracks
    ],
    credits: [
      { role: "Producer", name: "The Weeknd, Max Martin, Oscar Holter" },
      { role: "Songwriter", name: "The Weeknd, Ahmad Balshe, Jason Quenneville, Max Martin" },
      { role: "Mixing Engineer", name: "Serban Ghenea" },
      { role: "Mastering Engineer", name: "Dave Kutch" },
    ],
    copyright: "© 2020 The Weeknd XO, Inc., Marketed by Republic Records, a division of UMG Recordings, Inc.",
  },
  "starboy": {
    id: "starboy",
    title: "Starboy",
    artist: "The Weeknd",
    artistId: "the-weeknd",
    releaseDate: "November 25, 2016",
    albumType: "Album",
    coverImage: "https://picsum.photos/500/500?random=12",
    totalTracks: 18,
    totalDuration: "68:40",
    label: "XO / Republic Records",
    popularity: 90,
    tracks: [
      {
        id: 1,
        number: 1,
        title: "Starboy",
        duration: "3:50",
        playCount: "1,245,678,901",
        explicit: true,
      },
      {
        id: 2,
        number: 2,
        title: "Party Monster",
        duration: "4:09",
        playCount: "876,543,210",
        explicit: true,
      },
      // Add more tracks
    ],
    credits: [
      { role: "Producer", name: "The Weeknd, Daft Punk, Doc McKinney" },
      { role: "Songwriter", name: "The Weeknd, Thomas Bangalter, Guy-Manuel de Homem-Christo" },
      { role: "Mixing Engineer", name: "Manny Marroquin" },
      { role: "Mastering Engineer", name: "Tom Coyne" },
    ],
    copyright: "© 2016 The Weeknd XO, Inc., Marketed by Republic Records, a division of UMG Recordings, Inc.",
  },
  // Add more albums
};

export const getAlbumById = (id) => {
  return albums[id] || null;
};

export const getAllAlbums = () => {
  return Object.values(albums);
}; 