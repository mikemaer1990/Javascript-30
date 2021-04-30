// Create canvas variables
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// Set up our canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Set up the color / style of our brush
ctx.strokeStyle = '#fff';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 35

// Boolean to track if the mouse is down or not
let isDrawing = false;
// Initialize X/Y/hue variables
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

// Our drawing function
function draw(e) {
    // Don't do anything when mouse isn't down
    if (!isDrawing) return;
    // Change the color of the brush
    ctx.strokeStyle = `hsl(${hue}, 100%, 58%)`
    ctx.beginPath();
    // Start from coords
    ctx.moveTo(lastX, lastY);
    // Draw to coords
    ctx.lineTo(e.offsetX, e.offsetY);
    // This actually draws the line
    ctx.stroke();
    // Keep track of our position
    [lastX, lastY] = [e.offsetX, e.offsetY];
    // Increase the hue to create a rainbow effect
    hue++;
    // Reset hue variable once it hits the max
    hue >= 360 ? hue = 0 : hue = hue;
    // Reset the size variable once it reaches 75
    ctx.lineWidth >= 80 || ctx.lineWidth <= 5 ? direction = !direction : direction = direction;
    // Increase / Decrease size based on direction boolean
    direction ? ctx.lineWidth++ : ctx.lineWidth--;
}

// Event listeners
canvas.addEventListener('mousemove', draw); // Run our draw function when the mouse moves
// When the mouse is down - set isdrawing to true and update the x/y positions in our global variables
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
// When the mouse isn't down - set isdrawing to false
canvas.addEventListener('mouseup', () => isDrawing = false);