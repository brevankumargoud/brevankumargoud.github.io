// components.js
class PortfolioComponents {
    static init() {
        // Define basePath fallback if it's not defined globally
        const pBasePath = typeof basePath !== 'undefined' ? basePath : './';

        this.renderNavbar(pBasePath);
        this.renderFooter(pBasePath);
        this.setActiveLink();
        this.initMobileMenu();
    }

    static renderNavbar(pBasePath) {
        const navbarHTML = `
            <nav class="navbar">
                <a href="${pBasePath}index.html" class="nav-brand">Revan<span>.</span></a>
                <ul class="nav-links">
                    <li><a href="${pBasePath}index.html" data-path="index.html">Home</a></li>
                    <li><a href="${pBasePath}projects.html" data-path="projects.html">Projects</a></li>
                    <li><a href="${pBasePath}writeups.html" data-path="writeups.html">Writeups</a></li>
                    <li><a href="${pBasePath}about.html" data-path="about.html">About</a></li>
                    <li><a href="${pBasePath}contact.html" data-path="contact.html">Contact</a></li>
                </ul>
                <button class="mobile-menu-btn" aria-label="Toggle navigation" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
            </nav>
        `;
        
        const placeholder = document.getElementById('navbar-placeholder');
        if (placeholder) {
            placeholder.innerHTML = navbarHTML;
        }
    }

    static initMobileMenu() {
        const placeholder = document.getElementById('navbar-placeholder');
        if (!placeholder) return;
        
        const menuBtn = placeholder.querySelector('.mobile-menu-btn');
        const navLinks = placeholder.querySelector('.nav-links');
        
        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                const isExpanded = navLinks.classList.toggle('active');
                menuBtn.classList.toggle('active');
                menuBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            });

            // Close mobile menu when a nav link is clicked
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuBtn.classList.remove('active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                });
            });
        }
    }

    static renderFooter(pBasePath) {
        const footerHTML = `
            <footer>
                <p>&copy; ${new Date().getFullYear()} Revan Kumar Goud Bommagoni. Learning Offense to Build Stronger Defense.</p>
                <div style="margin-top: 10px;">
                    <a href="https://github.com/brevankumargoud" target="_blank" style="margin: 0 10px; color: var(--accent-primary);">GitHub</a>
                    <a href="https://www.linkedin.com/in/revan-kumar-goud-bommagoni-4398a5362" target="_blank" style="margin: 0 10px; color: var(--accent-primary);">LinkedIn</a>
                    <a href="mailto:revankumargoudbommagoni@gmail.com" style="margin: 0 10px; color: var(--accent-primary);">Email</a>
                </div>
            </footer>
        `;
        
        const placeholder = document.getElementById('footer-placeholder');
        if (placeholder) {
            placeholder.innerHTML = footerHTML;
        }
    }

    static setActiveLink() {
        const path = window.location.pathname;
        const links = document.querySelectorAll('.nav-links a');
        
        links.forEach(link => {
            const linkPath = link.getAttribute('data-path');
            if (path.endsWith(linkPath) || (path.endsWith('/') && linkPath === 'index.html')) {
                link.classList.add('active');
            } else if (path.includes('/projects/') && linkPath === 'projects.html') {
                link.classList.add('active');
            } else if (path.includes('/writeups/') && linkPath === 'writeups.html') {
                link.classList.add('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    PortfolioComponents.init();
});
