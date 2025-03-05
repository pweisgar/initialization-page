document.addEventListener('DOMContentLoaded', function() {
    const selectedCategories = JSON.parse(sessionStorage.getItem('selectedCategories'));
    const welcomeContainer = document.getElementById('welcome-container');

    if (selectedCategories) {
        if (selectedCategories.includes('Occupation')) {
            welcomeContainer.innerHTML += `
                <input type="text" placeholder="Job Title" />
                <input type="text" placeholder="Employer" />
                <input type="text" placeholder="Industry" />
                <input type="text" placeholder="Years of Experience" />
            `;
        }
        if (selectedCategories.includes('Points of Interest')) {
            welcomeContainer.innerHTML += `
                <input type="text" placeholder="Zip Code" />
            `;
        }
        if (selectedCategories.includes('Lifestyle')) {
            welcomeContainer.innerHTML += `
                <input type="text" placeholder="Hobbies" />
            `;
        }
    }
}); 