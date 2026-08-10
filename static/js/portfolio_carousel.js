document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-carousel').forEach((carousel) => {
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let current = slides.findIndex((s) => s.classList.contains('active'));
        if (current === -1) current = 0;

        let hovering = false;
        let autoplayTimer = null;
        const interval = parseInt(carousel.dataset.autoplay, 10) || 0;

        function goTo(index) {
            slides[current].classList.remove('active');
            dots[current]?.classList.remove('active');
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active');
            dots[current]?.classList.add('active');
            resetAutoplay();
        }

        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }

        prevBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            prev();
        });

        nextBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            next();
        });

        dots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                goTo(parseInt(dot.dataset.index, 10));
            });
        });

        function startAutoplay() {
            if (hovering || autoplayTimer !== null) return;
            if (interval > 0 && slides.length > 1) {
                autoplayTimer = setInterval(next, interval);
            }
        }

        function stopAutoplay() {
            if (autoplayTimer !== null) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        carousel.addEventListener('mouseenter', () => {
            hovering = true;
            stopAutoplay();
        });

        carousel.addEventListener('mouseleave', () => {
            hovering = false;
            startAutoplay();
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopAutoplay();
            else startAutoplay();
        });

        startAutoplay();
    });
});