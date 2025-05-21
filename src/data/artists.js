export const artists = {
  "the-weeknd": {
    id: "the-weeknd",
    name: "The Weeknd",
    image: "https://picsum.photos/500/500?random=1",
    monthlyListeners: "82.5M",
    verified: true,
    bio: "Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer, songwriter, and record producer. Known for his sonic versatility and dark lyricism, his music explores escapism, romance, and melancholia, and is often inspired by personal experiences.",
    genres: ["R&B", "Pop", "Alternative R&B"],
    albums: [
      {
        id: "after-hours",
        title: "After Hours",
        coverImage: "https://picsum.photos/500/500?random=11",
        releaseYear: "2020"
      },
      {
        id: "starboy",
        title: "Starboy",
        coverImage: "https://picsum.photos/500/500?random=12",
        releaseYear: "2016"
      },
      {
        id: "dawn-fm",
        title: "Dawn FM",
        coverImage: "https://picsum.photos/500/500?random=15",
        releaseYear: "2022"
      },
      {
        id: "beauty-behind-the-madness",
        title: "Beauty Behind the Madness",
        coverImage: "https://picsum.photos/500/500?random=13",
        releaseYear: "2015"
      }
    ],
    popularSongs: [
      {
        id: 1,
        title: "Blinding Lights",
        album: "After Hours",
        albumId: "after-hours",
        duration: "3:20",
        playCount: "3,242,125,689"
      },
      {
        id: 2,
        title: "Starboy",
        album: "Starboy",
        albumId: "starboy",
        duration: "3:50",
        playCount: "1,245,678,901"
      },
      {
        id: 3,
        title: "The Hills",
        album: "Beauty Behind the Madness",
        albumId: "beauty-behind-the-madness",
        duration: "3:41",
        playCount: "1,987,654,321"
      }
    ]
  }
  // Add more artists
};

export const getArtistById = (id) => {
  return artists[id] || null;
};

export const getAllArtists = () => {
  return Object.values(artists);
}; 