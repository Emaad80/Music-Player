const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
  {
    path: "assets/1.m4a",
    displayName: "WUYS_-_GOAT(128k)",
    cover: "assets/1.jfif",
    artist: "Hanu Dixit",
  },
  {
    path: "assets/2.mp3",
    displayName: "Die With A Smile",
    cover: "assets/2.jpg",
    artist: "NEFFEX",
  },
  {
    path: "assets/3.mp3",
    displayName: "Panic! At The Disco",
    cover: "assets/3.jpg",
    artist: "Brendon Urie",
  },
  {
    path: "assets/4.mp3",
    displayName: "Modern Talking",
    cover: "assets/4.jfif",
    artist: "Thomas Anders",
  },
  {
    path: "assets/5.mp3",
    displayName: "Let me love you!",
    cover: "assets/5.jpg",
    artist: "DJ Snake feat. Justine Bieber",
  },
  {
    path: "assets/6.mp3",
    displayName: "Dancing",
    cover: "assets/6.png",
    artist: "Aaron Smith",
  },
  {
    path: "assets/7.mp3",
    displayName: "Blah Nomi XD",
    cover: "assets/7.jpeg",
    artist: "Nomi XD,FR3ST and Vyrus",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  //change play button icon
  playBtn.classList.replace("fa-play", "fa-pause");
  //set button hover title
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  //change pause button icon
  playBtn.classList.replace("fa-pause", "fa-play");
  //set button hover title
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}: ${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}: ${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
