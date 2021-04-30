const panels = document.querySelectorAll('.panel');

// Toggle our open class
function toggleClasses() {
    this.classList.toggle('open');
}
// Toggle our open-active class for the text
function toggleActive(e) {
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active')
    }
}
// Event listeners
panels.forEach(item => item.addEventListener('click', toggleClasses))
panels.forEach(item => item.addEventListener('transitionend', toggleActive))