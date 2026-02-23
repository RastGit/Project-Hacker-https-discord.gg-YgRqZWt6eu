// script.js

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll dla nawigacji
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });

            // Ustaw active class
            document.querySelectorAll('.navbar a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Ustaw initial active na podstawie hash
    if (window.location.hash) {
        const activeLink = document.querySelector(`.navbar a[href="${window.location.hash}"]`);
        if (activeLink) {
            document.querySelectorAll('.navbar a').forEach(a => a.classList.remove('active'));
            activeLink.classList.add('active');
        }
    }
});

// Dla optymalizacji: możesz minifikować ten plik ręcznie lub użyć narzędzi jak UglifyJS
