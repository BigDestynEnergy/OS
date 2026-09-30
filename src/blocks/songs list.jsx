import { formatFileSize } from "../tools/Format File Size";
import { LuPlay } from "react-icons/lu";

export default function SongsList({ songs, playSong }) {

    return (
        <div className="songs-list">

            {songs.length === 0 && (
                <p>No songs found</p>
            )}

            {songs.map((song, index) => (

                <div
                    className="song"
                    key={index}
                >
                 {song.artwork ? (
    <img
        src={song.artwork}
        alt=""
        className="artwork"
    />
) : (
    <div className="artwork fallback">
        ♪
    </div>
)}

<div className="info">
    <p className="song-name">
        {song.name.replace("-(HipHopKit.com)", "")}
    </p>

    <small>
        {formatFileSize(song.size)}
    </small>
</div>

<span onClick={() => playSong(index)}>
    <LuPlay />
</span>

                </div>

            ))}

        </div>
    );
}