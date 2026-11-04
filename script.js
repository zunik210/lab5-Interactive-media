let musicMessage = document.getElementById("musicMessage");

let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let stopBtn = document.getElementById("stopBtn");
let volumeUpBtn = document.getElementById("volumeUpBtn");
let volumeDownBtn = document.getElementById("volumeDownBtn");

let volume = 1.0;

// connected buttons to functions

playBtn.addEventListener("click", playAudio);
pauseBtn.addEventListener("click", pauseAudio);
stopBtn.addEventListener("click", stopAudio);

volumeUpBtn.addEventListener("click", volumeUp);
volumeDownBtn.addEventListener("click", volumeDown);


function playAudio() {
  player.play();
  musicMessage.innerHTML = "Background music is playing.";
}

function pauseAudio() {
  player.pause();
  musicMessage.innerHTML = "Background music is paused.";
}

function stopAudio() {
  player.currentTime = 0;
  player.pause();
  musicMessage.innerHTML = "Background music has stopped.";
}

function volumeUp() {
  volume += 0.1;
  if (volume > 1.0) {
    volume = 1.0;
  }
  player.volume = volume;
  updateMusicMessage();
}

function volumeDown() {
  volume -= 0.1;
  if (volume < 0.0) {
    volume = 0.0;
  }
  player.volume = volume;
  updateMusicMessage();

}

function updateMusicMessage() {
  musicMessage.innerHTML =
    "Background music volume: " + Math.round(player.volume * 100) + "%";
}
