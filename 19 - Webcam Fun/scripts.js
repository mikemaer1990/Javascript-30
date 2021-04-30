// Select our elements from the DOM
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const takePhotoBtn = document.querySelector('#takePhoto');
const filterButtons = document.querySelectorAll('.filterBtn');

let currentFilter;
// Function to get webcam video
function getVideo() {
    // This returns a promise
    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        // Then we extract the webcam stream
        .then(localMediaStream => {
            // Set the source and play it in our video object
            video.srcObject = localMediaStream;
            video.play();
        })
        // Catch any error
        .catch(err => {
            console.error(`OH NO!!!`, err);
        });
}

// Function to paint our webcam image to the canvas
function paintToCanvas() {

    const width = video.videoWidth;
    const height = video.videoHeight;
    // Match the dimensions of our canvas with our webcame
    canvas.width = width;
    canvas.height = height;
    // Return the interval - so you can access it - in order to stop the interval - call clearinterval on it
    return setInterval(() => {
        // Draw the image
        ctx.drawImage(video, 0, 0, width, height);
        // Extract pixels
        let pixels = ctx.getImageData(0, 0, width, height);
        // Edit pixels / based on current filter
        currentFilter === 'redEffect' ?
            pixels = redEffect(pixels) :
            currentFilter === 'rgbSplit' ?
            pixels = rgbSplit(pixels) :
            currentFilter === 'greenScreen' ?
            pixels = greenScreen(pixels) : null
        // Return pixels
        ctx.putImageData(pixels, 0, 0);
    }, 16);
};

// Function to snap a photo
function takePhoto() {
    // Set current time on audio clip and play it
    snap.currentTime = 0;
    snap.play();
    // Create our data to convert to a jpeg
    const data = canvas.toDataURL('image/jpeg');
    // Create a link
    const link = document.createElement('a');
    // Set the href
    link.href = data;
    // Add a download attribute and set it to sexay
    link.setAttribute('download', 'sexay');
    // Create an image element from the data variable
    link.innerHTML = `<img src="${data}" alt="Sexy" />`;
    // Insert new photo at the beginning of strip's first child
    strip.insertBefore(link, strip.firstChild);
}

// Function to boost the red count in the rgba
function redEffect(pixels) {
    // Pixels come in arrays --- the rgba values are 4 indices long --- we ignore the alpha channel for this filter
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
}

// Function to split the rgb values
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}

// Green screen function
function greenScreen(pixels) {
    const levels = {};
    // Select our sliders
    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });


    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin &&
            green >= levels.gmin &&
            blue >= levels.bmin &&
            red <= levels.rmax &&
            green <= levels.gmax &&
            blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0.5;
        }
    }

    return pixels;
}

// Listen for clicks on the take photo button
takePhotoBtn.addEventListener('click', takePhoto);
// Listen for clicks on the filter buttons and set the current filter accordingly
filterButtons.forEach(button => button.addEventListener('click', () => {
    // If the button clicked matches the current filter - then remove it
    currentFilter === button.dataset.filter ? currentFilter = null : currentFilter = button.dataset.filter
}));
// If the video can be played - play it
video.addEventListener('canplay', paintToCanvas);
// Get the video feed
getVideo();