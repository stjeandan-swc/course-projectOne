import React from 'react';

// Components
import Player from './components/Player';
import Song from './components/Song';

// styling
import './styles/app.scss';

function App() {
  return (
    <div className="App">
      <Song />
      <Player />
    </div>
  );
}

export default App;
