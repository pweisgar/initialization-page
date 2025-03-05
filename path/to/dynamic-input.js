document.addEventListener('DOMContentLoaded', function() {
    const selectedCategories = JSON.parse(sessionStorage.getItem('selectedCategories'));
    const inputContainer = document.getElementById('input-container');

    if (selectedCategories) {
        if (selectedCategories.includes('Occupation')) {
            inputContainer.innerHTML += `
                <label>Job Title: <input type="text" name="jobTitle" /></label><br>
                <label>Employer: <input type="text" name="employer" /></label><br>
                <label>Industry: <input type="text" name="industry" /></label><br>
                <label>Years of Experience: <input type="number" name="yearsExperience" /></label><br>
            `;
        }
        if (selectedCategories.includes('Points of Interest')) {
            inputContainer.innerHTML += `
                <label>Zip Code: <input type="text" name="zipCode" /></label><br>
            `;
        }
        if (selectedCategories.includes('Lifestyle')) {
            inputContainer.innerHTML += `
                <label>Hobbies: <input type="text" name="hobbies" /></label><br>
            `;
        }
    }

    // Handle form submission
    document.getElementById('submit-button').addEventListener('click', function() {
        const formData = new FormData();
        const inputs = inputContainer.querySelectorAll('input');

        inputs.forEach(input => {
            formData.append(input.name, input.value);
        });

        // Process the form data as needed (e.g., send to server or display)
        console.log('Form Data:', Object.fromEntries(formData));
        alert('Form submitted! Check the console for data.');
    });
}); 