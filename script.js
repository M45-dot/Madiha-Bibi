// ===========================
// NAVIGATION MENU TOGGLE
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===========================
// SMOOTH SCROLL BEHAVIOR
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// ANIMATION ON SCROLL
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and items
const animatedElements = document.querySelectorAll(
    '.experience-card, .highlight-card, .skill-category, .tool-card, .project-card, .strategy-step'
);

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===========================
// ACTIVE NAVIGATION LINK
// ===========================

const sections = document.querySelectorAll('section[id]');
const navLinkElements = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = 'var(--secondary-color)';
        } else {
            link.style.color = '';
        }
    });
});

// ===========================
// HOVER EFFECTS FOR CARDS
// ===========================

const cards = document.querySelectorAll('.experience-card, .project-card, .skill-category, .tool-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===========================
// FORM PLACEHOLDER INTERACTIONS
// ===========================

// Add click handler for email placeholder
const emailPlaceholder = document.querySelector('.email-placeholder');
if (emailPlaceholder) {
    emailPlaceholder.addEventListener('click', function() {
        const userEmail = prompt('Please enter your email address:');
        if (userEmail) {
            this.textContent = userEmail;
            this.style.cursor = 'default';
        }
    });
    emailPlaceholder.style.cursor = 'pointer';
}

// ===========================
// SCROLL TO TOP BUTTON
// ===========================

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #2ecc71;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.alignItems = 'center';
        scrollTopBtn.style.justifyContent = 'center';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Scroll to top on button click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effects for scroll to top button
scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.background = '#27ae60';
    this.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.background = '#2ecc71';
    this.style.transform = 'scale(1)';
});

// ===========================
// STATS COUNTER (if needed in future)
// ===========================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===========================
// ACCESSIBILITY IMPROVEMENTS
// ===========================

// Keyboard navigation for buttons
const buttons = document.querySelectorAll('.btn, .contact-link');

buttons.forEach(button => {
    button.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            button.click();
        }
    });
});

// ===========================
// PAGE LOAD ANIMATION
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Add staggered animation to hero content
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle) heroTitle.style.animation = 'fadeInUp 0.8s ease';
    if (heroSubtitle) heroSubtitle.style.animation = 'fadeInUp 0.8s ease 0.2s backwards';
    if (heroDescription) heroDescription.style.animation = 'fadeInUp 0.8s ease 0.4s backwards';
});

// ===========================
// RESPONSIVE HAMBURGER ANIMATION
// ===========================

hamburger.addEventListener('click', function() {
    const bars = this.querySelectorAll('.bar');
    if (this.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        bars[0].style.transform = '';
        bars[1].style.opacity = '1';
        bars[2].style.transform = '';
    }
});

// ===========================
// SOCIAL LINK TRACKING
// ===========================

const socialLinks = document.querySelectorAll('a[href*="linkedin.com"], a[href*="github.com"]');

socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Log for analytics if needed
        console.log('Navigating to:', this.href);
    });
});