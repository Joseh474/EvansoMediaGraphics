// Evanso Media & Graphics - Complete JavaScript
// Modern, Interactive, SEO-Optimized

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initMobileMenu();
    initScrollEffects();
    initBackToTop();
    initParticles();
    initSlider();
    initSearchFunctionality();
    initNewsletterForm();
    initPortfolioFilters();
    initLazyLoading();
    initSmoothScroll();
});

// ========================================
// THEME TOGGLE (Dark/Light Mode)
// ========================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.classList.toggle('light-mode', currentTheme === 'light');
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('light-mode');
            const newTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// ========================================
// SCROLL EFFECTS
// ========================================
function initScrollEffects() {
    const header = document.getElementById('mainHeader');
    
    window.addEventListener('scroll', function() {
        // Shrink header on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Animate elements on scroll
        animateOnScroll();
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .testimonial-card, .blog-card, .portfolio-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animation styles
document.querySelectorAll('.service-card, .testimonial-card, .blog-card, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
});

// ========================================
// BACK TO TOP BUTTON
// ========================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========================================
// PARTICLES EFFECT
// ========================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            createParticle(particlesContainer);
        }
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.background = 'rgba(79, 172, 254, 0.5)';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(particle);
}

// Add float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ========================================
// PORTFOLIO SLIDER
// ========================================
function initSlider() {
    const slider = document.querySelector('.slider-wrapper');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const slides = slider.querySelectorAll('.slide');
    const slideWidth = slides[0].offsetWidth + 30; // including gap
    
    nextBtn.addEventListener('click', function() {
        if (currentIndex < slides.length - 3) {
            currentIndex++;
            updateSliderPosition();
        }
    });
    
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });
    
    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    // Auto-slide every 5 seconds
    setInterval(function() {
        if (currentIndex < slides.length - 3) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSliderPosition();
    }, 5000);
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================
function initSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const sidebarSearch = document.querySelector('.sidebar-search input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    if (sidebarSearch) {
        const searchBtn = document.querySelector('.sidebar-search button');
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                performSearch(sidebarSearch.value);
            });
        }
    }
}

function performSearch(query) {
    if (!query.trim()) return;
    
    console.log('Searching for:', query);
    // In production, this would filter blog posts, portfolio items, etc.
    // For now, we'll show a simple alert
    showNotification(`Searching for: "${query}"`);
}

// ========================================
// NEWSLETTER FORM
// ========================================
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                // In production, send to backend
                showNotification('Thank you for subscribing!');
                this.reset();
            } else {
                showNotification('Please enter a valid email address');
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// PORTFOLIO FILTERS
// ========================================
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========================================
// LAZY LOADING IMAGES
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// CONTACT FORM VALIDATION
// ========================================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const subject = this.querySelector('input[name="subject"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address');
                return;
            }
            
            // In production, send to backend
            showNotification('Message sent successfully! We will get back to you soon.');
            this.reset();
        });
    }
}

// Initialize contact form if on contact page
if (document.querySelector('.contact-form')) {
    document.addEventListener('DOMContentLoaded', initContactForm);
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 350px;
        font-family: 'Inter', sans-serif;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', highlightActiveNav);

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-section');
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.cosmic-bg');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(function() {
    animateOnScroll();
}, 100));

// ========================================
// BLOG SEARCH FUNCTIONALITY
// ========================================
function initBlogSearch() {
    const blogCards = document.querySelectorAll('.blog-card');
    const searchInputs = document.querySelectorAll('input[type="search"]');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

if (document.querySelector('.blog-main')) {
    document.addEventListener('DOMContentLoaded', initBlogSearch);
}

// ========================================
// FORM ENHANCEMENT
// ========================================
function enhanceForms() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if already has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

document.addEventListener('DOMContentLoaded', enhanceForms);

// ========================================
// TESTIMONIAL ROTATION (if needed)
// ========================================
function rotateTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;
    
    let currentTestimonial = 0;
    
    setInterval(() => {
        testimonials[currentTestimonial].style.opacity = '0.5';
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].style.opacity = '1';
        testimonials[currentTestimonial].style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            testimonials.forEach((t, i) => {
                if (i !== currentTestimonial) {
                    t.style.opacity = '1';
                    t.style.transform = 'scale(1)';
                }
            });
        }, 500);
    }, 5000);
}

// Initialize testimonial rotation if on home page
if (document.querySelector('.testimonials')) {
    document.addEventListener('DOMContentLoaded', rotateTestimonials);
}

// ========================================
// LOADING ANIMATION
// ========================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// SEO & ANALYTICS PLACEHOLDER
// ========================================
// Add Google Analytics or other tracking here
function trackPageView() {
    console.log('Page viewed:', window.location.pathname);
    // In production: gtag('config', 'GA_MEASUREMENT_ID', {'page_path': window.location.pathname});
}

document.addEventListener('DOMContentLoaded', trackPageView);

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.message);
});

// ========================================
// CONSOLE BRANDING
// ========================================
console.log('%cEvanso Media & Graphics', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border-radius: 5px;');
console.log('%cDesigns that Speak, Visuals that Connect', 'font-size: 14px; color: #667eea; margin-top: 10px;');
console.log('Website powered by modern web technologies');

// Export functions for use in other scripts if needed
window.EvansoMedia = {
    showNotification,
    performSearch,
    validateEmail
};
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = content.style.display === 'block';
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.querySelector('.accordion-content').style.display = 'none';
        item.querySelector('.fas').classList.remove('rotate');
      });
      if (!isOpen) {
        content.style.display = 'block';
        header.querySelector('.fas').classList.add('rotate');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.slider-wrapper');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let currentIndex = 0;

  const updateSlider = () => {
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === slides.length - 1;
  };

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  updateSlider(); // Initialize slider
});

