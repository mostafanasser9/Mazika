### `data.js`

```javascript
// filepath: /Users/mostafanasser/Desktop/AAST/HCD/12th Project/music-app/src/data.js

const trendingSongs = [
  { id: 1, title: 'Emshy', artist: 'Tommy Gun, Rally', img: 'images/emshy.jpeg', type: 'song' },
  { id: 2, title: 'Kadaba', artist: 'Karim Osama', img: 'images/kadaba.jpeg', type: 'song' },
  { id: 3, title: 'FAWATER EL 3ETAB', artist: 'Marwan Moussa', img: 'images/fawater.jpeg', type: 'song' },
];

const allSongs = [
  ...trendingSongs,
  { id: 4, title: 'Heart Shaped Box', artist: 'Nirvana', img: 'images/inutero.jpeg', type: 'song' },
  { id: 5, title: 'عالعموم', artist: 'Shehab', img: 'images/3al3mom.jpeg', type: 'song' },
  { id: 6, title: 'Strangers In The Night', artist: 'Frank Sinatra', img: 'images/strangers.jpeg', type: 'song' },
  { id: 7, title: 'Wicked Game', artist: 'Chris Isaak', img: 'images/wickedgame.jpeg', type: 'song' },
];

const artists = [
  { id: "nirvana", name: 'Nirvana', img: 'images/nirvana.jpeg', type: 'artist' },
  { id: "fayrouz", name: 'Fayrouz', img: 'images/fairouz.jpeg', type: 'artist' },
  { id: "amr-diab", name: 'Amr Diab', img: 'images/amrdiab.jpeg', type: 'artist' },
  { id: "bahaa-sultan", name: 'Bahaa Sultan', img: 'images/bahaasultan.jpeg', type: 'artist' },
  { id: "lege-cy", name: 'Lege-cy', img: 'images/legecy.jpeg', type: 'artist' },
  { id: "the-beatles", name: 'The Beatles', img: 'images/beatles.jpeg', type: 'artist' },
  { id: "marwan-pablo", name: 'Marwan Pablo', img: 'images/pablo.jpeg', type: 'artist' },
  { id: "the-weeknd", name: 'The Weeknd', img: 'images/theweeknd.jpeg', type: 'artist' },
];

const podcasts = [
  { id: "Ma3 Kamel A7teramy - مع كامل احترامي", title: 'Ma3 Kamel A7teramy - مع كامل احترامي', host: 'Mohamed Abdelaty', img: 'images/abdelaty.jpeg', type: 'podcast' },
  { id: "Daheeh", title: 'الدحيح', host: 'Daheeh', img: 'images/daheeh.jpeg', type: 'podcast' },
  { id: "The Joe Rogan Experience", title: 'The Joe Rogan Experience', host: 'Joe Rogan', img: 'images/joe.jpeg', type: 'podcast' },
  { id: "TED Daily Talks", title: 'TED Daily Talks', host: 'TED', img: 'images/ted.jpeg', type: 'podcast' },
  { id: "The Daily", title: 'The Daily', host: 'New York Times', img: 'images/daily.jpeg', type: 'podcast' },
];

// Exporting all data as a single object
const data = {
  trendingSongs,
  allSongs,
  artists,
  podcasts,
};

export default data;
```

### Usage in `HomePage.jsx`

You can then import this data into your `HomePage.jsx` file like this:

```jsx
import data from '../data'; // Adjust the path as necessary

const { trendingSongs, allSongs, artists, podcasts } = data;
```

This approach keeps your data organized and makes it easier to manage and update in the future. You can also add more data types (like albums) in a similar manner if needed.