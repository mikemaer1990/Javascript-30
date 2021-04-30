// Get elements from the DOM
const arrow = document.querySelector('.arrow')
const speed = document.querySelector('.speed-value')

// Get the position of the user
navigator.geolocation.watchPosition(data => {
    // Add the speed to the speed element
    speed.textContent = data.coords.speed;
    // Rotate the arrow based on the heading
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
    // Log any error
}, (err) => {
    console.log(err);
    alert('Please allow us to access your location')
})