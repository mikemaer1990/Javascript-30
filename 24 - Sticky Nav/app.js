// Grab our nav from the DOM
const nav = document.querySelector('#main');
const navTop = nav.offsetTop;

// Function to toggle our fixed nav class based on scrollY position
function fixedNav() {
    // If we have have scrolled to as far or farther down than the navbar
    if (window.scrollY >= navTop) {
        // Add our fixed nav class and add padding to the body to make up for the extra space
        // Created by the fixed nav change
        document.body.classList.add('fixed-nav');
        document.body.style.paddingTop = `${nav.offsetHeight}px`;
    } else {
        // Remove the class and padding
        document.body.classList.remove('fixed-nav');
        document.body.style.paddingTop = 0
    }
}

// Listen to scroll events and run our function
window.addEventListener('scroll', fixedNav);