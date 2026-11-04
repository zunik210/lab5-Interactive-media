let musicMessage = document.getElementById("musicMessage");
let player = document.getElementById("backgroundMusic");

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

// location sounds

let oceanSound = document.getElementById("oceanSound");
let trafficSound = document.getElementById("trafficSound");
let marketSound = document.getElementById("marketSound");

let oceanBtn = document.getElementById("oceanBtn");
let trafficBtn = document.getElementById("trafficBtn");
let marketBtn = document.getElementById("marketBtn");
let stopSoundBtn = document.getElementById("stopSoundBtn");

let soundMessage = document.getElementById("soundMessage");

oceanBtn.addEventListener("click", playOcean);
trafficBtn.addEventListener("click", playTraffic);
marketBtn.addEventListener("click", playMarket);
stopSoundBtn.addEventListener("click", stopAllSounds);

function stopLocationSounds() {
  oceanSound.pause();
  oceanSound.currentTime = 0;

  trafficSound.pause();
  trafficSound.currentTime = 0;

  marketSound.pause();
  marketSound.currentTime = 0;
}

function stopAllSounds() {
  stopLocationSounds();
  soundMessage.innerHTML = "All location sounds have stopped.";
}

function playOcean() {
  stopLocationSounds();
  oceanSound.play();
  soundMessage.innerHTML = "Now listening: Ocean waves.";
}

function playTraffic() {
  stopLocationSounds();
  trafficSound.play();
  soundMessage.innerHTML = "Now listening: Karachi city traffic.";
}

function playMarket() {
  stopLocationSounds();
  marketSound.play();
  soundMessage.innerHTML = "Now listening: Karachi market ambience.";
}


/* interaction with location images and videos */

let coastBtn = document.getElementById("coastBtn");
let streetsBtn = document.getElementById("streetsBtn");
let marketsBtn = document.getElementById("marketsBtn");

let videoOverlay = document.getElementById("videoOverlay");
let expandedImage = document.getElementById("expandedImage");
let videoTitle = document.getElementById("videoTitle");
let videoDescription = document.getElementById("videoDescription");
let placeVideo = document.getElementById("placeVideo");
let videoMessage = document.getElementById("videoMessage");
let closeBtn = document.getElementById("closeBtn");

let musicWasPlaying = false;

// connect the location buttons

coastBtn.addEventListener("click", openCoast);
streetsBtn.addEventListener("click", openStreets);
marketsBtn.addEventListener("click", openMarkets);

function openCoast() {
  openLocation(
    "The Coast",
    "Discover the immersive sound of the Arabian Sea.",
    "images/coast.jpg",
    "videos/coast.mp4",
    oceanSound
  );
}

function openStreets() {
  openLocation(
    "The Streets",
    "Experience the movement and energy of Karachi.",
    "images/streets.jpg",
    "videos/streets.mp4",
    trafficSound
  );
}

function openMarkets() {
  openLocation(
    "The Markets",
    "Discover the colours and sounds of local markets.",
    "images/markets.jpg",
    "videos/markets.mp4",
    marketSound
  );
}

// open the selected location and play its matching sound

function openLocation(title, description, image, video, locationSound) {
  videoTitle.innerHTML = title;
  videoDescription.innerHTML = description;
  expandedImage.src = image;

  placeVideo.src = video;
  placeVideo.load();

  videoMessage.innerHTML = "The video is ready.";

  musicWasPlaying = !player.paused;

  player.pause();

  stopLocationSounds();

  videoOverlay.style.display = "flex";

  // play the matching location sound

  locationSound.currentTime = 0;
  locationSound.play();

  soundMessage.innerHTML = "Now listening: " + title + ".";
}

// close the video popup

closeBtn.addEventListener("click", closeVideo);

function closeVideo() {
  placeVideo.pause();
  placeVideo.removeAttribute("src");
  placeVideo.load();

  stopLocationSounds();

  videoOverlay.style.display = "none";

  if (musicWasPlaying) {
    player.play();
  }
}

// close popup when clicking outside the video window

videoOverlay.addEventListener("click", function(event) {
  if (event.target === videoOverlay) {
    closeVideo();
  }
});


/* video manipulation */

placeVideo.addEventListener("play", playerStarted);
placeVideo.addEventListener("timeupdate", playerProgressed);
placeVideo.addEventListener("pause", playerPaused);
placeVideo.addEventListener("ended", playerEnded);

function playerStarted() {
  videoMessage.innerHTML = "The video is playing.";
}

function playerProgressed() {
  let minutes = Math.floor(placeVideo.currentTime / 60);
  let seconds = Math.floor(placeVideo.currentTime) - minutes * 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  videoMessage.innerHTML =
    "The video is playing at " + minutes + ":" + seconds;
}

function playerPaused() {
  if (!placeVideo.ended) {
    videoMessage.innerHTML = "The video is paused.";
  }
}

function playerEnded() {
  videoMessage.innerHTML = "You've reached the end of this journey.";
}