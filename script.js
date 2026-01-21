// ===== SISTEMA DE PARTÍCULAS DINÁMICO =====
let particles = [];
let scrollY = window.pageYOffset;
let scrollVelocity = 0;
let lastTime = performance.now();

class Particle {
    constructor(container) {
        this.element = document.createElement('div');
        this.element.className = 'particle';
        container.appendChild(this.element);

        // Distribución totalmente orgánica en todo el documento
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * (document.body.scrollHeight + window.innerHeight);

        // Velocidades con mucha variación para evitar sincronización
        this.velocityY = -(0.05 + Math.random() * 0.25); // Rango amplio
        this.velocityX = (Math.random() - 0.5) * 0.25; // Deriva variable

        // Cada partícula tiene comportamiento único
        this.scrollInfluence = 0.2 + Math.random() * 0.6; // Gran variación
        this.velocityDamping = 0.96 + Math.random() * 0.04; // Fricción variable

        // Delay temporal único para desfase
        this.updateDelay = Math.random() * 100; // 0-100ms de desfase
        this.lastUpdateTime = 0;

        // Propiedades visuales variadas
        this.size = 3 + Math.random() * 4.5; // Tamaños más variados
        this.opacity = 0;
        this.targetOpacity = 0;

        // Twinkle desincronizado
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.twinkleSpeed = 0.008 + Math.random() * 0.022; // Más variación

        this.element.style.width = this.size + 'px';
        this.element.style.height = this.size + 'px';
    }

    regenerate(currentScrollY, direction) {
        // Regeneración totalmente aleatoria (no valores fijos)
        const randomOffset = 150 + Math.random() * 350; // Offset variable 150-500px

        if (direction === 'top') {
            this.y = currentScrollY + window.innerHeight + randomOffset;
        } else {
            this.y = currentScrollY - randomOffset;
        }

        // Nueva posición X completamente aleatoria
        this.x = Math.random() * window.innerWidth;

        // Nuevas velocidades aleatorias en cada regeneración
        this.velocityY = -(0.05 + Math.random() * 0.25);
        this.velocityX = (Math.random() - 0.5) * 0.25;

        // Reset de opacidad para fade suave
        this.opacity = 0;
    }

    update(deltaTime, currentScrollY, scrollVel, currentTime) {
        // Desfase temporal para evitar sincronización
        if (currentTime - this.lastUpdateTime < this.updateDelay) {
            return;
        }
        this.lastUpdateTime = currentTime;

        // Influencia del scroll en velocidad con variación
        const scrollInfluenceY = scrollVel * this.scrollInfluence;
        this.velocityY += scrollInfluenceY * (0.01 + Math.random() * 0.01);

        // Pequeñas turbulencias aleatorias para romper patrones
        this.velocityX += (Math.random() - 0.5) * 0.005;
        this.velocityY += (Math.random() - 0.5) * 0.003;

        // Aplicar velocidades
        this.y += this.velocityY * deltaTime * 0.06;
        this.x += this.velocityX * deltaTime * 0.06;

        // Fricción variable
        this.velocityY *= this.velocityDamping;
        this.velocityX *= this.velocityDamping;

        // Velocidad mínima flotante (con variación)
        if (Math.abs(this.velocityY) < 0.05) {
            this.velocityY = -(0.06 + Math.random() * 0.08);
        }

        // Wrapping con rangos variables (no valores fijos)
        const topMargin = 300 + Math.random() * 200;
        const bottomMargin = 300 + Math.random() * 200;

        if (this.y < currentScrollY - topMargin) {
            this.regenerate(currentScrollY, 'top');
        }

        if (this.y > currentScrollY + window.innerHeight + bottomMargin) {
            this.regenerate(currentScrollY, 'bottom');
        }

        // Wrapping horizontal suave
        if (this.x < -50) this.x = window.innerWidth + 50;
        if (this.x > window.innerWidth + 50) this.x = -50;

        // Opacidad basada en viewport con margen variable
        const margin = 200 + Math.random() * 100;
        const viewportTop = currentScrollY - margin;
        const viewportBottom = currentScrollY + window.innerHeight + margin;
        const inViewport = this.y >= viewportTop && this.y <= viewportBottom;

        this.targetOpacity = inViewport ? (0.6 + Math.random() * 0.25) : 0;

        // Twinkle
        this.twinklePhase += this.twinkleSpeed;
        const twinkleFactor = Math.sin(this.twinklePhase) * 0.3 + 0.7;

        // Interpolación de opacidad
        this.opacity += (this.targetOpacity - this.opacity) * 0.06;

        // Renderizar
        const screenY = this.y - currentScrollY;
        this.element.style.transform = `translate(${this.x}px, ${screenY}px)`;
        this.element.style.opacity = Math.min(this.opacity * twinkleFactor, 1);
    }
}

