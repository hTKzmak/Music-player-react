import { useRef } from 'react';
import './Player.scss'
import { BsFillSkipStartCircleFill, BsFillPlayCircleFill, BsFillSkipEndCircleFill, BsFillPauseCircleFill } from 'react-icons/bs'
import { ReactComponent as Repeat } from '../../assets/Repeat.svg'
import { ReactComponent as RepeatSong } from '../../assets/RepeatSong.svg'
import { ReactComponent as Volume } from '../../assets/Volume.svg'
import { ReactComponent as VolumeMute } from '../../assets/VolumeMute.svg'
import { ReactComponent as Mix } from '../../assets/Mix.svg'
import { ReactComponent as DontMix } from '../../assets/DontMix.svg'

function Player({ audioElem, isPlaying, setIsPlaying, currentSong, setCurrentSong, songs, loopMusic, setLoopMusic, volume, setVolume, mixMusic, setMixMusic }) {

    const clickRef = useRef();

    // ф-ия по проигрыванию и остановки музыки
    const PlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    // ф-ия по перемотке музыки, нажимая на ползунок плеера
    const checkWidth = (e) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const divProgress = offset / width * 100;

        // меняем текущее значение времени audioElem на выбранный нами период (чтобы не вылезала ошибка после перезагрузки, если решил перемотать музыку, не воиспроизводив её, то пишем "или 0"
        audioElem.current.currentTime = (divProgress / 100 * currentSong.length) || 0;
    }

    // ф-ия по воспроизведению предыдущей музыки 
    const skipBack = () => {

        // мы создаём переменную index для того, чтобы найти index песни по названию из songs (audios.js)
        const index = songs.findIndex(x => x.title === currentSong.title);

        if (index === 0) {
            // setCurrentSong(songs[songs.length - 1])
            setCurrentSong(songs[0])
        }
        else {
            setCurrentSong(songs[index - 1])
            setIsPlaying(false)
        }

    }

    // ф-ия по воспроизведению следующей музыки 
    const skipAhead = () => {

        // мы создаём переменную index для того, чтобы найти index песни по названию из songs (audios.js)
        const index = songs.findIndex(x => x.title === currentSong.title);

        if (index === songs.length - 1) {
            setCurrentSong(songs[songs.length - 1])
        }
        else {
            setCurrentSong(songs[index + 1])
            setIsPlaying(false)
        }

    }

    return (
        <div className="player_container">
            <div className="controls">
                <BsFillSkipStartCircleFill className='btn_action' onClick={skipBack} />
                {!isPlaying ? (
                    <BsFillPlayCircleFill className='btn_action pp' onClick={PlayPause} />
                ) : (
                    <BsFillPauseCircleFill className='btn_action pp' onClick={PlayPause} />
                )}
                <BsFillSkipEndCircleFill className='btn_action' onClick={skipAhead} />
            </div>
            <div className="navigation">
                <div className="title">
                    <h3>{currentSong.title}</h3>
                    <p>{currentSong.performer}</p>
                </div>
                <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
                    <div className="seek_bar" style={{ width: `${currentSong.progress + "%"}` }}></div>
                </div>
            </div>
            <div className="controls">
                {!loopMusic ? (
                    <Repeat className='btn_control' onClick={() => setLoopMusic(!loopMusic)} />
                ) : (
                    <RepeatSong className='btn_control' onClick={() => setLoopMusic(!loopMusic)} />
                )}

                <div id="music">
                    {volume === '0' ? (
                        <VolumeMute className='btn_control' onClick={() => setVolume('1')} />
                    ) : (
                        <Volume className='btn_control' onClick={() => setVolume('0')} />
                    )}
                    <input
                        type="range"
                        min="0"
                        max="1"
                        default="1"
                        step="0.01"
                        value={volume}
                        className="volumeChanger"
                        onChange={(e) => {
                            setVolume(e.target.value);
                        }}
                    />
                </div>

                {mixMusic === false ? (
                    <DontMix className='btn_control' onClick={() => setMixMusic(true)} />
                ) : (
                    <Mix className='btn_control' onClick={() => setMixMusic(false)} />
                )}
            </div>
        </div>
    )
}

export default Player