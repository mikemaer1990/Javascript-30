//   Select the slider div
const slider = document.querySelector(".items");
//   Global variables for mousedown boolean / x position when first clicked / and how far we have scrolled through the div
let isDown = false;
let startX, scrollLeft;

function handleMouseDown(e) {
  //   Keep track of if the mouse is down
  isDown = true;
  //   Add the active class to the slider
  slider.classList.add("active");
  //   Log the starting position of the click
  startX = e.pageX - slider.offsetLeft;
  //   Update the scroll position of the slider
  //   To be used when we update the scroll position
  scrollLeft = slider.scrollLeft;
}

function handleMouseLeave() {
  //   Keep mousedown set to true
  isDown = true;
  //   Remove active class from div
  slider.classList.remove("active");
}

function handleMouseUp() {
  isDown = false;
  slider.classList.remove("active");
}

function handleMouseMove(e) {
  //   If the mouse button isnt down - return
  if (!isDown) return;
  //   Prevent highlighting and other default events from dragging
  e.preventDefault();
  //   Variable to store our mouse position when mouse is down
  //   To be subtracted from the starting position to calculate our scroll amount
  const x = e.pageX - slider.offsetLeft;
  //   Calculate the scroll amount
  const scrollAmount = x - startX;
  //   Update our slider position
  slider.scrollLeft = scrollLeft - scrollAmount;
}

// Mousedown event listener
slider.addEventListener("mousedown", handleMouseDown);

// Mouseleave event listener
slider.addEventListener("mouseleave", handleMouseLeave);

// Mouseup event listener
slider.addEventListener("mouseup", handleMouseUp);

slider.addEventListener("mousemove", handleMouseMove);

// console.log({
//     x,
//     startX
// });
