const divs = document.querySelectorAll('div')

function logText(e) {
    console.log(this.classList.value)
    // This will stopp bubbling after you hit the first element
    e.stopPropagation();
}
// When you click on element - the capture goes from the parent to the deepest child -- capture is top down.
// The event bubbles up - child to parent
divs.forEach(div => div.addEventListener('click', logText, {
    // This will run the event on the way down if true
    capture: false,
    // This will cancel the event listener after clicking once if true
    once: false
}))