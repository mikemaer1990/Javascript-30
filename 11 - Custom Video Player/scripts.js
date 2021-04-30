// Select elements from DOM
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const playButton = player.querySelector('.player__button')
const fullScreen = player.querySelector('.fullscreen__button');

// Functions
function togglePlay() {
    video.paused ? video.play() : video.pause();
}
// Changes play and pause button
function toggleButton() {
    this.paused ? playButton.textContent = '❚ ❚' : playButton.textContent = '►';
}
// Add the data-skip ammount to the video time
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
// Set the volume / speed to the value of the sliders
function rangeUpdate() {
    video[this.name] = this.valueAsNumber;
}
// Fill in the progress bar based on the current video time
function progressUpdate() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
// Calculate appropriate video time based on mouse location and video duration
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
// Toggle fullscreen
function fullScreenUpdate() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
}

// Event listeners

// Event listeners to play and pause video
[playButton, video].forEach(element => element.addEventListener('click', togglePlay));
video.addEventListener('play', toggleButton);
video.addEventListener('pause', toggleButton);
// Event listener to update progress bar
video.addEventListener('timeupdate', progressUpdate);
// Listen to skip forward and back elements events
skipButtons.forEach(element => element.addEventListener('click', skip));
// Update speed and volume according to changes on their respective sliders
ranges.forEach(element => element.addEventListener('change', rangeUpdate));
ranges.forEach(element => element.addEventListener('mousemove', rangeUpdate));
// Mousedown variable for progress bar navigation
let mouseDown = false;
// Event listener for progress bar 
progress.addEventListener('click', scrub);
// This will update the current video time based on the users mouse location - as long as their mouse is down and the mouse is moving
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
// Updates fullscreen mode on click
fullScreen.addEventListener('click', fullScreenUpdate)