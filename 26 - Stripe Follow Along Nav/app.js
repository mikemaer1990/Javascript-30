// Select all children of the .cool LIs
const navLinks = document.querySelectorAll('.cool > li');
console.log(navLinks)
// Select the white background which we will animate under our dropdown items
const background = document.querySelector('.dropdownBackground');
// Select the whole nav
const nav = document.querySelector('.top');

// Hover over event function
function handleEnter() {
    // Add the trigger enter class which changes the list display to block
    this.classList.add('trigger-enter');
    // Set the opacity to 1 after 150ms AND make sure that the trigger-enter class has been applied before doing so
    setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
    // Display the white background
    background.classList.add('open')

    // Select the dropdown list from the hovered element
    const dropdown = this.querySelector('.dropdown');
    // Get the coordinates
    const dropdownCoords = dropdown.getBoundingClientRect();
    // Get the nav location just in case something else is added to the document which will change coords
    // Create a coords object for our background
    const coords = {
        height: dropdownCoords.height,
        width: dropdownCoords.width,
        // Adding the nav offsets to make up for any changes in the document
        x: dropdownCoords.left - nav.offsetLeft,
        y: dropdownCoords.top - nav.offsetTop
    };
    // Set the coords of the background
    background.style.height = `${coords.height}px`;
    background.style.width = `${coords.width}px`;
    background.style.transform = `translate(${coords.x}px,${coords.y}px)`;
}

// Remove classes and background
function handleExit() {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    background.classList.remove('open')
}

// Listen for mouseenter
navLinks.forEach(navLink => {
    navLink.addEventListener('mouseenter', handleEnter)
})
// Listen for mouseleave
navLinks.forEach(navLink => {
    navLink.addEventListener('mouseleave', handleExit)
})