function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    // Limpiar partículas existentes
    container.innerHTML = '';
    particles = [];

    const particleCount = 90;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(container));
    }
}

// Loop principal de animación
function animateParticles(currentTime) {
    const deltaTime = Math.min(currentTime - lastTime, 100);
    lastTime = currentTime;

    const currentScrollY = window.pageYOffset;
    const scrollDelta = currentScrollY - scrollY;

    // Actualizar velocidad de scroll con suavizado
    scrollVelocity += (scrollDelta - scrollVelocity) * 0.12;
    scrollY = currentScrollY;

    // Actualizar cada partícula con currentTime
    particles.forEach(particle => {
        particle.update(deltaTime, currentScrollY, scrollVelocity, currentTime);
    });

    requestAnimationFrame(animateParticles);
}

// Recrear al cambiar tamaño
window.addEventListener('resize', () => {
    createParticles();
});

// ... existing code ...

// ===== ESTILOS DINÁMICOS =====
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0.85; /* Casi visible desde el inicio */
            transform: translateY(12px) scale(0.98); /* Recorrido más corto */
            transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: opacity, transform;
        }
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    `;
    document.head.appendChild(style);
}

// ===== CUENTA REGRESIVA =====
function initCountdown() {
    const targetDate = new Date('2026-10-10T00:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            daysEl.textContent = '0';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days;
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== ANIMACIÓN GALERÍA =====
// ===== CARRUSEL AUTOMÁTICO =====
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (!slides.length) return;

    let currentSlide = 0;
    const intervalTime = 3000; // 3 segundos por set

    function nextSlide() {
        // Retirar clase active del actual
        slides[currentSlide].classList.remove('active');

        // Calcular siguiente índice
        currentSlide = (currentSlide + 1) % slides.length;

        // Activar siguiente
        slides[currentSlide].classList.add('active');
    }

    // Iniciar intervalo automático
    // No guardamos el ID porque no lo detenemos (diseño "always active")
    setInterval(nextSlide, intervalTime);
}

// ===== ANIMACIÓN AL SCROLL =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.event-card, .ticket-box, .experience-text, .confirm-btn, .participation-content');

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
                    const rate = scrolled * 0.6;
                    const blur = Math.min(scrolled / 100, 3);
                    heroContent.style.transform = `translateY(${rate}px)`;
                    heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.85;
                    heroContent.style.filter = `blur(${blur}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}



// ===== COPIAR ALIAS =====
function initCopyAlias() {
    const aliasBtn = document.getElementById('aliasBtn');
    const feedback = document.getElementById('copyFeedback');

    if (!aliasBtn || !feedback) return;

    aliasBtn.addEventListener('click', async () => {
        const aliasText = 'aguilera.gabriel22';

        try {
            await navigator.clipboard.writeText(aliasText);

            feedback.classList.add('show');
            setTimeout(() => {
                feedback.classList.remove('show');
            }, 2000);

        } catch (err) {
            console.error('Error al copiar:', err);
            const textArea = document.createElement("textarea");
            textArea.value = aliasText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);

            feedback.classList.add('show');
            setTimeout(() => {
                feedback.classList.remove('show');
            }, 2000);
        }
    });
}

// ===== AUTO-SHIMMER BOTÓN =====
function autoShimmerButton() {
    const btn = document.querySelector('.confirm-btn');
    if (!btn) return;

    setInterval(() => {
        btn.classList.add('auto-shimmer');
        setTimeout(() => btn.classList.remove('auto-shimmer'), 1000);
    }, 9000);
}

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    createParticles();
    animateParticles(performance.now());
    initCountdown();
    initCarousel();
    animateOnScroll();
    parallaxEffect();
    initCopyAlias();
    autoShimmerButton();
});
