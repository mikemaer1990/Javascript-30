// Select our images
const slideImages = document.querySelectorAll('.slide-in')
// Function to slide images in when halfway scrolled through them
function checkSlide(e) {
    slideImages.forEach(slideImage => {
        // Calculate the current scroll position (bottom) minus half the image height
        const slideInAt = (window.scrollY + window.innerHeight) - slideImage.height / 2;
        // Calculate the bottom of the image's y position
        const imageBottom = slideImage.offsetTop + slideImage.height;
        // Calculate if half the image is visible - scroll ammount + screenwidth - half the image > amount of pixels from top of image to top of DOM
        const isHalfShown = slideInAt > slideImage.offsetTop;
        // Make sure scroll amount is not greated than the Y coords of the bottom of the image
        const isNotScrolledPast = window.scrollY < imageBottom;
        // If image in view and half shown - slide in
        isHalfShown && isNotScrolledPast ?
            slideImage.classList.add('active') :
            slideImage.classList.remove('active')
    })
}

// Listen to events on scroll - debounce so it only updates every 20ms
window.addEventListener('scroll', debounce(checkSlide));

// Function to limit the amount of times the scroll event is reacted to
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}