// animations.js
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Scroll Animations
    // The user strictly requested reliable reverse scroll effects.
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before the item comes fully into view
        threshold: 0.1 // 10% of element must be visible
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Reverse animation on scroll out
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Initial query
    let animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => scrollObserver.observe(el));

    // Handle dynamically added content (if any component loads late)
    const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // ELEMENT_NODE
                    if (node.classList.contains('animate-on-scroll')) {
                        scrollObserver.observe(node);
                    }
                    // check children
                    const children = node.querySelectorAll('.animate-on-scroll');
                    children.forEach(child => scrollObserver.observe(child));
                }
            });
        });
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
});
