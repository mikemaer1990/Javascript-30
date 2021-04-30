// Array of band names to sort
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
// Select our UL from the DOM
const bandList = document.querySelector('#bands');

// Regex to strip articles from band names during sort
const stripArticles = function (name) {
    return name.replace(/^(a |an |the )/i, '').trim();
}

// Sort band names - excluding articles
let sortedBands = bands.sort((a, b) => stripArticles(a) > stripArticles(b));

// Insert bands as LIs to the band list UL
bandList.innerHTML = sortedBands.map(item => {
    return `
        <li>${item}</li>
    `
}).join('');