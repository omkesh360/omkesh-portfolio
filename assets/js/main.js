// Modern Portfolio JavaScript
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupParticles();
        this.setupTypingEffect();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupFormHandling();
        this.setupSmoothScrolling();
        // this.setupParticles(); // Particle effects removed
        this.setupLoadMore();
    }

    // Theme Management
    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        // Get saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
    // Particle and mouse/cursor effects removed
    }

    // Enhanced Particles Animation with Mouse Interaction
    setupParticles() {
        const container = document.getElementById('particlesContainer');
        const particleCount = window.innerWidth > 768 ? 200 : 100; // Even more particles
        const particles = [];

        // Clear existing particles
        container.innerHTML = '';

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random initial position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            // Random size and properties
            const size = Math.random() * 10 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random colors and effects
            const colors = ['var(--accent-primary)', 'var(--accent-secondary)', '#ff6b6b', '#4ecdc4', '#45b7d1'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = randomColor;
            particle.style.boxShadow = `0 0 ${size * 2}px ${randomColor}`;
            
            // Store particle data
            const particleData = {
                element: particle,
                x: x,
                y: y,
                baseX: x,
                baseY: y,
                size: size,
                density: Math.random() * 50 + 1,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                color: randomColor
            };
            
            particles.push(particleData);
            container.appendChild(particle);
        }

        // Enhanced mouse interaction
        let mouse = {
            x: null,
            y: null,
            radius: 250
        };

        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        document.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Animate particles with floating and mouse interaction
        const animateParticles = () => {
            particles.forEach(particle => {
                // Floating animation
                particle.baseX += particle.vx;
                particle.baseY += particle.vy;
                
                // Boundary check with bounce effect
                if (particle.baseX < 0 || particle.baseX > window.innerWidth) {
                    particle.vx *= -1;
                    particle.baseX = Math.max(0, Math.min(window.innerWidth, particle.baseX));
                }
                if (particle.baseY < 0 || particle.baseY > window.innerHeight) {
                    particle.vy *= -1;
                    particle.baseY = Math.max(0, Math.min(window.innerHeight, particle.baseY));
                }

                // Mouse interaction with enhanced effects
                if (mouse.x !== null) {
                    let dx = mouse.x - particle.x;
                    let dy = mouse.y - particle.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        let forceDirectionX = dx / distance;
                        let forceDirectionY = dy / distance;
                        let force = (mouse.radius - distance) / mouse.radius;
                        let directionX = forceDirectionX * force * particle.density * 0.8;
                        let directionY = forceDirectionY * force * particle.density * 0.8;
                        
                        particle.x -= directionX;
                        particle.y -= directionY;
                        
                        // Enhanced glow effect on interaction
                        particle.element.style.boxShadow = `0 0 ${particle.size * 4}px ${particle.color}`;
                        particle.element.style.transform = `scale(${1 + force * 0.5})`;
                    } else {
                        // Return to base position
                        let dx = particle.x - particle.baseX;
                        let dy = particle.y - particle.baseY;
                        particle.x -= dx * 0.08;
                        particle.y -= dy * 0.08;
                        
                        // Reset effects
                        particle.element.style.boxShadow = `0 0 ${particle.size * 2}px ${particle.color}`;
                        particle.element.style.transform = 'scale(1)';
                    }
                } else {
                    // Return to base position
                    let dx = particle.x - particle.baseX;
                    let dy = particle.y - particle.baseY;
                    particle.x -= dx * 0.08;
                    particle.y -= dy * 0.08;
                    
                    // Reset effects
                    particle.element.style.boxShadow = `0 0 ${particle.size * 2}px ${particle.color}`;
                    particle.element.style.transform = 'scale(1)';
                }

                // Update particle position
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
            });

            requestAnimationFrame(animateParticles);
        };

        animateParticles();
    }

    // Typing Effect
    setupTypingEffect() {
        const typingText = document.getElementById('typingText');
        const texts = [
            'Electronics & Computer Engineering Student',
            'Problem Solver',
            'Tech Enthusiast',
            'Innovation Seeker',
            'Full of Energy',
            'Always Eager to Learn'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(type, typingSpeed);
        };

        type();
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navLinksItems = navLinks.querySelectorAll('a');

        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileToggle.classList.toggle('active');
                
                // Animate hamburger menu
                const spans = mobileToggle.querySelectorAll('span');
                if (mobileToggle.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });

            // Close menu when clicking on a link
            navLinksItems.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    
                    const spans = mobileToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    
                    const spans = mobileToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        }
    }

    // Scroll Effects
    setupScrollEffects() {
        const backToTop = document.getElementById('backToTop');
        const header = document.querySelector('.glass-header');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            // Back to top button
            if (scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }

            // Header background opacity
            if (scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.05)';
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form Handling
    setupFormHandling() {
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            this.showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.glass-header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Animations
    setupAnimations() {
        // Import skill percentages
        const skillPercentages = window.skillPercentages || {};
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation - exclude about, languages, and skills sections
        const animateElements = document.querySelectorAll('.certificate-card:not(.hidden-certificate), .experience-card');
        animateElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s ease';
                observer.observe(el);
            }, index * 50);
        });

        // Handle timeline items separately (education section)
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Keep about, languages, and skills sections always visible
        const alwaysVisibleElements = document.querySelectorAll('#about .glass-card, #languages .glass-card, .language-card, #skills .glass-card, .skill-item, .skill-category');
        alwaysVisibleElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 0.6s ease';
        });

        // Skills section loading animation and percentage/line growth
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((category, categoryIndex) => {
            category.style.opacity = '0';
            category.style.transform = 'translateY(50px)';
            category.style.transition = 'all 0.8s ease';

            setTimeout(() => {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';

                // Animate skill items within this category
                const skillItems = category.querySelectorAll('.skill-item');
                skillItems.forEach((skillItem, itemIndex) => {
                    skillItem.style.opacity = '0';
                    skillItem.style.transform = 'translateX(-30px)';
                    skillItem.style.transition = 'all 0.6s ease';

                    setTimeout(() => {
                        skillItem.style.opacity = '1';
                        skillItem.style.transform = 'translateX(0)';

                        // Animate progress bars with fill-in effect
                        const progressBar = skillItem.querySelector('.skill-progress');
                        if (progressBar) {
                            const skillName = skillItem.querySelector('h4').textContent;
                            const targetWidth = skillPercentages[skillName] || progressBar.getAttribute('data-width') || '0%';
                            progressBar.setAttribute('data-width', targetWidth);
                            progressBar.style.width = '0%';
                            progressBar.style.transition = 'width 2.5s cubic-bezier(0.4, 0, 0.2, 1)';

                            // Add percentage label if not present
                            let percentLabel = skillItem.querySelector('.skill-percent');
                            if (!percentLabel) {
                                percentLabel = document.createElement('span');
                                percentLabel.className = 'skill-percent';
                                percentLabel.style.position = 'absolute';
                                percentLabel.style.right = '10px';
                                percentLabel.style.top = '50%';
                                percentLabel.style.transform = 'translateY(-50%)';
                                percentLabel.style.fontWeight = 'bold';
                                percentLabel.style.color = 'var(--accent-primary)';
                                percentLabel.style.fontSize = '1rem';
                                percentLabel.style.zIndex = '2';
                                skillItem.style.position = 'relative';
                                skillItem.appendChild(percentLabel);
                            }
                            percentLabel.textContent = targetWidth.replace('width', '').trim();

                            // Add growth line under the bar if not present
                            let growthLine = skillItem.querySelector('.skill-growth-line');
                            if (!growthLine) {
                                growthLine = document.createElement('div');
                                growthLine.className = 'skill-growth-line';
                                growthLine.style.position = 'absolute';
                                growthLine.style.left = '0';
                                growthLine.style.right = '0';
                                growthLine.style.bottom = '-8px';
                                growthLine.style.height = '3px';
                                growthLine.style.background = 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))';
                                growthLine.style.backgroundSize = '200% 100%';
                                growthLine.style.borderRadius = '2px';
                                growthLine.style.opacity = '0.7';
                                growthLine.style.transition = 'width 2.5s cubic-bezier(0.4, 0, 0.2, 1)';
                                skillItem.appendChild(growthLine);
                            }
                            growthLine.style.width = '0%';

                            setTimeout(() => {
                                progressBar.style.width = targetWidth;
                                progressBar.classList.add('animate');
                                growthLine.style.width = targetWidth;
                                
                                // Add shimmer effect to both progress bar and growth line
                                const gradientAnimation = `linear-gradient(90deg, 
                                    var(--accent-primary) 0%, 
                                    var(--accent-secondary) 50%, 
                                    var(--accent-primary) 100%)`;
                                    
                                progressBar.style.background = gradientAnimation;
                                progressBar.style.backgroundSize = '200% 100%';
                                progressBar.style.animation = 'shimmer 2s ease-in-out infinite';
                                
                                // Add gradient animation to growth line
                                growthLine.style.background = gradientAnimation;
                                growthLine.style.backgroundSize = '200% 100%';
                                growthLine.style.animation = 'shimmer 2s ease-in-out infinite';
                            }, 500);
                        }
                    }, itemIndex * 150);
                });
            }, categoryIndex * 400);
        });
    }

    // Load More Certificates
    setupLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const hiddenCertificates = document.querySelectorAll('.hidden-certificate');
        
        if (loadMoreBtn && hiddenCertificates.length > 0) {
            loadMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add loading state
                loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                loadMoreBtn.disabled = true;
                
                setTimeout(() => {
                    hiddenCertificates.forEach((cert, index) => {
                        setTimeout(() => {
                            cert.classList.remove('hidden-certificate');
                            cert.style.display = 'block';
                            cert.style.opacity = '0';
                            cert.style.transform = 'translateY(30px)';
                            cert.style.transition = 'all 0.6s ease';
                            
                            setTimeout(() => {
                                cert.style.opacity = '1';
                                cert.style.transform = 'translateY(0)';
                            }, 100);
                        }, index * 100);
                    });
                    
                    setTimeout(() => {
                        loadMoreBtn.style.display = 'none';
                        this.showNotification('All certificates loaded successfully!', 'success');
                    }, hiddenCertificates.length * 100 + 500);
                }, 1000);
            });
        } else if (loadMoreBtn && hiddenCertificates.length === 0) {
            // Hide button if no hidden certificates
            loadMoreBtn.style.display = 'none';
        }
    }

    // Utility Functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--glass-bg);
            backdrop-filter: blur(var(--blur-amount));
            border: 1px solid var(--glass-border);
            border-radius: 10px;
            padding: 1rem 1.5rem;
            color: var(--text-primary);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Enhanced Mouse Tracking Effects (Cursor effects removed)
