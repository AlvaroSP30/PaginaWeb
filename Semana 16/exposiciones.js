document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navBar = document.querySelector('nav');
            const navHeight = navBar ? navBar.offsetHeight : 0; // Get nav height, default to 0 if not found

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight - 20, // Adjust for fixed nav bar height and add a little extra padding
                    behavior: 'smooth' // Enable smooth scrolling
                });
            }
        });
    });

    // Optional: Add a sticky navigation bar effect
    const navbar = document.querySelector('nav');
    const heroHeader = document.querySelector('header');
    const stickyPoint = heroHeader ? heroHeader.offsetHeight / 2 : 0; // Make navbar sticky after scrolling half of the header

    if (navbar && heroHeader) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > stickyPoint) {
                navbar.classList.add('sticky-nav'); // Add a class for sticky styles
                navbar.classList.add('shadow-lg'); // Add shadow for better visual separation
            } else {
                navbar.classList.remove('sticky-nav');
                navbar.classList.remove('shadow-lg');
            }
        });
    }
});