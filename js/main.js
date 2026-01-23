// main.js - AgenticAI Landing Page
import translations from './i18n.js';

// === Language Switcher ===
let currentLang = 'es';

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    localStorage.setItem('agenticai-lang', lang);
}

// === Smooth Scrolling ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// === Scroll Animations ===
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.stat-item, .about-card, .feature-card, .how-card, .community-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// === Mascot Float Animation ===
function initMascotAnimation() {
    const robot = document.querySelector('.robot-icon');
    if (!robot) return;
    
    let time = 0;
    function animate() {
        time += 0.02;
        robot.style.transform = `translateY(${Math.sin(time) * 10}px)`;
        requestAnimationFrame(animate);
    }
    animate();
}

// === Initialize ===
document.addEventListener('DOMContentLoaded', () => {
    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
    
    // Load saved language
    const saved = localStorage.getItem('agenticai-lang');
    if (saved && translations[saved]) {
        setLanguage(saved);
    }
    
    // Init features
    initSmoothScroll();
    initScrollAnimations();
    initMascotAnimation();
});
