import {
    LuFastForward,
    LuPause,
    LuPlay,
    LuRewind
} from "react-icons/lu";

import { useState } from "react";

export default function Controls({
    songs,
    songIndex,
    playSong,
    audio
}) {

    const [isPlaying, setIsPlaying] = useState(false);

    const previousSong = () => {

        if (
            songIndex === null ||
            songs.length === 0
        ) {
            return;
        }
        
        const previousIndex =
            songIndex === 0
                ? songs.length - 1
                : songIndex - 1;

        playSong(previousIndex);
        setIsPlaying(true);
    };

    const nextSong = () => {

        if (
            songIndex === null ||
            songs.length === 0
        ) {
            return;
        }

        const nextIndex =
            songIndex === songs.length - 1
                ? 0
                : songIndex + 1;

        playSong(nextIndex);
        setIsPlaying(true);
    };

    const togglePlay = () => {

        if (!audio.current?.src) {
            return;
        }

        if (audio.current.paused) {

            audio.current.play();
            setIsPlaying(true);

        } else {

            audio.current.pause();
            setIsPlaying(false);

        }
    };

    return (
        <div className="controls">

            <LuRewind
                onClick={previousSong}
            />

            {isPlaying ? (
                <LuPause
                    onClick={togglePlay}
                />
            ) : (
                <LuPlay
                    onClick={togglePlay}
                />
            )}

            <LuFastForward
                onClick={nextSong}
            />

        </div>
    );
}