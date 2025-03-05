function initializeSession() {
    // existing code...
    const selectedCategories = getSelectedCategories(); // Assume this function retrieves selected categories
    sessionStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    window.location.href = 'welcome.html'; // Redirect to the Welcome page
    // existing code...
} 