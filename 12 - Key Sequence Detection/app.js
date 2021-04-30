// Array to hold our key sequence
const keyCombo = [];
// Our secret key
const secretCombo = "mikhail";

// Listen to any key up event and push the key into the array
window.addEventListener('keyup', (e) => {
    // Remove the first item in the array if the length of the array is longer than the length of our word
    keyCombo.length > secretCombo.length - 1 ? keyCombo.shift() : undefined;
    // Then push the key into the combo array
    keyCombo.push(e.key)
    // If the combo matches our secret key then add unicorn magic
    keyCombo.join('') === secretCombo ? cornify_add() : undefined;
})