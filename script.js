// ===== SISTEMA DE PARTÃCULAS DINÃMICO =====
let particles = [];
let scrollY = window.pageYOffset;
let scrollVelocity = 0;
let lastTime = performance.now();

class Particle {
    constructor(container) {
        this.element = document.createElement('div');
        this.element.className = 'particle';
        container.appendChild(this.element);

        // DistribuciÃ³n totalmente orgÃ¡nica en todo el documento
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * (document.body.scrollHeight + window.innerHeight);

        // Velocidades con mucha variaciÃ³n para evitar sincronizaciÃ³n
        this.velocityY = -(0.05 + Math.random() * 0.25); // Rango amplio
        this.velocityX = (Math.random() - 0.5) * 0.25; // Deriva variable

        // Cada partÃ­cula tiene comportamiento Ãºnico
        this.scrollInfluence = 0.2 + Math.random() * 0.6; // Gran variaciÃ³n
        this.velocityDamping = 0.96 + Math.random() * 0.04; // FricciÃ³n variable

        // Delay temporal Ãºnico para desfase
        this.updateDelay = Math.random() * 100; // 0-100ms de desfase
        this.lastUpdateTime = 0;

        // Propiedades visuales variadas
        this.size = 3 + Math.random() * 4.5; // TamaÃ±os mÃ¡s variados
        this.opacity = 0;
        this.targetOpacity = 0;

        // Twinkle desincronizado
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.twinkleSpeed = 0.008 + Math.random() * 0.022; // MÃ¡s variaciÃ³n

        this.element.style.width = this.size + 'px';
        this.element.style.height = this.size + 'px';
    }

    regenerate(currentScrollY, direction) {
        // RegeneraciÃ³n totalmente aleatoria (no valores fijos)
        const randomOffset = 150 + Math.random() * 350; // Offset variable 150-500px

        if (direction === 'top') {
            this.y = currentScrollY + window.innerHeight + randomOffset;
        } else {
            this.y = currentScrollY - randomOffset;
        }

        // Nueva posiciÃ³n X completamente aleatoria
        this.x = Math.random() * window.innerWidth;

        // Nuevas velocidades aleatorias en cada regeneraciÃ³n
        this.velocityY = -(0.05 + Math.random() * 0.25);
        this.velocityX = (Math.random() - 0.5) * 0.25;

        // Reset de opacidad para fade suave
        this.opacity = 0;
    }

    update(deltaTime, currentScrollY, scrollVel, currentTime) {
        // Desfase temporal para evitar sincronizaciÃ³n
        if (currentTime - this.lastUpdateTime < this.updateDelay) {
            return;
        }
        this.lastUpdateTime = currentTime;

        // Influencia del scroll en velocidad con variaciÃ³n
        const scrollInfluenceY = scrollVel * this.scrollInfluence;
        this.velocityY += scrollInfluenceY * (0.01 + Math.random() * 0.01);

        // PequeÃ±as turbulencias aleatorias para romper patrones
        this.velocityX += (Math.random() - 0.5) * 0.005;
        this.velocityY += (Math.random() - 0.5) * 0.003;

        // Aplicar velocidades
        this.y += this.velocityY * deltaTime * 0.06;
        this.x += this.velocityX * deltaTime * 0.06;

        // FricciÃ³n variable
        this.velocityY *= this.velocityDamping;
        this.velocityX *= this.velocityDamping;

        // Velocidad mÃ­nima flotante (con variaciÃ³n)
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

        // InterpolaciÃ³n de opacidad
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

    // Limpiar partÃ­culas existentes
    container.innerHTML = '';
    particles = [];

    const particleCount = 90;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(container));
    }
}

// Loop principal de animaciÃ³n
function animateParticles(currentTime) {
    const deltaTime = Math.min(currentTime - lastTime, 100);
    lastTime = currentTime;

    const currentScrollY = window.pageYOffset;
    const scrollDelta = currentScrollY - scrollY;

    // Actualizar velocidad de scroll con suavizado
    scrollVelocity += (scrollDelta - scrollVelocity) * 0.12;
    scrollY = currentScrollY;

    // Actualizar cada partÃ­cula con currentTime
    particles.forEach(particle => {
        particle.update(deltaTime, currentScrollY, scrollVelocity, currentTime);
    });

    requestAnimationFrame(animateParticles);
}

// Recrear al cambiar tamaÃ±o
window.addEventListener('resize', () => {
    createParticles();
});

// ... existing code ...

// ===== ESTILOS DINÃMICOS =====
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0.85; /* Casi visible desde el inicio */
            transform: translateY(12px) scale(0.98); /* Recorrido mÃ¡s corto */
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

// ===== ANIMACIÃ“N GALERÃA =====
// ===== CARRUSEL AUTOMÃTICO =====
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (!slides.length) return;

    let currentSlide = 0;
    const intervalTime = 3000; // 3 segundos por set

    function nextSlide() {
        // Retirar clase active del actual
        slides[currentSlide].classList.remove('active');

        // Calcular siguiente Ã­ndice
        currentSlide = (currentSlide + 1) % slides.length;

        // Activar siguiente
        slides[currentSlide].classList.add('active');
    }

    // Iniciar intervalo automÃ¡tico
    // No guardamos el ID porque no lo detenemos (diseÃ±o "always active")
    setInterval(nextSlide, intervalTime);
}

// ===== ANIMACIÃ“N AL SCROLL =====
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

// ===== AUTO-SHIMMER BOTÃ“N (Solo confirmar) =====
function autoShimmerButton() {
    const btn = document.getElementById('confirmBtn'); // Solo el botÃ³n principal
    if (!btn) return;

    setInterval(() => {
        btn.classList.add('auto-shimmer');
        setTimeout(() => btn.classList.remove('auto-shimmer'), 1000);
    }, 9000);
}

// ===== BOTÃ“N AGENDAR CALENDARIO =====
function initCalendarBtn() {
    const btn = document.getElementById('calendarBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const icsLines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//MayraGabriel//Boda//ES',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            'UID:recordatorio-sep-2026@invitacion',
            'DTSTAMP:20260101T000000Z',
            'SUMMARY:Recordatorio - Casamiento Mayra y Gabriel',
            'DTSTART;VALUE=DATE:20260901',
            'DTEND;VALUE=DATE:20260902',
            'DESCRIPTION:Despues de muchos anios compartidos decidimos dar este paso. Si todavia no confirmaste tu asistencia podes hacerlo desde la invitacion.',
            'STATUS:CONFIRMED',
            'SEQUENCE:0',
            'END:VEVENT',
            'BEGIN:VEVENT',
            'UID:casamiento-oct-2026@invitacion',
            'DTSTAMP:20260101T000000Z',
            'SUMMARY:Casamiento de Mayra y Gabriel',
            'DTSTART;VALUE=DATE:20261010',
            'DTEND;VALUE=DATE:20261011',
            'LOCATION:Iglesia y Salon',
            'DESCRIPTION:Hoy celebramos. Gracias por ser parte de este dia tan importante. Nos vemos para compartir una noche inolvidable.',
            'STATUS:CONFIRMED',
            'SEQUENCE:0',
            'END:VEVENT',
            'END:VCALENDAR'
        ];

        const icsContent = icsLines.join('\r\n');
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'casamiento_mayra_gabriel.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
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
    initCalendarBtn();
});
