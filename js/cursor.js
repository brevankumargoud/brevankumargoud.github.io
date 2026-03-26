// cursor.js
document.addEventListener('DOMContentLoaded', () => {
    // Only initialized if it's not a touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
        document.body.style.cursor = 'auto'; // Re-enable default cursor
        return; 
    }

    document.body.classList.add('custom-cursor-active');

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';

    document.body.appendChild(dot);
    document.body.appendChild(trail);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    let trailX = window.innerWidth / 2;
    let trailY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant dot movement
        dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    });

    // Smooth trail animation
    function animateTrail() {
        const ease = 0.15;
        
        trailX += (mouseX - trailX) * ease;
        trailY += (mouseY - trailY) * ease;
        
        trail.style.transform = `translate(${trailX - 12}px, ${trailY - 12}px)`;
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();

    // Add Hover Effects on interactive elements
    const interactiveSelectors = 'a, button, .card, input, textarea';
    
    // We use event delegation or MutationObserver since elements might be loaded dynamically
    // Simple delegation on body:
    document.body.addEventListener('mouseover', (e) => {
        const target = e.target.closest(interactiveSelectors);
        if (target) {
            document.body.classList.add('hovering');
        }
    });

    document.body.addEventListener('mouseout', (e) => {
        const target = e.target.closest(interactiveSelectors);
        if (target) {
            document.body.classList.remove('hovering');
        }
    });
});
