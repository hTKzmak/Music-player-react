import { useEffect, useState } from "react";
import useSound from "use-sound"; //для работы со звуком
import path from "../assets/path.mp4"; // импорт музыки

import { ReactComponent as Pause } from "../assets/icons/pause.svg"
import { ReactComponent as Play } from "../assets/icons/play.svg"
import { ReactComponent as Next } from "../assets/icons/next.svg"
import { ReactComponent as Previous } from "../assets/icons/previous.svg"
import { ReactComponent as Again } from "../assets/icons/again.svg"
import { ReactComponent as Volume } from "../assets/icons/volume.svg"
import { ReactComponent as Mix } from "../assets/icons/mix.svg"

import '../components/Player.css'

function Player() {
    const [isPlaying, setIsPlaying] = useState(false); // воспроизведение музыки (false - не играет)
    const [vol, setVol] = useState(0.5) // Громкость звука
    const [play, { pause, duration, sound }] = useSound(path, { volume: vol }); // инициализация музыки и кнопок (играть [ пауза, метод звука и тд ])
    const [seconds, setSeconds] = useState(); // текущая позиция звука в секундах

    const [time, setTime] = useState({
        min: "",
        sec: ""
    });
    const [currTime, setCurrTime] = useState({
        min: "",
        sec: ""
    });


    useEffect(() => {
        if (duration) {
            const sec = duration / 1000;
            const min = Math.floor(sec / 60);
            const secRemain = Math.floor(sec % 60);
            setTime({
                min: min,
                sec: secRemain
            });
        }
    }, [isPlaying]);


    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrTime({
                    min,
                    sec
                });
            }
        });
        return () => clearInterval(interval);
    }, [sound]);


    const playingButton = () => {
        // если значение false, то музыка ставится на паузу 
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        }
        // если значение true, то музыка воспроизводится
        else {
            play();
            setIsPlaying(true)
        }
    };

    return (
        <div className="component">
            <div className="actionMusic">
                <button className="playButton">
                    <Previous />
                </button>
                {!isPlaying ? (
                    <button className="playButton" onClick={playingButton}>
                        <Play />
                    </button>
                ) : (
                    <button className="playButton" onClick={playingButton}>
                        <Pause />
                    </button>
                )}
                <button className="playButton">
                    <Next />
                </button>
            </div>
            <div className="nameAndRange">
                <div className="musicName">
                    <div className="name">
                        <h3 className="title">Path</h3>
                        <p className="subTitle">Apocalyptica</p>
                    </div>
                    <div className="time">
                        <p>{currTime.min}:{currTime.sec} / {time.min}:{time.sec}</p>
                    </div>
                </div>
                <div className="musicRange">
                    <input
                        type="range"
                        min="0"
                        max={duration / 1000}
                        default="0"
                        value={seconds}
                        className="timeline"
                        onChange={(e) => {
                            sound.seek([e.target.value]);
                        }}
                    />
                </div>
            </div>
            <div className="musicSettings">
                <button className="playButton">
                    <Again />
                </button>
                <button className="playButton" id="music">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={vol}
                        className="volumeChanger"
                        onChange={(e) => setVol(e.target.value)}
                    />
                    <Volume />
                </button>
                <button className="playButton">
                    <Mix />
                </button>
            </div>
        </div>
    );
}

export default Player