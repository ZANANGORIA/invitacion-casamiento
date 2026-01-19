// ===== PARTÍCULAS DORADAS =====
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Posición horizontal aleatoria
        particle.style.left = Math.random() * 100 + '%';

        // Tamaño aleatorio
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Delay aleatorio para que no empiecen todas juntas
        particle.style.animationDelay = Math.random() * 15 + 's';

        // Duración aleatoria
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

        container.appendChild(particle);
    }
}

// ===== ANIMACIÓN AL HACER SCROLL =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.event-card, .ticket-box, .quote, .description');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== EFECTO PARALLAX SUTIL EN EL HERO =====
function parallaxEffect() {
    const hero = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });
}

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateOnScroll();
    parallaxEffect();
});