class MouseTracker {
    constructor() {
        this.init();
    }

    init() {
        this.setupHoverEffects();
    }

    setupHoverEffects() {
        // Add subtle hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .glass-card, .certificate-card, .timeline-item, .experience-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-3px) scale(1.01)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupScrollOptimization();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    setupImageOptimization() {
        // Add loading="lazy" to images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    setupScrollOptimization() {
        let ticking = false;

        const updateScrollEffects = () => {
            // Throttle scroll events
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-based animations here
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', updateScrollEffects, { passive: true });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    new MouseTracker();
    new PerformanceOptimizer();
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Cursor effects removed for better performance
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recreate particles on resize with new interactive system
    const portfolio = new Portfolio();
    portfolio.setupParticles();
});

// Add some extra visual effects
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .glass-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.profile-glow, .floating-icon');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading styles
    const loadingStyles = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::after {
            content: '';
            width: 50px;
            height: 50px;
            border: 3px solid var(--glass-border);
            border-top: 3px solid var(--accent-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10001;
        }
        
        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        body.loaded::before,
        body.loaded::after {
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loadingStyles;
    document.head.appendChild(styleSheet);
});
// Cursor effects removed for better performance

// Enhanced scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger proficiency bar animations
                const proficiencyFills = entry.target.querySelectorAll('.proficiency-fill');
                proficiencyFills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 500);
                });
            }
        });
    }, observerOptions);

    // Observe language cards and other animated elements
    const animatedElements = document.querySelectorAll('.language-card, .timeline-item, .certificate-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimations();
});

// Enhanced Cursor Dot Effect
function initCursorDot() {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorRing);

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.classList.add('active');
        cursorRing.classList.add('active');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('active');
        cursorRing.classList.remove('active');
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, .certificate-card, .timeline-item, .experience-card, .language-card, .skill-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
// All cursor effects removed for better performance// 
Skills Progress Animation
function animateSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                        bar.classList.add('animate');
                    }, 300);
                });
            }
        });
    }, {
        threshold: 0.3
    });

    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        skillObserver.observe(category);
    });
}

// Enhanced Mobile Menu
function setupEnhancedMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = navLinks.querySelectorAll('a');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileToggle.querySelectorAll('span');
        if (mobileToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Smooth Footer Links
function setupFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const headerHeight = document.querySelector('.glass-header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    setupEnhancedMobileMenu();
    setupFooterLinks();
});