// Certificates Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize filter functionality
    initCertificateFilters();
    
    // Initialize animations
    initCertificateAnimations();
});

// Certificate Filter Functionality
function initCertificateFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter category
            const filterCategory = button.getAttribute('data-filter');
            
            // Filter certificates
            certificateCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterCategory === 'all' || cardCategory === filterCategory) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Certificate Animations
function initCertificateAnimations() {
    // Animate certificate stats on scroll
    const certStats = document.querySelectorAll('.cert-stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate numbers
                const numberElement = entry.target.querySelector('.cert-number');
                if (numberElement) {
                    animateNumber(numberElement);
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    certStats.forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px)';
        stat.style.transition = 'all 0.6s ease';
        observer.observe(stat);
    });
}

// Animate numbers
function animateNumber(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const number = parseInt(text.replace(/\D/g, ''));
    
    if (isNaN(number)) return;
    
    let current = 0;
    const increment = number / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
    }, 50);
}

// Add hover effects to certificate cards
document.addEventListener('DOMContentLoaded', () => {
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 32px var(--shadow-dark)';
        });
    });
});