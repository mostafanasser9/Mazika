// filepath: /Users/mostafanasser/Desktop/AAST/HCD/12th Project/music-app/src/data.js

export const trendingSongs = [
  { id: 1, title: 'Emshy', artist: 'Tommy Gun, Rally', img: 'images/emshy.jpeg', type: 'song' },
  { id: 2, title: 'Kadaba', artist: 'Karim Osama', img: 'images/kadaba.jpeg', type: 'song' },
  { id: 3, title: 'FAWATER EL 3ETAB', artist: 'Marwan Moussa', img: 'images/fawater.jpeg', type: 'song' },
];

export const allSongs = [
  ...trendingSongs,
  { id: 4, title: 'Heart Shaped Box', artist: 'Nirvana', img: 'images/inutero.jpeg', type: 'song' },
  { id: 5, title: 'عالعموم', artist: 'Shehab', img: 'images/3al3mom.jpeg', type: 'song' },
  { id: 6, title: 'Strangers In The Night', artist: 'Frank Sinatra', img: 'images/strangers.jpeg', type: 'song' },
  { id: 7, title: 'Wicked Game', artist: 'Chris Isaak', img: 'images/wickedgame.jpeg', type: 'song' },
];

export const artists = [
  { id: "nirvana", name: 'Nirvana', img: 'images/nirvana.jpeg', type: 'artist' },
  { id: "fayrouz", name: 'Fayrouz', img: 'images/fairouz.jpeg', type: 'artist' },
  { id: "amr-diab", name: 'Amr Diab', img: 'images/amrdiab.jpeg', type: 'artist' },
  { id: "bahaa-sultan", name: 'Bahaa Sultan', img: 'images/bahaasultan.jpeg', type: 'artist' },
  { id: "lege-cy", name: 'Lege-cy', img: 'images/legecy.jpeg', type: 'artist' },
  { id: "the-beatles", name: 'The Beatles', img: 'images/beatles.jpeg', type: 'artist' },
  { id: "marwan-pablo", name: 'Marwan Pablo', img: 'images/pablo.jpeg', type: 'artist' },
  { id: "the-weeknd", name: 'The Weeknd', img: 'images/theweeknd.jpeg', type: 'artist' },
];

export const podcasts = [
  { id: "Ma3 Kamel A7teramy - مع كامل احترامي", title: 'Ma3 Kamel A7teramy - مع كامل احترامي', host: 'Mohamed Abdelaty', img: 'images/abdelaty.jpeg', type: 'podcast' },
  { id: "Daheeh", title: 'الدحيح', host: 'Daheeh', img: 'images/daheeh.jpeg', type: 'podcast' },
  { id: "The Joe Rogan Experience", title: 'The Joe Rogan Experience', host: 'Joe Rogan', img: 'images/joe.jpeg', type: 'podcast' },
  { id: "TED Daily Talks", title: 'TED Daily Talks', host: 'TED', img: 'images/ted.jpeg', type: 'podcast' },
  { id: "The Daily", title: 'The Daily', host: 'New York Times', img: 'images/daily.jpeg', type: 'podcast' },
];

// You can also add albums data here if you have any
export const albums = [
  // Example album data structure
  { id: 1, title: 'Nevermind', artist: 'Nirvana', img: 'images/nevermind.jpeg', releaseYear: 1991 },
  { id: 2, title: 'The Dark Side of the Moon', artist: 'Pink Floyd', img: 'images/darkside.jpeg', releaseYear: 1973 },
  // Add more albums as needed
];