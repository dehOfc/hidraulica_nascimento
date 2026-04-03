// Force scroll to top and clear hash on refresh
if (window.location.hash) {
    window.history.replaceState(null, null, window.location.pathname + window.location.search);
}
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
setTimeout(() => window.scrollTo(0, 0), 50);

document.addEventListener('DOMContentLoaded', () => {
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
                    content.style.padding = '1.5rem 2rem';
                    // Adiciona um valor extra para garantir que texto da segunda linha ou margens não fiquem escondidos
                    content.style.maxHeight = content.scrollHeight + 60 + "px";
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
                navbar.style.background = 'rgba(255, 255, 255, 0.90)';
                navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.85)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
});
