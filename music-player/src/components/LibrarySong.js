import React from 'react';

const LibrarySong = ({song, setSongs, songs, setCurrentSong, id, audioRef, isPlaying}) => {

    const songSelectHandler = async () => {
        await setCurrentSong(song);

        // change the active property on the song object
        const newSongs = songs.map((song) => {
            if(song.id === id){
                return{
                    ...song,
                    active: true,
                }
            }
            else{
                return{
                    ...song,
                    active: false,
                }
            }
        });
        setSongs(newSongs);
        // check if song is playing
        if(isPlaying) audioRef.current.play();
    }

    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            <img src={song.cover} alt="Album cover"/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;