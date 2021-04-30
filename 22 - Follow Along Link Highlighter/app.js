// Select links from DOM
const links = document.querySelectorAll('a');
// Create our highlight span
const highlight = document.createElement('span');
// Add the highlight class to it
highlight.classList.add('highlight');
// Add the element to the DOM
document.body.append(highlight)

// Function to run on highlight event
function highlightLink() {
    // Extract dimensions / coord from highlighted element
    const linkCoords = this.getBoundingClientRect();
    // Set the highlight elements dimensions and coords based on THIS' data
    highlight.style.width = `${linkCoords.width}px`;
    highlight.style.height = `${linkCoords.height}px`;
    highlight.style.transform = `translate(${linkCoords.left}px, ${linkCoords.top + window.scrollY}px)`;
}

// Event listener for mouseenter on each link
links.forEach(link => link.addEventListener('mouseenter', highlightLink));