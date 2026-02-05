// Advanced Portfolio Script with 40+ Animations

// Configuration
const CONFIG = {
    debug: false,
    preloaderDuration: 2000, // 2 seconds
    animationDelay: 100,
    scrollThreshold: 0.2,
    magneticStrength: 0.2,
    particleCount: 100,
    sparkleCount: 20
};

// State Management
const STATE = {
    isLoaded: false,
    isScrolling: false,
    lastScroll: 0,
    scrollDirection: 'down',
    mousePosition: { x: 0, y: 0 },
    cursorPosition: { x: 0, y: 0 },
    activeSection: 'home',
    theme: 'dark'
};

// DOM Elements Cache
const DOM = {
    preloader: null,
    cursor: null,
    cursorTrail: null,
    cursorSparkles: null,
    particlesCanvas: null,
    navbar: null,
    progressRing: null,
    contactForm: null,
    backToTop: null
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Portfolio...');
    
    // Cache DOM elements
    cacheDOMElements();
    
    // Initialize modules
    initPreloader();
    initCustomCursor();
    initParticles();
    initMagneticElements();
    initScrollAnimations();
    initCounters();
    initSkillBars();
    initPortfolioFilter();
    initContactForm();
    initThemeToggle();
    initBackToTop();
    initAOS();
    initFireworks();
    
    // Start animations
    setTimeout(() => {
        initFloatingElements();
        initHoverEffects();
        initParallax();
        initTypingEffect();
    }, 500);
    
    console.log('✅ Portfolio initialized successfully!');
});

// Cache DOM Elements
function cacheDOMElements() {
    DOM.preloader = document.getElementById('preloader');
    DOM.cursor = document.getElementById('cursor');
    DOM.cursorTrail = document.querySelector('.cursor-trail');
    DOM.cursorSparkles = document.querySelector('.cursor-sparkles');
    DOM.particlesCanvas = document.getElementById('particlesCanvas');
    DOM.navbar = document.getElementById('navbar');
    DOM.progressRing = document.querySelector('.progress-ring-circle');
    DOM.contactForm = document.getElementById('contactForm');
    DOM.backToTop = document.getElementById('backToTop');
}

// ===== PRELOADER =====
function initPreloader() {
    if (!DOM.preloader) return;
    
    const loadingFill = document.getElementById('loadingFill');
    const loadingText = document.getElementById('loadingText');
    const progressBar = DOM.preloader.querySelector('.loading-bar');
    
    let progress = 0;
    const texts = [
        "Loading awesome experience...",
        "Initializing animations...",
        "Preparing portfolio...",
        "Almost there...",
        "Welcome!"
    ];
    
    // Create preloader particles
    createPreloaderParticles();
    
    // Simulate loading progress
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Final animations before hiding
            setTimeout(() => {
                loadingText.textContent = texts[4];
                progressBar.style.transform = 'scaleY(2)';
                
                setTimeout(() => {
                    DOM.preloader.style.opacity = '0';
                    DOM.preloader.style.visibility = 'hidden';
                    STATE.isLoaded = true;
                    
                    // Start post-load animations
                    startPostLoadAnimations();
                }, 500);
            }, 300);
        }
        
        loadingFill.style.width = `${progress}%`;
        
        // Update loading text
        if (progress < 20) loadingText.textContent = texts[0];
        else if (progress < 40) loadingText.textContent = texts[1];
        else if (progress < 60) loadingText.textContent = texts[2];
        else if (progress < 80) loadingText.textContent = texts[3];
        
    }, 50);
}

