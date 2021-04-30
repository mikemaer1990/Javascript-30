// Select our checkbox elements
const items = [...document.querySelectorAll('input')];

// Variable to track last checked checkbox
let prevChecked;

// Function to check items when shift is held
function checkItems(e) {

    let between = false;
    if (e.shiftKey && this.checked && prevChecked.checked) {
        // If shift key is held and the checkbox clicked is checked
        items.forEach(item => {
            if (item === this || item === prevChecked) {
                between = !between;
            };
            if (between) {
                item.checked = true;
            };
        });
    };
    prevChecked = this;
    console.log(prevChecked.checked)
};

items.forEach(item => {
    item.addEventListener('click', checkItems);
});