const speed = document.querySelector(".speed");
const bar = document.querySelector(".speed-bar");
const video = document.querySelector(".flex");
let isDown = false;

function handleMouseMove(e) {
    // Calculate how far down the bar our mouse is
    const y = e.pageY - this.offsetTop;
    // Calculate the percentage based on the bar's height and the position of the mouse
    const percent = y / this.offsetHeight;
    // Minimum video speed
    const min = 0.4;
    // Maximum video speed
    const max = 4;
    // Create our height style variable
    const height = `${Math.round(percent * 100)}%`;
    // Calculate the playback rate based on the max/min values we set
    const playbackRate = percent * (max - min) + min;
    // Set the bar height and text
    bar.style.height = height;
    bar.innerText = `${playbackRate.toFixed(2)}x`;
    // Update the video speed
    video.playbackRate = playbackRate;
}

// 
speed.addEventListener("mousemove", () => isDown && handleMouseMove);
speed.addEventListener("click", handleMouseMove);
speed.addEventListener("mousedown", () => isDown = true)
speed.addEventListener("mouseup", () => isDown = false)