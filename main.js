document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle Logic
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Hide the mobile menu when a link is clicked
            mobileMenu.classList.add('hidden');
        });
    });

    // 2. Intersection Observer for Fade-In Effect
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing once the element is visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        // Trigger when 10% of the section is visible
        threshold: 0.1 
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // 3. Vanilla-Tilt Initialization (if the script is loaded)
    // Check if VanillaTilt is available before calling init
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.05
        });
    } else {
        console.warn("VanillaTilt library not loaded. Project card tilt effect disabled.");
    }
});