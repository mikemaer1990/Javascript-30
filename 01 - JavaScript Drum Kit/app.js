// Select key and audio elements from the DOM
const keys = document.querySelectorAll('.key');
const sounds = document.querySelectorAll('audio')

// Function to play sounds - takes in a key as an argument (either keyboard or)
const playSound = (key) => {
    // Argument value from button presses come in differently so this will filter those (obtain the keyCode value)
    if (typeof key !== 'string') {
        key = key.keyCode
    }
    // Find the sound with the data-key that matches the key's value
    let soundToPlay = [...sounds].filter(sound => {
        return sound.dataset.key == key
    })
    // If no sound found - return
    if (!soundToPlay[0]) return;
    // Play the sound
    let audio = new Audio(soundToPlay[0].src)
    audio.time = 0
    audio.play();
}

// Remove the 'playing' class, once the transition ends
const endTransition = (e) => {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing')
}

const startTransition = (e) => {
    let keyToChange = [...keys].filter(item => {
        return item.dataset.key == e.keyCode
    })
    // If no div found - return
    if (!keyToChange[0]) return;
    // Add the playing class
    keyToChange[0].classList.add('playing')
}

// Listen for key presses
window.addEventListener('keyup', (key) => {
    // Pass the key object to our playSound function
    playSound(key);
    // Find the corresponding key Div in the DOM
    startTransition(key)
})

// Listen for clicks on the actual divs
keys.forEach(key => {
    key.addEventListener('click', () => {
        // Play the corresponding sound
        playSound(key.dataset.key)
        // Add the playing class
        key.classList.add('playing')
    })
    // Listen for any transitions that end - and run our endTransition function - which will remove the playing class
    key.addEventListener('transitionend', endTransition)
})