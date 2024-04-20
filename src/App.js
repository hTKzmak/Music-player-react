import { useEffect, useRef, useState } from 'react';
import './App.css'
import Player from './components/Player';

// импорт всей музыки
import { songsdata } from './components/Player/audios.js'

function App() {

  // обозначаем данные songsdata в songs (то есть, берём все песни из songsdata и добавляем его в songs)
  const [songs, setSongs] = useState(songsdata);

  // для воспроизведения плеера (если true, то музыка играет. Если false, то не играет)
  const [isPlaying, setIsPlaying] = useState(false);

  // текущая музыка, которая должна играться (отсюда мы получаем инфу о музыке: файл, название, исполнитель, и т.д.)
  const [currentSong, setCurrentSong] = useState(songsdata[1]);

  // так как реакт не знает что именно проигрывать, то используем useref 
  const audioElem = useRef();

  // для повторения воспроизведения музыки
  const [loopMusic, setLoopMusic] = useState(false) 

  // для изменения громкости
  const [volume, setVolume] = useState(1)



  // useEffect используется для отслеживания булевого значения isplaying (для воспроизведения музыки)
  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play()
    }
    else {
      audioElem.current.pause()
    }
  }, [isPlaying])

  // ф-ия для ползунка плеера
  const onPlaying = () => {
    // вся продолжительность музыки
    const duration = audioElem.current.duration
    // текущая продолжительность музыки
    const currentTime = audioElem.current.currentTime

    // заменяем значение currentSong на тот-же currentSong, но с инфой о прогрессе и длине текущей музыки 
    setCurrentSong({ ...currentSong, "progress": currentTime / duration * 100, "length": duration })    

    // изменяем громкость музыки
    audioElem.current.volume = volume
  }

  return (
    <div className="App">
      <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} loop={loopMusic} volume={volume}/>
      <Player songs={songs} setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} loopMusic={loopMusic} setLoopMusic={setLoopMusic} volume={volume} setVolume={setVolume}/>
    </div>
  );
}

export default App;
