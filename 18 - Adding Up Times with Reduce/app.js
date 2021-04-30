// Select and spread our li video items
const videos = [...document.querySelectorAll('ul li')];

// Function to create a time object from our calculated seconds
function formatTime(sec) {
    const dateObj = new Date(sec * 1000)
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getUTCSeconds();
    const timeObj = hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0');
    return timeObj;
}

// Function to calculate total seconds of our video
const totalVideoTime = videos.reduce((accumulator, currentVideo) => {
    // Split into an array of minutes / seconds
    const time = currentVideo.dataset.time.split(':')
    const minutes = parseFloat(time[0]);
    const seconds = parseFloat(time[1]);
    // Calculate total seconds
    const totalSeconds = parseFloat((minutes * 60) + seconds);
    // Update accumulator
    return accumulator += totalSeconds
}, 0);


console.log(formatTime(13820))