function createPreloaderParticles() {
    const container = document.getElementById('preloaderParticles');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'preloader-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 2}px;
            height: ${Math.random() * 10 + 2}px;
            background: var(--primary);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: preloaderParticle ${Math.random() * 10 + 5}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes preloaderParticle {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.5;
            }
            50% {
                transform: translateY(-100px) rotate(180deg);
                opacity: 0.2;
            }
            100% {
                transform: translateY(0) rotate(360deg);
                opacity: 0.5;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    if (!DOM.cursor) return;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        STATE.mousePosition.x = e.clientX;
        STATE.mousePosition.y = e.clientY;
        
        // Update cursor position with smoothing
        STATE.cursorPosition.x += (e.clientX - STATE.cursorPosition.x) * 0.1;
        STATE.cursorPosition.y += (e.clientY - STATE.cursorPosition.y) * 0.1;
        
        DOM.cursor.style.left = `${STATE.cursorPosition.x}px`;
        DOM.cursor.style.top = `${STATE.cursorPosition.y}px`;
        
        // Update cursor trail with more smoothing
        if (DOM.cursorTrail) {
            setTimeout(() => {
                DOM.cursorTrail.style.left = `${STATE.cursorPosition.x}px`;
                DOM.cursorTrail.style.top = `${STATE.cursorPosition.y}px`;
            }, 50);
        }
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        DOM.cursor.classList.add('click');
        createClickRipple();
    });
    
    document.addEventListener('mouseup', () => {
        DOM.cursor.classList.remove('click');
    });
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, [data-magnetic], .project-card, .info-card, .skill-category');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            DOM.cursor.classList.add('hover');
            createSparkles();
        });
        
        el.addEventListener('mouseleave', () => {
            DOM.cursor.classList.remove('hover');
        });
    });
    
    // Cursor animation loop
    function updateCursor() {
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
}

function createClickRipple() {
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.cssText = `
        position: fixed;
        width: 50px;
        height: 50px;
        border: 2px solid var(--primary);
        border-radius: 50%;
        left: ${STATE.mousePosition.x - 25}px;
        top: ${STATE.mousePosition.y - 25}px;
        pointer-events: none;
        z-index: 9997;
        animation: rippleExpand 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
    
    // Add animation
    const style = document.createElement('style');
    if (!document.querySelector('#ripple-animation')) {
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes rippleExpand {
                0% {
                    transform: scale(0.5);
                    opacity: 1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createSparkles() {
    if (!DOM.cursorSparkles) return;
    
    for (let i = 0; i < CONFIG.sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 20;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const duration = Math.random() * 0.5 + 0.5;
        
        sparkle.style.cssText = `
            --tx: ${tx}px;
            --ty: ${ty}px;
            left: ${STATE.mousePosition.x}px;
            top: ${STATE.mousePosition.y}px;
            animation-delay: ${Math.random() * 0.2}s;
            animation-duration: ${duration}s;
            background: hsl(${Math.random() * 360}, 100%, 70%);
        `;
        
        DOM.cursorSparkles.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), duration * 1000);
    }
}

// ===== PARTICLES BACKGROUND =====
function initParticles() {
    if (!DOM.particlesCanvas) return;
    
    const ctx = DOM.particlesCanvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        DOM.particlesCanvas.width = window.innerWidth;
        DOM.particlesCanvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * DOM.particlesCanvas.width;
            this.y = Math.random() * DOM.particlesCanvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
            this.alpha = Math.random() * 0.5 + 0.2;
            this.wander = 0;
        }
        
        update() {
            // Wander effect
            this.wander += 0.01;
            this.x += this.speedX + Math.sin(this.wander) * 0.1;
            this.y += this.speedY + Math.cos(this.wander) * 0.1;
            
            // Bounce off edges
            if (this.x > DOM.particlesCanvas.width) {
                this.x = 0;
                this.y = Math.random() * DOM.particlesCanvas.height;
            }
            if (this.x < 0) {
                this.x = DOM.particlesCanvas.width;
                this.y = Math.random() * DOM.particlesCanvas.height;
            }
            if (this.y > DOM.particlesCanvas.height) {
                this.y = 0;
                this.x = Math.random() * DOM.particlesCanvas.width;
            }
            if (this.y < 0) {
                this.y = DOM.particlesCanvas.height;
                this.x = Math.random() * DOM.particlesCanvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Initialize particles
    function initParticlesArray() {
        particles = [];
        for (let i = 0; i < CONFIG.particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Connect particles with lines
    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.save();
                    ctx.globalAlpha = (1 - distance / 100) * 0.1;
                    ctx.strokeStyle = 'var(--primary)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 100;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.x;
        mouseY = e.y;
    });
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, DOM.particlesCanvas.width, DOM.particlesCanvas.height);
        
        particles.forEach(particle => {
            // Mouse repulsion
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouseRadius) {
                const angle = Math.atan2(dy, dx);
                const force = (mouseRadius - distance) / mouseRadius;
                particle.x -= Math.cos(angle) * force * 2;
                particle.y -= Math.sin(angle) * force * 2;
            }
            
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        animationId = requestAnimationFrame(animateParticles);
    }
    
    initParticlesArray();
    animateParticles();
    
    // Cleanup on page hide
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animateParticles();
        }
    });
}

// ===== MAGNETIC ELEMENTS =====
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) * CONFIG.magneticStrength;
            const deltaY = (y - centerY) * CONFIG.magneticStrength;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            
            // Update button hover effect
            const btnHover = element.querySelector('.btn-hover');
            if (btnHover) {
                btnHover.style.setProperty('--mouse-x', `${x}px`);
                btnHover.style.setProperty('--mouse-y', `${y}px`);
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
            
            // Reset button hover effect
            const btnHover = element.querySelector('.btn-hover');
            if (btnHover) {
                btnHover.style.opacity = '0';
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollProgress();
                updateNavbar();
                updateActiveSection();
                triggerScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
        
        STATE.isScrolling = true;
        clearTimeout(STATE.scrollTimeout);
        STATE.scrollTimeout = setTimeout(() => {
            STATE.isScrolling = false;
        }, 150);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Update progress ring
    if (DOM.progressRing) {
        const circumference = 2 * Math.PI * 28;
        const offset = circumference - (scrolled / 100) * circumference;
        DOM.progressRing.style.strokeDashoffset = offset;
        
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${Math.round(scrolled)}%`;
        }
    }
    
    // Update navbar progress
    const navProgress = document.querySelector('.progress-fill');
    if (navProgress) {
        navProgress.style.width = `${scrolled}%`;
    }
}

