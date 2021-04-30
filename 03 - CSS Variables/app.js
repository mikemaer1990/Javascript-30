// Select all inputs and our root element
const inputs = document.querySelectorAll(".controls input");
let root = document.documentElement;

// Callback function to run on each input element
function updateDOM() {
    // Get the data-sizing property value if it exists
    const sizing = this.dataset.sizing || '';
    // Set the value of this.id in the root element to the value of this + the sizing suffix
    root.style.setProperty(`--${this.id}`, this.value + sizing);
}

// Listen for any input on all input elements and run the callback
inputs.forEach(input => input.addEventListener('input', updateDOM));
