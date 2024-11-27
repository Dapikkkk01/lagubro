// Select DOM elements
const musicFileInput = document.getElementById("music-file");
const playButton = document.getElementById("play-btn");
const audioElement = new Audio();
const musicNameElement = document.getElementById("music-name");
const seekBar = document.getElementById("seek-bar");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");
const volumeBar = document.getElementById("volume-bar");

// Flag to track if music is playing
let isPlaying = false;

// Event listener to upload music
musicFileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("audio")) {
        audioElement.src = URL.createObjectURL(file);
        musicNameElement.textContent = file.name;
        audioElement.load();
    } else {
        alert("Please upload a valid audio file.");
    }
});

// Event listener for play/pause button
playButton.addEventListener("click", () => {
    if (isPlaying) {
        audioElement.pause();
        playButton.textContent = "Play";
    } else {
        audioElement.play();
        playButton.textContent = "Pause";
    }
    isPlaying = !isPlaying;
});

// Update seek bar as music plays
audioElement.addEventListener("timeupdate", () => {
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;

    seekBar.value = (currentTime / duration) * 100;

    // Format time (minutes:seconds)
    const currentTimeFormatted = formatTime(currentTime);
    const durationFormatted = formatTime(duration);

    currentTimeElement.textContent = currentTimeFormatted;
    durationElement.textContent = durationFormatted;
});

// Seek to different part of the track
seekBar.addEventListener("input", () => {
    const duration = audioElement.duration;
    const seekTo = (seekBar.value / 100) * duration;
    audioElement.currentTime = seekTo;
});

// Update volume
volumeBar.addEventListener("input", () => {
    audioElement.volume = volumeBar.value / 100;
});

// Format time to minutes:seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
