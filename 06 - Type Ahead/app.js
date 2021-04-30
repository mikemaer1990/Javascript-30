// Endpoint URL to fetch JSON data from
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
// Select our input element
const input = document.querySelector('.search');
// Select our suggestions UL
const suggestions = document.querySelector('.suggestions')
// Initiate cities array
const cities = [];

// Extract data from endpoint url
// This returns a promise
fetch(endpoint)
    // Convert to JSON  
    .then(blob => blob.json()
        // This still returns a promise
        // Extract raw data, then push a flattened array into cities array
        .then(data => cities.push(...data)))

// Function to query our list and return matches
function findMatches(query, arr) {
    // Filter cities that match the query
    return arr.filter(c => {
        // Create a regex obj
        const regex = new RegExp(query, 'gi');
        // Return items that match either state or city name
        return c.city.match(regex) || c.state.match(regex);
    })
}
// Add commas in their appropriate places
function addComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Function to display matches
function displayMatches() {
    // Get matchesfrom our findmatches function
    let matches = findMatches(this.value, cities);
    // Create an html element with li items containing matches
    const html = matches.map(item => {
        // Create a regex object to highlight your search query in results list items
        const regex = new RegExp(this.value, 'gi');
        // Replace the city name with our search query highlighted - same for state
        const city = item.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const state = item.state.replace(regex, `<span class="hl">${this.value}</span>`);
        // Return the html element
        return `
            <li>
                <span class="name">${city}, ${state}</span>
                <span class="population">${addComma(item.population)}</span>
            </li>
        `;
    }).join(''); // Join the array items togther
    // Add the html element to our suggestions element
    suggestions.innerHTML = html;
}
// Listen for input and run our function accordingly
input.addEventListener('input', displayMatches)