document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentActive = document.querySelector('.accordion-header.active');
            
            // Close already active tab if it's not the clicked one
            if (currentActive && currentActive !== header) {
                currentActive.classList.remove('active');
                if (currentActive.nextElementSibling) {
                    currentActive.nextElementSibling.style.maxHeight = null;
                    currentActive.nextElementSibling.style.padding = '0 2rem';
                }
            }

            // Toggle clicked tab
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            
            if (content) {
                if (header.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                    content.style.padding = '1.5rem 2rem';
                } else {
                    content.style.maxHeight = null;
                    content.style.padding = '0 2rem';
                }
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(7, 7, 7, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
            } else {
                navbar.style.background = 'rgba(7, 7, 7, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
});