function updateNavbar() {
    if (!DOM.navbar) return;
    
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        DOM.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        DOM.navbar.style.backdropFilter = 'blur(20px)';
        DOM.navbar.style.padding = '1rem 0';
    } else {
        DOM.navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        DOM.navbar.style.backdropFilter = 'blur(10px)';
        DOM.navbar.style.padding = '1.5rem 0';
    }
    
    // Hide/show scroll hint
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
        if (scrollY > 200) {
            scrollHint.style.opacity = '0';
            scrollHint.style.pointerEvents = 'none';
        } else {
            scrollHint.style.opacity = '0.7';
            scrollHint.style.pointerEvents = 'auto';
        }
    }
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && 
            scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });
    
    if (currentSection !== STATE.activeSection) {
        STATE.activeSection = currentSection;
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

function triggerScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible && !el.classList.contains('aos-animate')) {
            const delay = el.getAttribute('data-aos-delay') || 0;
            
            setTimeout(() => {
                el.classList.add('aos-animate');
                
                // Additional effects based on animation type
                const animationType = el.getAttribute('data-aos');
                if (animationType === 'height') {
                    el.style.height = '100%';
                }
            }, parseInt(delay));
        }
    });
}

// ===== COUNTER ANIMATIONS =====
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const speed = parseInt(counter.getAttribute('data-speed')) || 2000;
                
                animateCounter(counter, target, speed);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
            
            // Animate the bar
            const bar = element.closest('.stat-item').querySelector('.bar-fill');
            if (bar) {
                bar.style.width = '100%';
            }
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ===== SKILL BARS =====
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const percent = skillItem.getAttribute('data-percent');
                const barFill = skillItem.querySelector('.bar-fill');
                
                if (barFill) {
                    setTimeout(() => {
                        barFill.style.width = `${percent}%`;
                    }, 200);
                }
                
                observer.unobserve(skillItem);
            }
        });
    }, { threshold: 0.3 });
    
    skillItems.forEach(item => observer.observe(item));
}

