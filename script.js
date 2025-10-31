// Products Data
const products = [
    {
        id: 1,
        name: 'Calathea Orbifolia',
        tag: 'AIR PURIFYING',
        price: '$45',
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500',
        description: 'Beautiful striped leaves that purify your indoor air naturally'
    },
    {
        id: 2,
        name: 'Monstera Deliciosa',
        tag: 'TROPICAL',
        price: '$65',
        image: 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b58?w=500',
        description: 'Iconic split leaves that bring tropical vibes to your space'
    },
    {
        id: 3,
        name: 'Snake Plant',
        tag: 'LOW MAINTENANCE',
        price: '$35',
        image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=500',
        description: 'Hardy plant perfect for beginners, thrives with minimal care'
    },
    {
        id: 4,
        name: 'Fiddle Leaf Fig',
        tag: 'STATEMENT',
        price: '$85',
        image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500',
        description: 'Large glossy leaves make a bold statement in any room'
    },
    {
        id: 5,
        name: 'Pothos Golden',
        tag: 'TRAILING',
        price: '$28',
        image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=500',
        description: 'Fast-growing trailing vine perfect for hanging baskets'
    },
    {
        id: 6,
        name: 'Rubber Plant',
        tag: 'HARDY',
        price: '$55',
        image: 'https://nurserylive.com/cdn/shop/products/nurserylive-g-rubber-tree-rubber-plant-ficus-elastica-black-prince-burgundy-plant_f323c0dd-1d92-4496-89a9-499370fcc260_600x600.jpg?v=1680766044',
        description: 'Glossy burgundy leaves add elegance and color to your home'
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('plantoCart')) || [];

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('plantoCart', JSON.stringify(cart));
        updateCartBadge();
        showToast(`${product.name} added to cart!`);
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 500);
    }, 3000);
}

// Render products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="plant-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="plant-tag">${product.tag}</div>
            <h3 class="plant-name">${product.name}</h3>
            <div class="dots">
                <div class="dot active"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <p class="product-desc">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">${product.price}</span>
                <button class="btn-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Navigation scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active nav link
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input');
        if (emailInput && emailInput.value) {
            showToast('Thank you for subscribing!');
            emailInput.value = '';
        }
    });
}

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart badge
    updateCartBadge();
    
    // Render products
    renderProducts();
    
    // Animate elements
    const animateElements = document.querySelectorAll('.product-card, .review-card, .showcase, .content-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Set first nav link as active
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
});

// Featured card dot navigation
const featuredDots = document.querySelectorAll('.featured-card .dot');
featuredDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        featuredDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
    });
});

// O2 section pagination
let currentO2Page = 1;
const totalO2Pages = 3;

function updateO2Pagination() {
    const pageNum = document.querySelector('.page-num');
    if (pageNum) {
        pageNum.innerHTML = `<strong>${currentO2Page}</strong> <small>/ ${totalO2Pages}</small>`;
    }
}

const prevBtn = document.querySelector('.page-btn:first-child');
const nextBtn = document.querySelector('.page-btn:last-child');

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentO2Page > 1) {
            currentO2Page--;
            updateO2Pagination();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentO2Page < totalO2Pages) {
            currentO2Page++;
            updateO2Pagination();
        }
    });
}

// Carousel dots
const carouselDots = document.querySelectorAll('.carousel-dot');
carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        carouselDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        currentO2Page = index + 1;
        updateO2Pagination();
    });
});

// Play button functionality
const playBtn = document.querySelector('.btn-play');
if (playBtn) {
    playBtn.addEventListener('click', () => {
        showToast('Video feature coming soon!');
    });
}

// Cart icon click - now handled by onclick in HTML to navigate to cart.html

// Search icon click
const searchBtn = document.querySelector('.fa-search').closest('.icon-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        showToast('Search feature coming soon!');
    });
}

// Favorite buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-fav')) {
        const heartIcon = e.target.closest('.btn-fav').querySelector('i');
        if (heartIcon.classList.contains('far')) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            showToast('Added to favorites!');
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            showToast('Removed from favorites');
        }
    }
});

// Initialize
updateO2Pagination();
