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

/* location sounds */

let oceanSound = document.getElementById("oceanSound");
let trafficSound = document.getElementById("trafficSound");
let marketSound = document.getElementById("marketSound");

let oceanBtn = document.getElementById("oceanBtn");
let trafficBtn = document.getElementById("trafficBtn");
let marketBtn = document.getElementById("marketBtn");

let soundMessage = document.getElementById("soundMessage");

oceanBtn.addEventListener("click", playOcean);
trafficBtn.addEventListener("click", playTraffic);
marketBtn.addEventListener("click", playMarket);

function stopLocationSounds() {
  oceanSound.pause();
  oceanSound.currentTime = 0;
  trafficSound.pause();
  trafficSound.currentTime = 0;
  marketSound.pause();
  marketSound.currentTime = 0;
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

/* interaction location img and vids */

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

// to remember whether the music was playing
let musicWasPlaying = false;


// connected the location buttons

coastBtn.addEventListener("click", openCoast);
streetsBtn.addEventListener("click", openStreets);
marketsBtn.addEventListener("click", openMarkets);

function openCoast() {
  openLocation(
    "The Coast",
    "Discover the immersive sound of the Arabian Sea.",
    "images/coast.jpg",
    "videos/coast.mp4"
  );
}

function openStreets() {
  openLocation(
    "The Streets",
    "Experience the movement and energy of Karachi.",
    "images/streets.jpg",
    "videos/streets.mp4"
  );
}


function openMarkets() {
  openLocation(
    "The Markets",
    "Discover the colours and sounds of local markets.",
    "images/markets.jpg",
    "videos/markets.mp4"
  );
}

// opens up the selected location
function openLocation(title, description, image, video) {
  videoTitle.innerHTML = title;
  videoDescription.innerHTML = description;
  expandedImage.src = image;
  placeVideo.src = video;
  placeVideo.load();
  videoMessage.innerHTML = "The video is ready.";

  // remembers whether background music was playing
  musicWasPlaying = !player.paused;

  // pause background music
  player.pause();

  // stop individual location sounds
  stopLocationSounds();

  // display the expanded image and video
  videoOverlay.style.display = "flex";

}

// close the video popup

closeBtn.addEventListener("click", closeVideo);
function closeVideo() {
  placeVideo.pause();
  placeVideo.removeAttribute("src");
  placeVideo.load();
  videoOverlay.style.display = "none";

  // to resume music only if it was playing before
  if (musicWasPlaying) {
    player.play();
  }
}

// to close the popup when clicking outside the video window
videoOverlay.addEventListener("click", function(event) {
  if (event.target === videoOverlay) {
    closeVideo();
  }
});
