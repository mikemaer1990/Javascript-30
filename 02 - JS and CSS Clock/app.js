// Select our clock hands
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

// Function to update the time
const setDate = () => {
    // Create our date obj from the js api
    const dateObj = new Date();

    // Hour hand functionality
    let hours = dateObj.getHours();
    // Deal with 24 hour conversion
    hours > 12 ? hours -= 12 : hours = hours;
    // Calculate the degrees of rotation, based on the current hour (add 90 because we had to rotate the div 90 degrees to make it vertical)
    let hoursDegrees = ((hours / 12) * 360) + 90
    // Update the hour hand div
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

    // Minute hand functionality
    let minutes = dateObj.getMinutes();
    // This deals with the minute hand rotating 360deg after reaching base rotation
    // Removes transition temporarily to avoid this issue
    minutes >= 59 ? minuteHand.classList.toggle('no-transition') : null;
    minutes < 59 && minutes > 1 ? minuteHand.classList.remove('no-transition') : null;
    // Calculate the degrees of rotation, based on the current minute
    minutesDegrees = ((minutes / 60) * 360) + 90;
    // Update the minute hand div
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

    let seconds = dateObj.getSeconds();
    // This deals with the second hand rotating 360deg after reaching base rotation
    // Removes transition temporarily to avoid this issue
    seconds >= 59 ? secondHand.classList.toggle('no-transition') : null;
    seconds < 59 && seconds > 1 ? secondHand.classList.remove('no-transition') : null;
        // Calculate the degrees of rotation, based on the current second
    secondsDegrees = ((seconds / 60) * 360) + 90;
    // Update the second hand div
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
}

// Run our update time funciton every one second
setInterval(setDate, 1000)