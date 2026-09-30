import "../styles/music.css";
import { useRef, useState } from "react";
import { LuChevronLeft, LuVolume } from "react-icons/lu";
import SongsList from "../blocks/songs list";
import { formatFileTime } from "../tools/Format File Time";
import Controls from "../blocks/controls";
import jsmediatags from "jsmediatags";

export default function Music({ set }) {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState("No song selected");
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [songIndex, setSongIndex] = useState(null);
  const [time, setTime] = useState(0);

  const tube = useRef();
  const importer = useRef();
  const audio = useRef(null);

  const getFiles = (data) => {
    const items = Array.from(data);

    const audioFiles = items.filter((song) => song.type.startsWith("audio/"));

    audioFiles.forEach((file) => {
      jsmediatags.read(file, {
        onSuccess: (tag) => {
          let artwork = null;

          if (tag.tags.picture) {
            const picture = tag.tags.picture;

            const byteArray = new Uint8Array(picture.data);

            const blob = new Blob([byteArray], {
              type: `image/${picture.format}`,
            });

            artwork = URL.createObjectURL(blob);
          }

          setSongs((previous) => [
            ...previous,
            {
              name: file.name,
              size: file.size,
              file: file,
              artwork: artwork,
            },
          ]);
        },

        onError: (error) => {
          console.log(`Could not read tags for ${file.name}`, error);

          setSongs((previous) => [
            ...previous,
            {
              name: file.name,
              size: file.size,
              file: file,
              artwork: null,
            },
          ]);
        },
      });
    });
  };

  const updateAudio = () => {
    if (!audio.current) return;

    const currentTime = audio.current.currentTime;
    const duration = audio.current.duration;

    if (!duration) return;

    const percentage = (currentTime / duration) * 100;

    setProgress(percentage);
    setTime(currentTime);
  };

  const playSong = (index) => {
    if (!songs.length || !audio.current) return;

    const song = songs[index];

    if (!song) return;

    const url = URL.createObjectURL(song.file);

    audio.current.src = url;

    audio.current.play();

    setSongIndex(index);

    setCurrentSong(song.name.replace("-(HipHopKit.com)", ""));
  };

  const manageVolume = (e) => {
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newVolume = Math.min(Math.max(x / rect.width, 0), 1);

    setVolume(newVolume);
    if (audio.current) {
      audio.current.volume = newVolume;
    }
  };

  const manageDrag = (e) => {
    if (e.buttons === 1) {
      manageVolume(e);
    }
  };

  const manageProgress = (e) => {
    if (!audio.current || !audio.current.duration) {
      return;
    }

    const rect = tube.current.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const percentage = Math.max(0, Math.min(x / rect.width, 1));

    audio.current.currentTime = percentage * audio.current.duration;
  };

  const manageProgressDrag = (e) => {
    if (e.buttons === 1) {
        manageProgress(e);
    }
  };

  return (
    <section className="music page">
      <div className="header">
        <h3 onClick={() => set("home")}>
          <LuChevronLeft />
          RiotMusic
        </h3>

        <button
          onClick={() => {
            importer.current?.click();
          }}
        >
          Import Music
        </button>

        <div className="tools" hidden>
          <input
            type="file"
            ref={importer}
            onChange={(e) => getFiles(e.target.files)}
            multiple
            accept="audio/*"
            webkitdirectory="true"
          />

          <audio ref={audio} onTimeUpdate={updateAudio} controls />
        </div>
      </div>

      <SongsList songs={songs} playSong={playSong} />

      <div className="player">
        <small className="player-name">{currentSong}</small>

        <div className="time">
          <span>{formatFileTime(time)}</span>

          <span>
            {audio.current?.duration
              ? formatFileTime(audio.current.duration - time)
              : "00:00"}
          </span>
        </div>

        <div className="progress" ref={tube} onClick={manageProgress}
        onMouseMove={manageProgressDrag}
        >
          <div
            className="progress-tube"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <Controls
          songIndex={songIndex}
          songs={songs}
          playSong={playSong}
          audio={audio}
        />

        <div className="v">
          <LuVolume />
          <div
            className="volume"
            onMouseMove={manageDrag}
            onClick={manageVolume}
          >
            <div
              className="volume-tube"
              style={audio.current ? { width: `${volume * 100}%` } : {}}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
