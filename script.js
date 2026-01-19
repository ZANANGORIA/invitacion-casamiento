// ===== PARTÍCULAS DORADAS =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        particle.style.left = Math.random() * 100 + '%';

        const size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particle.style.animationDelay = Math.random() * 18 + 's';
        particle.style.animationDuration = (Math.random() * 8 + 14) + 's';

        container.appendChild(particle);
    }
}

// ===== ANIMACIÓN AL SCROLL =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.event-card, .ticket-box, .experience-text, .confirm-btn');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ===== PARALLAX SUTIL EN HERO =====
function parallaxEffect() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroHeight = window.innerHeight;

                if (scrolled < heroHeight) {
                    const rate = scrolled * 0.25;
                    heroContent.style.transform = `translateY(${rate}px)`;
                    heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.6;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ===== BOTÓN CONFIRMAR =====
function setupConfirmButton() {
    const btn = document.getElementById('confirmBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        // Placeholder: aquí se puede agregar lógica de confirmación
        // Por ahora muestra un mensaje
        alert('¡Gracias! Próximamente habilitaremos la confirmación online.');
    });
}

// ===== ESTILOS DINÁMICOS =====
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    createParticles();
    animateOnScroll();
    parallaxEffect();
    setupConfirmButton();
});
