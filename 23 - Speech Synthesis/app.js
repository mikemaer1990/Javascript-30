// Select elements from DOM
// Initialize speech synthesizer
// Create voice array to store available voices in
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Assign the text in our textarea to our voice synthesizer text value
msg.text = document.querySelector('[name="text"]').value;

// Function to create an option for each available voice
function populateVoices() {
    // Insert all voices to our voice array
    voices = this.getVoices();
    // Create an html object with objects to insert into our dropdown menu
    const voiceOptions = voices.map(voice => {
        return `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
    }).join('')
    voicesDropdown.innerHTML = voiceOptions
}

// Function to set the voice based on the value of the option passed to it
function setVoice() {
    // Find the matching voice and set it to our speechSynthesis
    msg.voice = voices.find(voice => voice.name === this.value);
    toggleSpeech();
}

// Function to start / stop speech playing / reset set to true by default and we can pass it false if we want audio to stop only
function toggleSpeech(reset = true) {
    speechSynthesis.cancel();
    if (reset) {
        speechSynthesis.speak(msg)
    }
}

// Function to set the message / speed / pitch of the voice
function setOptions() {
    msg[this.name] = this.value;
    toggleSpeech();
}

// Event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice)
options.forEach(option => option.addEventListener('change', setOptions));
speakButton.addEventListener('click', toggleSpeech);
stopButton.addEventListener('click', () => toggleSpeech(false));