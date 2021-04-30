// Select our necessary elements from the DOM
const addItems = document.querySelector('.add-items');
const inputItem = addItems.querySelector('input[type="text"]');
const itemsList = document.querySelector('.plates');
// If there are items in local storage - then create our items array out of that
// Otherwise create an empty array
let items = JSON.parse(localStorage.getItem('items')) || [];
// Button selectors for extra challenges
const checkAll = document.querySelector('#check-all');
const unCheckAll = document.querySelector('#uncheck-all');
const clearAll = document.querySelector('#clear-all');

// Function to update local storage and our list element
function updateStorages() {
    updateList(items, itemsList)
    localStorage.setItem('items', JSON.stringify(items))
}

// Function to add an item to our list
function addItemToList(e) {
    // Prevent the form from submitting as it usually would
    e.preventDefault();
    // Get the text from our input field
    const itemText = this.item.value;
    // Create an object with said text and set done to a default of false - this will determine our checked value
    const itemObject = {
        itemText,
        done: false
    };
    // Reset the input field
    this.reset();
    // Push the new object to our items array
    items.push(itemObject);
    // Update the list and local storage
    updateStorages();
}

// Function to update items in the list - providing an array as a default will prevent our app from breaking if no array argument is passed in
function updateList(items = [], itemsList) {
    // Push an li element with a checkbox and a label FOR EACH item in our array
    itemsList.innerHTML = items.map((item, i) => {
        return `
            <li>
                <input type="checkbox" data-index="${i}" id="item${i}" ${item.done ? 'checked' : ''}> 
                <label for="item${i}">${item.itemText}</label>
            </li>
        `;
    }).join('');
};

// Update the 'done' property in our object based on user input
function toggleCheckbox(e) {
    if (!e.target.matches('input')) return;
    const index = e.target.dataset.index
    // Toggle the done boolean
    items[index]['done'] = !items[index]['done']
    updateStorages();
}

// Function to check all boxes
function checkAllBoxes() {
    items.map(item => {
        !item.done ? item.done = true : null;
    })
    updateStorages();
}

// Function to uncheck all boxes
function unCheckAllBoxes() {
    items.map(item => {
        item.done ? item.done = false : null;
    })
    updateStorages();
}

// Function to clear all boxes
function clearAllBoxes() {
    items = [];
    updateStorages();
}

// Event listeners and run update list once at the start to populate list
addItems.addEventListener('submit', addItemToList)
itemsList.addEventListener('click', toggleCheckbox)
checkAll.addEventListener('click', checkAllBoxes)
unCheckAll.addEventListener('click', unCheckAllBoxes)
clearAll.addEventListener('click', clearAllBoxes)
updateList(items, itemsList)