// Teknikar Plumbing - Contact Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            PlumbingUtils.formatPhoneNumber(this);
        });

        phoneInput.addEventListener('keypress', function(e) {
            // Only allow numbers and control keys
            const char = String.fromCharCode(e.which);
            if (!/[0-9]/.test(char) && e.which !== 8 && e.which !== 0) {
                e.preventDefault();
            }
        });
    }

    // Form validation
    function validateForm() {
        let isValid = true;
        const errors = [];

        // First Name validation
        const firstName = document.getElementById('firstName');
        if (firstName && firstName.value.trim() === '') {
            firstName.classList.add('error');
            errors.push('First name is required');
            isValid = false;
        } else if (firstName) {
            firstName.classList.remove('error');
        }

        // Last Name validation
        const lastName = document.getElementById('lastName');
        if (lastName && lastName.value.trim() === '') {
            lastName.classList.add('error');
            errors.push('Last name is required');
            isValid = false;
        } else if (lastName) {
            lastName.classList.remove('error');
        }

        // Email validation
        const email = document.getElementById('email');
        if (email) {
            if (email.value.trim() === '') {
                email.classList.add('error');
                errors.push('Email address is required');
                isValid = false;
            } else if (!PlumbingUtils.isValidEmail(email.value)) {
                email.classList.add('error');
                errors.push('Please enter a valid email address');
                isValid = false;
            } else {
                email.classList.remove('error');
            }
        }

        // Phone validation
        if (phoneInput) {
            if (phoneInput.value.trim() === '') {
                phoneInput.classList.add('error');
                errors.push('Phone number is required');
                isValid = false;
            } else if (!PlumbingUtils.isValidPhone(phoneInput.value)) {
                phoneInput.classList.add('error');
                errors.push('Please enter a valid phone number');
                isValid = false;
            } else {
                phoneInput.classList.remove('error');
            }
        }

        // Service Type validation
        const serviceType = document.getElementById('serviceType');
        if (serviceType && serviceType.value === '') {
            serviceType.classList.add('error');
            errors.push('Please select a service type');
            isValid = false;
        } else if (serviceType) {
            serviceType.classList.remove('error');
        }

        // Message validation
        const message = document.getElementById('message');
        if (message) {
            if (message.value.trim() === '') {
                message.classList.add('error');
                errors.push('Please tell us how we can help you');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                message.classList.add('error');
                errors.push('Please provide more details about your plumbing needs');
                isValid = false;
            } else {
                message.classList.remove('error');
            }
        }

        // Consent validation
        const consent = document.getElementById('consent');
        if (consent && !consent.checked) {
            consent.classList.add('error');
            errors.push('Please consent to receive communications');
            isValid = false;
        } else if (consent) {
            consent.classList.remove('error');
        }

        // Honeypot validation (spam protection)
        const website = document.getElementById('website');
        if (website && website.value !== '') {
            // This is likely a bot submission
            return false;
        }

        return { isValid, errors };
    }

    // Show form message
    function showFormMessage(message, type) {
        if (!formMessage) return;

        formMessage.className = `form-message ${type}`;
        formMessage.innerHTML = message;
        formMessage.style.display = 'block';

        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 10000);
        }
    }

    // Show loading state
    function setLoadingState(isLoading) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const resetButton = contactForm.querySelector('button[type="reset"]');

        if (isLoading) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner"></span> Sending...';
            resetButton.disabled = true;

            // Disable all form inputs
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => input.disabled = true);
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Request';
            resetButton.disabled = false;

            // Enable all form inputs
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => input.disabled = false);
        }
    }

    // Handle form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate form
        const validation = validateForm();
        if (!validation.isValid) {
            showFormMessage(`
                <strong>Please correct the following errors:</strong>
                <ul>${validation.errors.map(error => `<li>${error}</li>`).join('')}</ul>
            `, 'error');
            return;
        }

        // Set loading state
        setLoadingState(true);
        hideFormMessage();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Add additional data
        data.submittedAt = new Date().toISOString();
        data.userAgent = navigator.userAgent;
        data.referrer = document.referrer;

        try {
            // In a real implementation, you would send this to your backend
            // For now, we'll simulate a successful submission
            await simulateFormSubmission(data);

            // Show success message
            showFormMessage(`
                <strong>Thank you for contacting Teknikar Plumbing!</strong>
                <p>We've received your service request and will contact you within 2-4 business hours.</p>
                <p><strong>What happens next:</strong></p>
                <ul>
                    <li>You'll receive an email confirmation shortly</li>
                    <li>Our team will review your request</li>
                    <li>We'll contact you by your preferred method</li>
                </ul>
                <p>For urgent matters, please call us at <a href="tel:+1-555-0123">(555) 0123</a></p>
            `, 'success');

            // Reset form
            contactForm.reset();

            // Track successful form submission (for analytics)
            trackFormSubmission('contact_form_success', data);

        } catch (error) {
            console.error('Form submission error:', error);

            // Show error message
            showFormMessage(`
                <strong>Sorry, there was an error submitting your request.</strong>
                <p>Please try again or call us directly at <a href="tel:+1-555-0123">(555) 0123</a> for immediate assistance.</p>
                <p>Error details: ${error.message}</p>
            `, 'error');

            // Track form submission error (for analytics)
            trackFormSubmission('contact_form_error', { error: error.message });

        } finally {
            setLoadingState(false);
        }
    });

    // Simulate form submission (replace with actual backend call)
    async function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate occasional network errors
                if (Math.random() < 0.05) { // 5% chance of error
                    reject(new Error('Network connection failed'));
                } else {
                    resolve({ success: true, message: 'Form submitted successfully' });
                }
            }, 2000); // Simulate 2-second network delay
        });
    }

    // Real-time validation feedback
    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });

        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    // Validate individual field
    function validateField(field) {
        let isValid = true;

        // Required field validation
        if (field.hasAttribute('required') && field.value.trim() === '') {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }

        // Email validation
        if (field.type === 'email' && field.value.trim() !== '') {
            if (!PlumbingUtils.isValidEmail(field.value)) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        }

        // Phone validation
        if (field.id === 'phone' && field.value.trim() !== '') {
            if (!PlumbingUtils.isValidPhone(field.value)) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        }

        // Message length validation
        if (field.id === 'message') {
            if (field.value.trim().length > 0 && field.value.trim().length < 10) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        }

        return isValid;
    }

    // Character counter for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        const maxLength = 1000;
        let counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.fontSize = '0.875rem';
        counter.style.color = '#6c757d';
        counter.style.marginTop = '0.5rem';
        counter.style.textAlign = 'right';

        messageField.parentElement.appendChild(counter);

        function updateCharacterCounter() {
            const remaining = maxLength - messageField.value.length;
            counter.textContent = `${messageField.value.length}/${maxLength} characters`;

            if (remaining < 100) {
                counter.style.color = '#fd7e14';
            }
            if (remaining < 50) {
                counter.style.color = '#dc3545';
            }
        }

        messageField.addEventListener('input', updateCharacterCounter);
        messageField.addEventListener('focus', updateCharacterCounter);
        updateCharacterCounter();
    }

    // Auto-save form data to localStorage
    const formFields = ['firstName', 'lastName', 'email', 'phone', 'message'];

    function saveFormData() {
        const formData = {};
        formFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field && field.value.trim() !== '') {
                formData[fieldName] = field.value;
            }
        });
        localStorage.setItem('plumbingContactFormData', JSON.stringify(formData));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('plumbingContactFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            formFields.forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (field && formData[fieldName]) {
                    field.value = formData[fieldName];
                }
            });
        }
    }

    // Load saved data on page load
    loadFormData();

    // Save data as user types
    formFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('input', PlumbingUtils.debounce(saveFormData, 1000));
        }
    });

    // Clear saved data on successful submission
    contactForm.addEventListener('submit', function() {
        localStorage.removeItem('plumbingContactFormData');
    });

    // Analytics tracking (placeholder for actual implementation)
    function trackFormSubmission(event, data) {
        console.log('Form submission tracked:', event, data);

        // Example: Google Analytics 4
        // gtag('event', event, {
        //     form_type: 'contact',
        //     service_type: data.serviceType,
        //     urgency_level: data.urgency
        // });

        // Example: Facebook Pixel
        // fbq('track', 'Lead', {
        //     content_name: 'Contact Form Submission',
        //     content_category: 'Plumbing Services'
        // });
    }

    // Helper function to hide form message
    function hideFormMessage() {
        if (formMessage) {
            formMessage.style.display = 'none';
        }
    }

    // Form reset handler
    const resetButton = contactForm.querySelector('button[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            hideFormMessage();

            // Clear any validation errors
            const inputs = contactForm.querySelectorAll('.error');
            inputs.forEach(input => input.classList.remove('error'));

            // Clear saved form data
            localStorage.removeItem('plumbingContactFormData');
        });
    }

    // Keyboard navigation for form
    contactForm.addEventListener('keydown', function(e) {
        // Submit form with Ctrl+Enter or Cmd+Enter
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            contactForm.dispatchEvent(new Event('submit'));
        }
    });

    console.log('Contact form functionality loaded');
});

// Form validation utilities
const FormValidation = {
    // Check if field is empty
    isEmpty: function(value) {
        return value.trim() === '';
    },

    // Validate email format
    isEmail: function(email) {
        return PlumbingUtils.isValidEmail(email);
    },

    // Validate phone number format
    isPhone: function(phone) {
        return PlumbingUtils.isValidPhone(phone);
    },

    // Check minimum length
    minLength: function(value, min) {
        return value.trim().length >= min;
    },

    // Check maximum length
    maxLength: function(value, max) {
        return value.trim().length <= max;
    },

    // Validate zip code (US format)
    isZipCode: function(zip) {
        const zipRegex = /^\d{5}(-\d{4})?$/;
        return zipRegex.test(zip);
    }
};
window.FormValidation = FormValidation;
