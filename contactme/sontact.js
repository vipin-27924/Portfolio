document.addEventListener('DOMContentLoaded', () => {
    // 1. Get references to the form and the success message div
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Ensure the form element exists before adding an event listener
    if (form) {
        // 2. Attach event listener for form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the browser's default form submission
            
            const formData = new FormData(form);
            
            // 3. Send the form data using the Fetch API (AJAX submission)
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    // This header is essential for Formspree to handle AJAX submissions correctly
                    'Accept': 'application/json' 
                }
            })
            .then(response => {
                // 4. Handle a successful response from Formspree
                if (response.ok) {
                    form.style.display = 'none'; // Hide the form 
                    successMessage.classList.remove('hidden'); // Show the success message
                } else {
                    // 5. Handle server/validation errors (e.g., failed CAPTCHA, invalid email)
                    response.json().then(data => {
                        let errorMessage = 'Oops! There was a problem submitting your form.';
                        if (data && data.errors) {
                            // Extract specific error messages if available
                            errorMessage = "Submission failed: " + data.errors.map(error => error.message).join(", ");
                        }
                        alert(errorMessage);
                    });
                }
            })
            .catch(error => {
                // 6. Handle network errors (e.g., user offline, domain unreachable)
                console.error('Network Error:', error);
                alert('Oops! A network error occurred. Please check your connection.');
            });
        });
    }
});