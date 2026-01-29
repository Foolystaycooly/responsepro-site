// Lead Form Submission Handler
// This script simulates form submission and data encryption for carrier approval demonstration

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('leadForm');
        const confirmationMessage = document.getElementById('confirmationMessage');
        const encryptedDataDiv = document.getElementById('encryptedData');
        const encryptedContent = document.getElementById('encryptedContent');

        if (!form) return;

        // Form validation functions
        function validateRequired(input) {
            const value = input.value.trim();
            if (value === '') {
                return 'This field is required.';
            }
            return '';
        }

        function validateEmail(input) {
            const value = input.value.trim();
            if (value === '') return ''; // Optional field
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Please enter a valid email address.';
            }
            return '';
        }

        function validatePhone(input) {
            const value = input.value.trim();
            if (value === '') {
                return 'Phone number is required.';
            }
            
            // Remove all non-numeric characters
            const numbersOnly = value.replace(/\D/g, '');
            if (numbersOnly.length < 10) {
                return 'Please enter a valid phone number.';
            }
            return '';
        }

        function showError(inputId, message) {
            const input = document.getElementById(inputId);
            const errorSpan = document.getElementById(inputId + 'Error');
            
            if (input && errorSpan) {
                input.classList.add('error');
                errorSpan.textContent = message;
            }
        }

        function clearError(inputId) {
            const input = document.getElementById(inputId);
            const errorSpan = document.getElementById(inputId + 'Error');
            
            if (input && errorSpan) {
                input.classList.remove('error');
                errorSpan.textContent = '';
            }
        }

        // Real-time validation on blur
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const transactionalConsent = document.getElementById('transactionalConsent');

        if (firstName) {
            firstName.addEventListener('blur', function() {
                const error = validateRequired(this);
                if (error) {
                    showError('firstName', error);
                } else {
                    clearError('firstName');
                }
            });
        }

        if (lastName) {
            lastName.addEventListener('blur', function() {
                const error = validateRequired(this);
                if (error) {
                    showError('lastName', error);
                } else {
                    clearError('lastName');
                }
            });
        }

        if (email) {
            email.addEventListener('blur', function() {
                const error = validateEmail(this);
                if (error) {
                    showError('email', error);
                } else {
                    clearError('email');
                }
            });
        }

        if (phone) {
            phone.addEventListener('blur', function() {
                const error = validatePhone(this);
                if (error) {
                    showError('phone', error);
                } else {
                    clearError('phone');
                }
            });
        }

        // Form submission handler
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear all previous errors
            clearError('firstName');
            clearError('lastName');
            clearError('email');
            clearError('phone');

            // Validate all fields
            let isValid = true;
            let firstErrorField = null;

            const firstNameError = validateRequired(firstName);
            if (firstNameError) {
                showError('firstName', firstNameError);
                isValid = false;
                if (!firstErrorField) firstErrorField = firstName;
            }

            const lastNameError = validateRequired(lastName);
            if (lastNameError) {
                showError('lastName', lastNameError);
                isValid = false;
                if (!firstErrorField) firstErrorField = lastName;
            }

            const emailError = validateEmail(email);
            if (emailError) {
                showError('email', emailError);
                isValid = false;
                if (!firstErrorField) firstErrorField = email;
            }

            const phoneError = validatePhone(phone);
            if (phoneError) {
                showError('phone', phoneError);
                isValid = false;
                if (!firstErrorField) firstErrorField = phone;
            }

            // Consent checkboxes are NOT validated - they only record user preference

            // If validation fails, focus on first error
            if (!isValid) {
                if (firstErrorField) {
                    firstErrorField.focus();
                }
                return;
            }

            // Collect form data
            const formData = {
                firstName: firstName.value.trim(),
                lastName: lastName.value.trim(),
                email: email.value.trim() || 'Not provided',
                phone: phone.value.trim(),
                transactionalConsent: transactionalConsent.checked,
                marketingConsent: document.getElementById('marketingConsent').checked,
                timestamp: new Date().toISOString(),
                ipAddress: 'Simulated: 192.168.1.1'
            };

            // Simulate secure data handling using Base64 encoding
            const jsonString = JSON.stringify(formData, null, 2);
            const encodedData = btoa(jsonString);

            // Display encrypted data for carrier verification
            if (encryptedContent) {
                encryptedContent.textContent = encodedData;
            }

            // Hide form and show confirmation
            form.style.display = 'none';
            if (confirmationMessage) {
                confirmationMessage.style.display = 'block';
            }
            if (encryptedDataDiv) {
                encryptedDataDiv.style.display = 'block';
            }

            // Scroll to confirmation message
            confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Log to console for development/demonstration
            console.log('Form submitted successfully');
            console.log('Original data:', formData);
            console.log('Encoded data (Base64):', encodedData);
            console.log('Note: In production, data would be encrypted with AES-256 and transmitted via HTTPS');
        });
    });
})();