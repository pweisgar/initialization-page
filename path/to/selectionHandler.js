function getSelectedCategories() {
    // This function should return an array of selected categories
    const selectedOptions = document.querySelectorAll('input[name="category"]:checked'); // Example selector
    return Array.from(selectedOptions).map(option => option.value);
}

function initializeSession() {
    // Retrieve selected categories
    const selectedCategories = getSelectedCategories(); // Assume this function retrieves selected categories

    // Check if any categories were selected
    if (selectedCategories.length === 0) {
        alert("Please select at least one category.");
        return; // Prevent proceeding if no categories are selected
    }

    // Save selected categories to session storage
    sessionStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));

    // Redirect to the dynamic input page
    window.location.href = 'dynamic-input.html'; // Redirect to the dynamic input page
} 