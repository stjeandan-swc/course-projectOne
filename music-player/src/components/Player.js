import React, { useRef, useState } from 'react';

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Player = ({isPlaying, setIsPlaying, currentSong}) => {
    //Ref
    const audioRef = useRef(null);

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

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime: current, duration: duration});
    };

    // States
    const [songInfo, setSongInfo] = useState({
        currentTime: null,
        duration: null,
    });

    // functions
    const getTime = (time) => {
        return(
            // format the time
            Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
        );
    };

    return(
        <div className='player'>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input type="range" />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className='skip-back' size='2x' icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={faPlay} />
                <FontAwesomeIcon className='skip-forward' size='2x' icon={faAngleRight} />
            </div>
            <audio 
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef} 
                src={currentSong.audio}>
            </audio>
        </div>
    );
};

export default Player;
