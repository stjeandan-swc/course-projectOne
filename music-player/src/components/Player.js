import React, {useEffect} from 'react';

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({songs, setSongs, songInfo, 
    setSongInfo, audioRef, 
    isPlaying, setIsPlaying, 
    currentSong, setCurrentSong}) => {

    // useEffect
    useEffect(() => {
        const newSongs = songs.map((song) => {
            if(song.id === currentSong.id){
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
    });

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

    // functions
    const getTime = (time) => {
        return(
            // format the time
            Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
        );
    };

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song => song.id === currentSong.id));

        if(direction === 'skip-forward'){
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        }

        if(direction === 'skip-backwards'){
            // lesson 18 time 15:00, completed differently
            if(currentIndex === 0){
                setCurrentSong(songs[songs.length - 1]);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
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
                <p>{getTime(songInfo.duration)}</p>
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
