// Select elements from the DOM
const displayTime = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const timeButtons = [...document.querySelectorAll(".timer__button")];
let countdown;

// Timer function
function timer(seconds) {
    // Clear any existing countdown
    clearInterval(countdown);
    // Get current time
    const now = Date.now();
    // Get end time based on user input
    const then = now + seconds * 1000;
    // Display time immediately at start
    displayTimeLeft(seconds);
    // Display end time at start
    displayEndTime(then);
    // Countdown interval
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // Check if time needs to be stopped
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        // Display each second
        displayTimeLeft(secondsLeft);
    }, 1000); // Run every 1000ms
}

// Display the time left in proper format
function displayTimeLeft(seconds) {
    // Create a time object to work with based on the seconds argument
    const timeObj = new Date(seconds * 1000);
    const hours = timeObj.getUTCHours();
    const mins = timeObj.getUTCMinutes();
    const secs = timeObj.getUTCSeconds();
    // Create a formatted string
    const timeDisplay = `${
    hours ? hours.toString() + ":" : ""
  }${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    // Update the title and display time elements
    displayTime.innerText = timeDisplay;
    document.title = timeDisplay;
}

// Display the time it will be at end of countdown
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour.toString().padStart(2, "0")}
    :${minutes.toString().padStart(2, "0")}`;
}

// Function to start timer based on button clickage / input
function startTimer() {
    const time = this.dataset.time;
    timer(time);
}

// Event listeners
timeButtons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
    // Prevent page from reloading on submit
    e.preventDefault();
    // Covert minutes to seconds
    const seconds = parseInt(this.minutes.value) * 60;
    // Run the timer function
    timer(seconds);
    // Reset the input field
    this.reset();
});