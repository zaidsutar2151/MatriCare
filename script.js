// ==========================================
// MATRICARE AI - INTERACTIVE FEATURES
// Professional Medical Theme JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // ========== MOBILE MENU TOGGLE ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ========== SCROLL TO TOP BUTTON ==========
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Smooth scroll to top
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== SMOOTH SCROLL FOR NAVIGATION LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // ========== ANIMATED COUNTERS FOR STATS ==========
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };

    // Observe stat cards for counter animation
    const statCards = document.querySelectorAll('.stat-card, .problem-card');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const h3 = entry.target.querySelector('h3');
                if (h3) {
                    const text = h3.textContent;
                    const numbers = text.match(/\d+/);
                    if (numbers) {
                        const target = parseInt(numbers[0]);
                        if (target > 0 && target < 1000) {
                            h3.textContent = '0';
                            setTimeout(() => {
                                animateCounter(h3, target, 1500);
                            }, 200);
                        }
                    }
                }
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => statObserver.observe(card));

    // ========== PARALLAX EFFECT FOR HEADER ==========
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            header.style.transform = `translateY(${parallax}px)`;
        });
    }

    // ========== CARD TILT EFFECT ==========
    const cards = document.querySelectorAll('.problem-card, .market-card, .future-card, .tech-card, .module');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ========== LOADING ANIMATION ==========
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ========== TYPING EFFECT FOR HERO TEXT (Optional) ==========
    const heroText = document.querySelector('.hero p');
    if (heroText && heroText.dataset.typing === 'true') {
        const text = heroText.textContent;
        heroText.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // ========== CONSOLE WELCOME MESSAGE ==========
    console.log('%c MatriCare AI ', 'background: linear-gradient(135deg, #0066cc, #00b3b3); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;');
    console.log('%c Intelligent Maternal Monitoring System ', 'color: #0066cc; font-size: 14px; font-weight: bold;');
    console.log('%c Saving lives through AI-powered healthcare ', 'color: #00b3b3; font-size: 12px;');
});
