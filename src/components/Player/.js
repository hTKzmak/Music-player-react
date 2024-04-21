let songsdata = [
    {
        "title": "Keep Going",
        "performer": "Swørn",
        "url": "https://mp3.chillhop.com/serve.php/?mp3=9222"
    },
    {
        "title": "Nightfall",
        "performer": "Aiguille",
        "url": "https://mp3.chillhop.com/serve.php/?mp3=9148"
    }
]

let usedNumbers = [];
let randomIndex;

// Генерируем случайный индекс без повторений
do {
  randomIndex = Math.floor(Math.random() * songsdata.length);
} while (usedNumbers.includes(randomIndex));

// Добавляем случайный индекс в массив usedNumbers
usedNumbers.push(randomIndex);

// Получаем песню по случайному индексу
const randomSong = songsdata[randomIndex];

console.log(usedNumbers);
console.log(randomIndex);
console.log(randomSong);