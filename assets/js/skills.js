document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target;
                const percentage = skillProgress.getAttribute('data-width');
                const percentageSpan = skillProgress.parentElement.nextElementSibling;
                
                // Animate the progress bar
                skillProgress.style.width = percentage;
                
                // Animate the percentage number
                const targetPercentage = parseInt(percentage);
                let currentPercentage = 0;
                const duration = 1500; // 1.5 seconds
                const stepTime = 20; // Update every 20ms
                const steps = duration / stepTime;
                const increment = targetPercentage / steps;
                
                const counter = setInterval(() => {
                    currentPercentage += increment;
                    if (currentPercentage >= targetPercentage) {
                        currentPercentage = targetPercentage;
                        clearInterval(counter);
                    }
                    percentageSpan.textContent = Math.round(currentPercentage) + '%';
                }, stepTime);
                
                // Unobserve after animation
                observer.unobserve(skillProgress);
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all skill progress bars
    document.querySelectorAll('.skill-progress').forEach(progress => {
        // Reset initial state
        progress.style.width = '0%';
        observer.observe(progress);
    });
});
