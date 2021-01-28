import React from 'react';

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({songs, setSongs, songInfo, 
    setSongInfo, audioRef, 
    isPlaying, setIsPlaying, 
    currentSong, setCurrentSong}) => {

    // Event Handlers
    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
        else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    };

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song => song.id === currentSong.id));

        if(direction === 'skip-forward'){
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
        }

        if(direction === 'skip-backwards'){
            // lesson 18 time 15:00, completed differently
            if(currentIndex === 0){
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1])
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        // check if song is playing
        if(isPlaying) audioRef.current.play();
    };

    // functions
    const getTime = (time) => {
        return(
            // format the time
            Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
        );
    };

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id){
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
    };

    return(
        <div className='player'>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                    min={0} 
                    max={songInfo.duration || 0} 
                    value={songInfo.currentTime} 
                    type="range" 
                    onChange={dragHandler}
                />
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-backwards')} 
                    className='skip-back' 
                    size='2x' 
                    icon={faAngleLeft} 
                />
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className='play' 
                    size='2x' 
                    icon={isPlaying ? faPause : faPlay} 
                />
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-forward')} 
                    className='skip-forward' 
                    size='2x' 
                    icon={faAngleRight} 
                />
            </div>
        </div>
    );
};

export default Player;
