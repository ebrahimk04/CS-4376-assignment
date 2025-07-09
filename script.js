// Cyberminer Web Search Demo Script
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const loginForm = document.getElementById('loginForm');

    // Demo search data
    const demoData = [
        { title: 'Introduction to Web Development', url: 'https://example.com/web-dev', description: 'Learn the basics of HTML, CSS, and JavaScript for web development.' },
        { title: 'JavaScript Fundamentals', url: 'https://example.com/js-basics', description: 'Master JavaScript programming concepts and best practices.' },
        { title: 'CSS Styling Guide', url: 'https://example.com/css-guide', description: 'Comprehensive guide to styling web pages with CSS.' },
        { title: 'HTML Structure and Semantics', url: 'https://example.com/html-semantics', description: 'Understanding proper HTML structure and semantic elements.' },
        { title: 'Web Search Algorithms', url: 'https://example.com/search-algo', description: 'How search engines work and index web content.' }
    ];

    function performSearch(query) {
        if (!query.trim()) {
            searchResults.innerHTML = '<p>Please enter a search term.</p>';
            return;
        }

        // Simple search implementation
        const results = demoData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );

        displayResults(results, query);
    }

    function displayResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = `<p>No results found for "${query}".</p>`;
            return;
        }

        const resultsHTML = results.map(item => `
            <div class="search-result">
                <h3><a href="${item.url}" target="_blank">${item.title}</a></h3>
                <p class="url">${item.url}</p>
                <p class="description">${item.description}</p>
            </div>
        `).join('');

        searchResults.innerHTML = `
            <h2>Search Results for "${query}" (${results.length} results)</h2>
            ${resultsHTML}
        `;
    }

    // Event listeners
    searchButton.addEventListener('click', function() {
        const query = searchInput.value;
        performSearch(query);
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = searchInput.value;
            performSearch(query);
        }
    });

    // Dynamic validation system
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = loginForm.querySelector('button[type="submit"]');

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Create validation feedback elements
    function createValidationFeedback(input, message, isValid) {
        // Remove existing feedback
        const existingFeedback = input.parentNode.querySelector('.validation-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        // Remove existing classes
        input.classList.remove('is-valid', 'is-invalid');

        // Add validation class
        input.classList.add(isValid ? 'is-valid' : 'is-invalid');

        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `validation-feedback ${isValid ? 'valid-feedback' : 'invalid-feedback'}`;
        feedback.textContent = message;
        feedback.style.display = 'block';

        // Insert after input
        input.parentNode.appendChild(feedback);
    }

    // Email validation
    function validateEmail(email) {
        if (!email) {
            return { isValid: false, message: 'Email is required' };
        }
        if (!emailPattern.test(email)) {
            return { isValid: false, message: 'Please enter a valid email address' };
        }
        return { isValid: true, message: 'Email looks good!' };
    }

    // Password validation
    function validatePassword(password) {
        if (!password) {
            return { isValid: false, message: 'Password is required' };
        }
        if (password.length < 8) {
            return { isValid: false, message: 'Password must be at least 8 characters' };
        }
        if (!passwordPattern.test(password)) {
            return { 
                isValid: false, 
                message: 'Password must contain uppercase, lowercase, number, and special character' 
            };
        }
        return { isValid: true, message: 'Password is strong!' };
    }

    // Real-time validation
    let emailValidationTimeout;
    let passwordValidationTimeout;

    emailInput.addEventListener('input', function() {
        clearTimeout(emailValidationTimeout);
        emailValidationTimeout = setTimeout(() => {
            const validation = validateEmail(this.value);
            createValidationFeedback(this, validation.message, validation.isValid);
            updateSubmitButton();
        }, 300); // Debounce for better UX
    });

    passwordInput.addEventListener('input', function() {
        clearTimeout(passwordValidationTimeout);
        passwordValidationTimeout = setTimeout(() => {
            const validation = validatePassword(this.value);
            createValidationFeedback(this, validation.message, validation.isValid);
            updateSubmitButton();
        }, 300); // Debounce for better UX
    });

    // Update submit button state
    function updateSubmitButton() {
        const emailValidation = validateEmail(emailInput.value);
        const passwordValidation = validatePassword(passwordInput.value);
        
        const isFormValid = emailValidation.isValid && passwordValidation.isValid;
        
        submitButton.disabled = !isFormValid;
        submitButton.classList.toggle('btn-primary', isFormValid);
        submitButton.classList.toggle('btn-secondary', !isFormValid);
    }

    // Blur validation (immediate feedback when user leaves field)
    emailInput.addEventListener('blur', function() {
        const validation = validateEmail(this.value);
        createValidationFeedback(this, validation.message, validation.isValid);
        updateSubmitButton();
    });

    passwordInput.addEventListener('blur', function() {
        const validation = validatePassword(this.value);
        createValidationFeedback(this, validation.message, validation.isValid);
        updateSubmitButton();
    });

    // Login form handling
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Final validation before submission
        const emailValidation = validateEmail(emailInput.value);
        const passwordValidation = validatePassword(passwordInput.value);
        
        if (!emailValidation.isValid || !passwordValidation.isValid) {
            // Show validation messages if not already shown
            if (!emailValidation.isValid) {
                createValidationFeedback(emailInput, emailValidation.message, false);
            }
            if (!passwordValidation.isValid) {
                createValidationFeedback(passwordInput, passwordValidation.message, false);
            }
            return;
        }

        const email = emailInput.value;
        const password = passwordInput.value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Demo login functionality
        console.log('Login attempt:', { email, password, rememberMe });
        
        // Show success message (in a real app, you'd validate credentials)
        alert(`Login successful for ${email}! (This is a demo)`);
        
        // Clear form and validation
        loginForm.reset();
        emailInput.classList.remove('is-valid', 'is-invalid');
        passwordInput.classList.remove('is-valid', 'is-invalid');
        
        // Remove validation feedback
        const feedbacks = loginForm.querySelectorAll('.validation-feedback');
        feedbacks.forEach(feedback => feedback.remove());
        
        // Reset submit button
        submitButton.disabled = true;
        submitButton.classList.remove('btn-primary');
        submitButton.classList.add('btn-secondary');
        
        // Close dropdown
        const dropdown = bootstrap.Dropdown.getInstance(document.getElementById('loginDropdown'));
        if (dropdown) {
            dropdown.hide();
        }
    });

    // Add some basic styling
    const style = document.createElement('style');
    style.textContent = `
        body {
            background-color: #f8f9fa;
            padding-top: 0;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding-top: 20px;
        }
        
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .search-container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        #search-input {
            width: 70%;
            padding: 12px;
            font-size: 16px;
            border: 2px solid #e9ecef;
            border-radius: 6px;
            margin-right: 10px;
            transition: border-color 0.3s ease;
        }
        
        #search-input:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
        }
        
        #search-button {
            padding: 12px 24px;
            font-size: 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        #search-button:hover {
            background-color: #0056b3;
        }
        
        .search-result {
            background: white;
            padding: 20px;
            margin: 15px 0;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .search-result:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .search-result h3 {
            margin: 0 0 8px 0;
        }
        
        .search-result h3 a {
            color: #1a0dab;
            text-decoration: none;
        }
        
        .search-result h3 a:hover {
            text-decoration: underline;
        }
        
        .search-result .url {
            color: #006621;
            font-size: 14px;
            margin: 5px 0;
        }
        
        .search-result .description {
            color: #545454;
            margin: 8px 0 0 0;
            line-height: 1.5;
        }
        
        .dropdown-menu {
            border: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border-radius: 8px;
        }
        
        .dropdown-item {
            padding: 0;
        }
        
        .dropdown-item form {
            border: none;
        }
        
        /* Validation styling */
        .validation-feedback {
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        .valid-feedback {
            color: #198754;
        }
        
        .invalid-feedback {
            color: #dc3545;
        }
        
        .form-control.is-valid {
            border-color: #198754;
            padding-right: 2.5rem;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23198754'%3e%3cpath d='M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 0.75rem center;
            background-size: 1rem;
        }
        
        .form-control.is-invalid {
            border-color: #dc3545;
            padding-right: 2.5rem;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23dc3545'%3e%3cpath d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 0.75rem center;
            background-size: 1rem;
        }
        
        .btn:disabled {
            opacity: 0.65;
            cursor: not-allowed;
        }
        
        /* Password strength indicator */
        .password-strength {
            height: 4px;
            border-radius: 2px;
            margin-top: 5px;
            transition: all 0.3s ease;
        }
        
        .password-strength.weak {
            background: linear-gradient(to right, #dc3545 0%, #dc3545 33%, #e9ecef 33%, #e9ecef 100%);
        }
        
        .password-strength.medium {
            background: linear-gradient(to right, #ffc107 0%, #ffc107 66%, #e9ecef 66%, #e9ecef 100%);
        }
        
        .password-strength.strong {
            background: linear-gradient(to right, #198754 0%, #198754 100%);
        }
    `;
    document.head.appendChild(style);

    // Show initial message
    searchResults.innerHTML = '<p>Enter a search term to get started. Try searching for "web", "JavaScript", or "CSS".</p>';
}); 