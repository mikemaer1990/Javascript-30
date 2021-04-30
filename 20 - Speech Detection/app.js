// Set up speech recognition - create shortcut to remove webkit
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Create our speech recognition object
const recognition = new SpeechRecognition();
recognition.interimResults = true;

// Create our p element to push sentences into
let p = document.createElement('p');

// Select the words parent element
const words = document.querySelector('.words')
// Append p to the words div
words.appendChild(p)

function assistantTerms(query) {
    const googleRegex = new RegExp(/search google|google|search for/gi)
    if (query.match(googleRegex)) {
        let extract = query.match(googleRegex);
        query = query
            .replace(extract, '')
            .trim();
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
}

function handleSpeech(e) {
    // Create an array from the transcript object
    const transcript = Array.from(e.results)
        // Dig deeper in array
        .map(result => result[0])
        // And deeper
        .map(result => result.transcript)
        // Join the results together
        .join('')
    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
    p.textContent = poopScript;
    // Add the text to our p element
    p.textContent = transcript

    // Only push the isFinal results into our word div
    if (e.results[0].isFinal) {
        // Check if any of the terms match our assistant's terms
        assistantTerms(transcript)
        p = document.createElement('p');
        words.appendChild(p)

    }
}

// Listen for results on the recognition object
recognition.addEventListener('result', handleSpeech);
// Whenever the recognition event ends - start it again
recognition.addEventListener('end', recognition.start)
// Initialize listening at the beginning of app
recognition.start();