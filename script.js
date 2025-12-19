// ============================================
// Particles.js Configuration
// ============================================
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#6366f1"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            }
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#6366f1",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// ============================================
// Spiral Design Creation
// ============================================
function createSpiralDesign() {
    // Create spiral container
    const spiralContainer = document.createElement('div');
    spiralContainer.className = 'spiral-container';
    document.body.appendChild(spiralContainer);

    // Create multiple spiral circles
    for (let i = 1; i <= 5; i++) {
        const spiral = document.createElement('div');
        spiral.className = `spiral spiral-${i}`;
        spiralContainer.appendChild(spiral);
    }

    // Create helix spiral lines
    const helixSpiral = document.createElement('div');
    helixSpiral.className = 'helix-spiral';
    document.body.appendChild(helixSpiral);

    for (let i = 1; i <= 4; i++) {
        const helixLine = document.createElement('div');
        helixLine.className = 'helix-line';
        helixLine.style.setProperty('--offset', `${(i % 2 === 0 ? 1 : -1) * (50 + i * 25)}px`);
        helixSpiral.appendChild(helixLine);
    }

    // Create spiral path dots
    const spiralPath = document.createElement('div');
    spiralPath.className = 'spiral-path';
    document.body.appendChild(spiralPath);

    for (let i = 0; i < 5; i++) {
        const dot = document.createElement('div');
        dot.className = 'spiral-dot';
        spiralPath.appendChild(dot);
    }
}

// Initialize spiral design
createSpiralDesign();

// ============================================
// Navigation
// ============================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const burger = document.querySelector('.burger');
const navLinksContainer = document.querySelector('.nav-links');

// Scroll effect on navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Close mobile menu
        navLinksContainer.classList.remove('active');
    });
});

// Burger menu toggle
if (burger) {
    burger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });
}

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Statistics Counter
// ============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for counters
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.textContent === '0') {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// Gallery Lightbox
// ============================================
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeLightbox = document.querySelector('.close-lightbox');

galleryItems.forEach(item => {
    const image = item.querySelector('img');
    
    if (image) {
        item.addEventListener('click', () => {
            lightboxImg.src = image.src;
            lightboxImg.style.display = 'block';
            lightboxVideo.style.display = 'none';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
});

// Close lightbox
if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        lightboxVideo.pause();
        document.body.style.overflow = 'auto';
    });
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        lightboxVideo.pause();
        document.body.style.overflow = 'auto';
    }
});


// ============================================
// Scroll Animations
// ============================================
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

// Observe all cards and sections
document.querySelectorAll('.about-card, .member-card, .file-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// Parallax Effect for Hero
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = Math.max(0, 1 - scrolled / 600);
        }
    }
});

// ============================================
// Dynamic Spiral Animation
// ============================================
function updateSpiralAnimation() {
    const spirals = document.querySelectorAll('.spiral');
    spirals.forEach((spiral, index) => {
        const speed = 20 + (index * 5);
        spiral.style.animationDuration = `${speed}s`;
    });
}

updateSpiralAnimation();

// ============================================
// Mouse Move Spiral Effect
// ============================================
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const spirals = document.querySelectorAll('.spiral');
    spirals.forEach((spiral, index) => {
        const rect = spiral.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (mouseX - centerX) * 0.01;
        const deltaY = (mouseY - centerY) * 0.01;
        
        spiral.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${spiral.rotation || 0}deg)`;
    });
});

// ============================================
// File Download Handler
// ============================================
const downloadButtons = document.querySelectorAll('.download-btn');
downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        if (href) {
            // Create a temporary anchor element for download
            const link = document.createElement('a');
            link.href = href;
            link.download = href.split('/').pop(); // Get filename from path
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
});

// ============================================
// Contact Form Handler
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formMessage.style.display = 'none';
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            to_email: 'engalaagabr@hotmail.com'
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            return;
        }
        
        // Create mailto link
        const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
        const mailtoLink = `mailto:${formData.to_email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message after a short delay
        setTimeout(() => {
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Your email client should open. If not, please contact us at engalaagabr@hotmail.com';
            formMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Hide message after 7 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 7000);
        }, 500);
    });
}

// ============================================
// Initialize on Load
// ============================================
window.addEventListener('load', () => {
    // Set initial active nav link
    if (window.scrollY === 0) {
        navLinks[0]?.classList.add('active');
    }
    
    // Animate hero elements
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
});

