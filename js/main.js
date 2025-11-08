document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const isExpanded = mainNav.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            mobileMenuToggle.textContent = isExpanded ? '✕' : '☰';
        });
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mainNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.textContent = '☰';
            }
        });
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.textContent = '☰';
            });
        });
    }
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
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
                history.pushState(null, null, href);
            }
        });
    });
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
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 10) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        lastScrollTop = scrollTop;
    });
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
    const animateElements = document.querySelectorAll('.card, .testimonial-card, .team-member, .service-overview-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone call clicked:', this.getAttribute('href'));
        });
    });
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Email clicked:', this.getAttribute('href'));
        });
    });
    const urlParams = new URLSearchParams(window.location.search);
    const serviceType = urlParams.get('service');
    if (serviceType) {
        const serviceSelect = document.getElementById('serviceType');
        if (serviceSelect) {
            serviceSelect.value = serviceType;
        }
    }
    const emergencyButtons = document.querySelectorAll('.emergency-cta .btn-primary');
    emergencyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
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
                    const serviceSelect = document.getElementById('serviceType');
                    if (serviceSelect) {
                        serviceSelect.value = 'emergency';
                    }
                    const firstInput = contactForm.querySelector('input');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }
            }
        });
    });
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.hasAttribute('required') && this.value.trim() === '') {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
    const currentYearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    currentYearElements.forEach(element => {
        element.textContent = currentYear;
    });
    const printButtons = document.querySelectorAll('.print-button');
    printButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    });
    function enhanceAccessibility() {
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (!button.textContent.trim()) {
                button.setAttribute('aria-label', 'Menu toggle');
            }
        });
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
        interactiveElements.forEach(element => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
        });
    }
    enhanceAccessibility();
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
    console.log('Teknikar Plumbing website loaded successfully');
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);

    });
});
const PlumbingUtils = {
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
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    isValidPhone: function(phone) {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        return phoneRegex.test(phone);
    },
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
window.PlumbingUtils = PlumbingUtils;
