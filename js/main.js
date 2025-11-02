// Teknikar Plumbing - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');

            // Update aria-expanded for accessibility
            const isExpanded = mainNav.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);

            // Change icon based on state
            mobileMenuToggle.textContent = isExpanded ? '✕' : '☰';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mainNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.textContent = '☰';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.textContent = '☰';
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without reloading the page
                history.pushState(null, null, href);
            }
        });
    });

    // Active Navigation Highlighting
    function updateActiveNavigation() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';

        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.classList.remove('active');

            const linkPath = link.getAttribute('href');
            if (linkPath === currentPage) {
                link.classList.add('active');
            } else if (currentPage === '' && linkPath === 'index.html') {
                link.classList.add('active');
            }
        });
    }

    updateActiveNavigation();

    // Scroll Effects
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove shadow on scroll
        if (scrollTop > 10) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }

        lastScrollTop = scrollTop;
    });

    // Fade-in Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .testimonial-card, .team-member, .service-overview-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Phone Number Click Tracking (for analytics)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone call clicks (for analytics implementation)
            console.log('Phone call clicked:', this.getAttribute('href'));

            // You could add Google Analytics event tracking here:
            // gtag('event', 'phone_click', { phone_number: this.getAttribute('href') });
        });
    });

    // Email Link Click Tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Email clicked:', this.getAttribute('href'));

            // Track email clicks (for analytics implementation)
            // gtag('event', 'email_click', { email_address: this.getAttribute('href') });
        });
    });

    // Service Type Form Auto-focus
    const urlParams = new URLSearchParams(window.location.search);
    const serviceType = urlParams.get('service');

    if (serviceType) {
        const serviceSelect = document.getElementById('serviceType');
        if (serviceSelect) {
            serviceSelect.value = serviceType;
        }
    }

    // Emergency Button Auto-scroll to Contact Form
    const emergencyButtons = document.querySelectorAll('.emergency-cta .btn-primary');
    emergencyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Check if we're on the contact page
            if (window.location.pathname.includes('contact.html')) {
                e.preventDefault();
                const contactForm = document.getElementById('contactForm');
                if (contactForm) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const formPosition = contactForm.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: formPosition,
                        behavior: 'smooth'
                    });

                    // Auto-select emergency service type
                    const serviceSelect = document.getElementById('serviceType');
                    if (serviceSelect) {
                        serviceSelect.value = 'emergency';
                    }

                    // Focus on first form field
                    const firstInput = contactForm.querySelector('input');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }
            }
        });
    });

    // Form Field Validation Feedback
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        // Add visual feedback on focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');

            // Basic validation feedback
            if (this.hasAttribute('required') && this.value.trim() === '') {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });

        // Clear error on input
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });

    // Copy Current Year for Copyright
    const currentYearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    currentYearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // Print Functionality
    const printButtons = document.querySelectorAll('.print-button');
    printButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    });

    // Accessibility Enhancements
    function enhanceAccessibility() {
        // Add proper ARIA labels to elements that might need them
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (!button.textContent.trim()) {
                button.setAttribute('aria-label', 'Menu toggle');
            }
        });

        // Ensure all interactive elements are keyboard accessible
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
        interactiveElements.forEach(element => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
        });
    }

    enhanceAccessibility();

    // Performance Optimization - Lazy Loading for Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Console Message (remove in production)
    console.log('Teknikar Plumbing website loaded successfully');

    // Error Handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // You could send this to an error tracking service
    });

});

// Utility Functions
const PlumbingUtils = {

    // Format phone number as user types
    formatPhoneNumber: function(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        input.value = value;
    },

    // Validate email format
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate phone number format
    isValidPhone: function(phone) {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        return phoneRegex.test(phone);
    },

    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Make utils available globally
window.PlumbingUtils = PlumbingUtils;