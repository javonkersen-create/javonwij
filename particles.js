// Enhanced Preloader with More Effects

class AdvancedPreloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.progressBar = document.getElementById('loadingFill');
        this.progressText = document.getElementById('loadingText');
        this.particlesContainer = document.getElementById('preloaderParticles');
        
        this.progress = 0;
        this.phases = [
            { text: "Loading assets...", target: 20 },
            { text: "Initializing animations...", target: 40 },
            { text: "Setting up portfolio...", target: 60 },
            { text: "Almost ready...", target: 80 },
            { text: "Welcome!", target: 100 }
        ];
        
        this.currentPhase = 0;
        this.isComplete = false;
        
        this.init();
    }
    
    init() {
        this.createParticles();
        this.createLoadingDots();
        this.startLoading();
    }
    
    createParticles() {
        if (!this.particlesContainer) return;
        
        // Create particle elements
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'preloader-particle';
            
            const size = Math.random() * 8 + 2;
            const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: preloaderFloat ${duration}s linear infinite;
                animation-delay: ${delay}s;
                box-shadow: 0 0 10px ${color};
            `;
            
            this.particlesContainer.appendChild(particle);
        }
        
        // Add animation keyframes
        this.addKeyframes();
    }
    
    addKeyframes() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes preloaderFloat {
                0% {
                    transform: translate(0, 0) rotate(0deg) scale(1);
                    opacity: 0.5;
                }
                25% {
                    transform: translate(${Math.random() * 100 - 50}px, -50px) rotate(90deg) scale(1.2);
                    opacity: 0.8;
                }
                50% {
                    transform: translate(0, -100px) rotate(180deg) scale(1);
                    opacity: 0.5;
                }
                75% {
                    transform: translate(${Math.random() * 100 - 50}px, -50px) rotate(270deg) scale(0.8);
                    opacity: 0.3;
                }
                100% {
                    transform: translate(0, 0) rotate(360deg) scale(1);
                    opacity: 0.5;
                }
            }
            
            @keyframes loadingShine {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            
            @keyframes dotPulse {
                0%, 100% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.5); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    createLoadingDots() {
        const dotsContainer = document.querySelector('.loading-dots');
        if (!dotsContainer) return;
        
        // Create animated dots
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.animationDelay = `${i * 0.2}s`;
            dotsContainer.appendChild(dot);
        }
    }
    
    startLoading() {
        const interval = setInterval(() => {
            // Increment progress
            this.progress += Math.random() * 5;
            
            // Check if we should move to next phase
            if (this.currentPhase < this.phases.length - 1 && 
                this.progress >= this.phases[this.currentPhase].target) {
                this.currentPhase++;
                this.updateLoadingText();
            }
            
            // Update progress bar
            this.progressBar.style.width = `${this.progress}%`;
            
            // Check if loading is complete
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);
                this.completeLoading();
            }
        }, 50);
    }
    
    updateLoadingText() {
        if (this.progressText && this.currentPhase < this.phases.length) {
            this.progressText.textContent = this.phases[this.currentPhase].text;
            
            // Add text animation
            this.progressText.style.animation = 'none';
            setTimeout(() => {
                this.progressText.style.animation = 'textFade 0.3s';
            }, 10);
        }
    }
    
    completeLoading() {
        this.isComplete = true;
        
        // Final animation
        this.progressText.textContent = this.phases[this.phases.length - 1].text;
        this.progressBar.style.width = '100%';
        
        // Add completion effects
        this.createCompletionEffects();
        
        // Hide preloader after delay
        setTimeout(() => {
            this.hidePreloader();
        }, 1000);
    }
    
    createCompletionEffects() {
        // Create burst effect
        this.createBurstEffect();
        
        // Animate logo
        this.animateLogo();
        
        // Play completion sound (optional)
        this.playCompletionSound();
    }
    
    createBurstEffect() {
        if (!this.particlesContainer) return;
        
        // Create burst particles
        for (let i = 0; i < 30; i++) {
            const burst = document.createElement('div');
            burst.className = 'burst-particle';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
            
            burst.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: ${color};
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: burstExplode 0.8s ease-out forwards;
                --tx: ${tx}px;
                --ty: ${ty}px;
                box-shadow: 0 0 10px ${color};
            `;
            
            this.particlesContainer.appendChild(burst);
            
            // Remove after animation
            setTimeout(() => burst.remove(), 800);
        }
        
        // Add burst animation
        const style = document.createElement('style');
        if (!document.querySelector('#burst-animation')) {
            style.id = 'burst-animation';
            style.textContent = `
                @keyframes burstExplode {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1);
                        opacity: 0;
                    }
                }
                
                @keyframes textFade {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    animateLogo() {
        const logoChars = document.querySelectorAll('.logo-char');
        logoChars.forEach((char, index) => {
            char.style.animation = `logoComplete 0.5s ease-out ${index * 0.1}s forwards`;
        });
        
        // Add logo animation
        const style = document.createElement('style');
        if (!document.querySelector('#logo-complete')) {
            style.id = 'logo-complete';
            style.textContent = `
                @keyframes logoComplete {
                    0% {
                        transform: translateY(0) rotate(0);
                    }
                    50% {
                        transform: translateY(-30px) rotate(10deg);
                    }
                    100% {
                        transform: translateY(0) rotate(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    playCompletionSound() {
        // Optional: Play a subtle completion sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 523.25; // C5
            oscillator.type = 'sine';
            
            gainNode.gain.value = 0.1;
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            // Audio context not supported, silently fail
        }
    }
    
    hidePreloader() {
        if (!this.preloader) return;
        
        // Fade out preloader
        this.preloader.style.opacity = '0';
        this.preloader.style.transition = 'opacity 0.5s ease-out';
        
        // Remove from DOM after animation
        setTimeout(() => {
            this.preloader.style.display = 'none';
            this.triggerPageReady();
        }, 500);
    }
    
    triggerPageReady() {
        // Dispatch event that page is ready
        const event = new CustomEvent('pageReady');
        document.dispatchEvent(event);
        
        // Start page animations
        this.startPageAnimations();
    }
    
    startPageAnimations() {
        // Add loaded class to body
        document.body.classList.add('loaded');
        
        // Start cursor
        const cursor = document.getElementById('cursor');
        if (cursor) {
            cursor.style.opacity = '1';
        }
        
        // Start background animations
        const animatedBg = document.querySelector('.animated-bg');
        if (animatedBg) {
            animatedBg.style.opacity = '1';
        }
        
        console.log('🚀 Page ready! Starting animations...');
    }
}

// Initialize advanced preloader
document.addEventListener('DOMContentLoaded', () => {
    const preloader = new AdvancedPreloader();
    
    // Listen for page ready event
    document.addEventListener('pageReady', () => {
        console.log('✅ Page is ready!');
        // Additional initialization can go here
    });
});