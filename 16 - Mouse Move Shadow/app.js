// Select our DOM elements
const hero = document.querySelector('.hero');
const header = document.querySelector('h1');
// Declare our 'leash' value which is the maximum range in which the shadow can go - starting from the center
// Half leash value either direction
const leash = 60;

// Function that will cast the shadow
function shadow(e) {
    // Destructure the hero width and height
    const {
        offsetWidth: width,
        offsetHeight: height
    } = hero;
    // Destructure the mouse location from our event
    let {
        offsetX: x,
        offsetY: y
    } = e;

    // If you are hovering over something OTHER than THIS (which is the element the event listener is attached to)
    // Then instead of 0, 0 being the coords
    // We will add the distance from the left of the screen to our x, y values to get an accurate mouse location
    if (this !== e.target) {
        x = x + e.target.offsetLeft
        y = y + e.target.offsetTop
    }

    // Calculate how far on each side - the shadow offset will be
    // If leash is 100 --- you want the max to be 50 and the min to be -50
    const xLeash = Math.round(x / width * leash) - (leash / 2);
    const yLeash = Math.round(y / height * leash) - (leash / 2);

    // Apply text shadow using our leash values
    header.style.textShadow = `
        ${xLeash}px ${yLeash}px 0 rgba(255,0,255,0.7), 
        ${xLeash * -1}px ${yLeash}px 0 rgba(150,150,0,0.7), 
        ${yLeash}px ${xLeash * -1}px 0 rgba(0,0,255,0.7), 
        ${yLeash * -1}px ${xLeash}px 0 rgba(10,200,200,0.7)
    `;

}

// Listen for any mouse movement and run our shadow function
hero.addEventListener('mousemove', shadow)