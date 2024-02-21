import { useEffect, useState } from "react";
import useSound from "use-sound"; //для работы со звуком
import path from "../assets/path.mp4"; // импорт музыки
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // иконки для воспроизведения и паузы
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // иконки для следующего и предыдущего трека
import { IconContext } from "react-icons"; // для кастомизации иконок
import '../components/Player.css'

function Player() {
    const [isPlaying, setIsPlaying] = useState(false); // воспроизведение музыки (false - не играет)
    const [play, { pause, duration, sound }] = useSound(path); // инициализация музыки и кнопок (играть [ пауза, метод звука и тд ])


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
            <div>
                <button className="playButton">
                    <IconContext.Provider value={{ size: "3em", color: "#E3E3E3" }}>
                        <BiSkipPrevious />
                    </IconContext.Provider>
                </button>
                {!isPlaying ? (
                    <button className="playButton" onClick={playingButton}>
                        <IconContext.Provider value={{ size: "3em", color: "#E3E3E3" }}>
                            <AiFillPlayCircle />
                        </IconContext.Provider>
                    </button>
                ) : (
                    <button className="playButton" onClick={playingButton}>
                        <IconContext.Provider value={{ size: "3em", color: "#E3E3E3" }}>
                            <AiFillPauseCircle />
                        </IconContext.Provider>
                    </button>
                )}
                <button className="playButton">
                    <IconContext.Provider value={{ size: "3em", color: "#E3E3E3" }}>
                        <BiSkipNext />
                    </IconContext.Provider>
                </button>
            </div>
            <div className="nameAndRange">
                <div className="musicName">
                    <h3 className="title">Path</h3>
                    <p className="subTitle">Apocalyptica</p>
                </div>
                <div className="musicRange">
                    <input
                        type="range"
                        min="0"
                        max={duration / 1000}
                        default="0"
                        className="timeline"
                        onChange={(e) => {
                            sound.seek([e.target.value]);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Player