// ===== PORTFOLIO FILTER =====
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    if (!DOM.contactForm) return;
    
    DOM.contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = DOM.contactForm.querySelector('.submit-btn');
        const formData = new FormData(DOM.contactForm);
        
        // Show sending state
        submitBtn.classList.add('sending');
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success state
            submitBtn.classList.remove('sending');
            submitBtn.classList.add('success');
            
            // Reset form
            DOM.contactForm.reset();
            
            // Reset button after 2 seconds
            setTimeout(() => {
                submitBtn.classList.remove('success');
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
            }, 2000);
        }, 1500);
    });
    
    // Form validation
    const inputs = DOM.contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.parentElement.classList.add('has-value');
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    STATE.theme = savedTheme;
    updateTheme();
    
    themeToggle.addEventListener('click', () => {
        STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
        updateTheme();
        localStorage.setItem('theme', STATE.theme);
    });
}

function updateTheme() {
    document.body.setAttribute('data-theme', STATE.theme);
    
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        if (STATE.theme === 'dark') {
            themeToggle.classList.remove('active');
        } else {
            themeToggle.classList.add('active');
        }
    }
    
    // Update CSS variables
    const root = document.documentElement;
    if (STATE.theme === 'light') {
        root.style.setProperty('--dark', '#f5f5f5');
        root.style.setProperty('--darker', '#ffffff');
        root.style.setProperty('--light', '#333333');
        root.style.setProperty('--gray', '#666666');
        root.style.setProperty('--glass', 'rgba(0, 0, 0, 0.05)');
        root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
    } else {
        root.style.setProperty('--dark', '#0a0a0a');
        root.style.setProperty('--darker', '#050505');
        root.style.setProperty('--light', '#f0f0f0');
        root.style.setProperty('--gray', '#888');
        root.style.setProperty('--glass', 'rgba(255, 255, 255, 0.05)');
        root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.1)');
    }
}

// ===== BACK TO TOP =====
function initBackToTop() {
    if (!DOM.backToTop) return;
    
    DOM.backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            DOM.backToTop.style.opacity = '1';
            DOM.backToTop.style.pointerEvents = 'auto';
        } else {
            DOM.backToTop.style.opacity = '0';
            DOM.backToTop.style.pointerEvents = 'none';
        }
    });
}

// ===== AOS (Animate On Scroll) =====
function initAOS() {
    // Simple AOS implementation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const animation = el.getAttribute('data-aos');
                const delay = el.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    el.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

// ===== FIREWORKS =====
function initFireworks() {
    const container = document.getElementById('fireworks');
    if (!container) return;
    
    // Only show fireworks on thank you section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startFireworks();
            } else {
                stopFireworks();
            }
        });
    }, { threshold: 0.5 });
    
    const thankyouSection = document.querySelector('.thankyou-section');
    if (thankyouSection) observer.observe(thankyouSection);
}

function startFireworks() {
    const container = document.getElementById('fireworks');
    if (!container) return;
    
    // Create fireworks particles
    for (let i = 0; i < 50; i++) {
        createFireworkParticle(container);
    }
}

function createFireworkParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'firework-particle';
    
    const size = Math.random() * 5 + 2;
    const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 10px ${color};
        animation: fireworkExplode ${Math.random() * 2 + 1}s ease-out forwards;
    `;
    
    container.appendChild(particle);
    
    // Remove after animation
    setTimeout(() => particle.remove(), 1000);
    
    // Add animation keyframes
    const style = document.createElement('style');
    if (!document.querySelector('#firework-animation')) {
        style.id = 'firework-animation';
        style.textContent = `
            @keyframes fireworkExplode {
                0% {
                    transform: translate(0, 0) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translate(var(--tx, 0), var(--ty, -100px)) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--tx, 0), var(--ty, -200px)) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function stopFireworks() {
    const container = document.getElementById('fireworks');
    if (container) {
        container.innerHTML = '';
    }
}

// ===== FLOATING ELEMENTS =====
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element, .floating-card, .tech-badge');
    
    floatingElements.forEach((el, index) => {
        // Add random floating animation
        const duration = 3 + Math.random() * 2;
        const delay = index * 0.1;
        
        el.style.animation = `floatElement ${duration}s ease-in-out infinite`;
        el.style.animationDelay = `${delay}s`;
    });
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    // Card hover effects
    document.querySelectorAll('.content-card, .info-card, .skill-category').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Update glow position
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.setProperty('--mouse-x', `${x}px`);
                glow.style.setProperty('--mouse-y', `${y}px`);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            
            // Hide glow
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
        
        card.addEventListener('mouseenter', () => {
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '1';
            }
        });
    });
    
    // Image hover effects
    document.querySelectorAll('.card-image').forEach(image => {
        image.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            image.querySelector('img').style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        });
        
        image.addEventListener('mouseleave', () => {
            image.querySelector('img').style.transform = 'scale(1.1) translate(0, 0)';
        });
    });
}

// ===== PARALLAX EFFECTS =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((layer, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const typedName = document.getElementById('typedName');
    if (!typedName) return;
    
    const name = "Javon Kersen Wijaya";
    let i = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function typeWriter() {
        if (i < name.length && !isDeleting) {
            typedName.textContent += name.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else if (i === name.length && !isEnd) {
            isEnd = true;
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, 2000);
        } else if (isDeleting && i > 0) {
            typedName.textContent = name.substring(0, i - 1);
            i--;
            setTimeout(typeWriter, 50);
        } else if (i === 0 && isDeleting) {
            isDeleting = false;
            isEnd = false;
            setTimeout(typeWriter, 500);
        }
    }
    
    // Start typing after delay
    setTimeout(typeWriter, 1000);
}

// ===== POST-LOAD ANIMATIONS =====
function startPostLoadAnimations() {
    // Add loaded class to body for transitions
    document.body.classList.add('loaded');
    
    // Start background animations
    startBackgroundAnimations();
    
    // Initial scroll animations
    triggerScrollAnimations();
    
    // Start interactive elements
    startInteractiveElements();
}

function startBackgroundAnimations() {
    // Animate gradient orbs
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        orb.style.animationPlayState = 'running';
    });
    
    // Animate floating grid
    const grid = document.querySelector('.floating-grid');
    if (grid) {
        grid.style.animationPlayState = 'running';
    }
    
    // Animate scan line
    const scanLine = document.querySelector('.scan-line');
    if (scanLine) {
        scanLine.style.animationPlayState = 'running';
    }
}

function startInteractiveElements() {
    // Start cursor animations
    DOM.cursor.style.opacity = '1';
    if (DOM.cursorTrail) {
        DOM.cursorTrail.style.opacity = '0.3';
    }
    
    // Start particle system
    const canvas = document.getElementById('particlesCanvas');
    if (canvas) {
        canvas.style.opacity = '1';
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Request Animation Frame wrapper
function raf(fn) {
    let ticking = false;
    return function() {
        if (!ticking) {
            requestAnimationFrame(() => {
                fn();
                ticking = false;
            });
            ticking = true;
        }
    };
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    // Cancel any pending animations
    cancelAnimationFrame(animationId);
    
    // Remove event listeners
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('scroll', scrollHandler);
});

console.log('📦 Portfolio script loaded successfully!');