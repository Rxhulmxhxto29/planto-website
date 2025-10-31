// Products Data (same as in script.js)
const products = [
    {
        id: 1,
        name: 'Calathea Orbifolia',
        tag: 'AIR PURIFYING',
        price: 45,
        priceStr: '$45',
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500',
        description: 'Beautiful striped leaves that purify your indoor air naturally'
    },
    {
        id: 2,
        name: 'Monstera Deliciosa',
        tag: 'TROPICAL',
        price: 65,
        priceStr: '$65',
        image: 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b58?w=500',
        description: 'Iconic split leaves that bring tropical vibes to your space'
    },
    {
        id: 3,
        name: 'Snake Plant',
        tag: 'LOW MAINTENANCE',
        price: 35,
        priceStr: '$35',
        image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=500',
        description: 'Hardy plant perfect for beginners, thrives with minimal care'
    },
    {
        id: 4,
        name: 'Fiddle Leaf Fig',
        tag: 'STATEMENT',
        price: 85,
        priceStr: '$85',
        image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500',
        description: 'Large glossy leaves make a bold statement in any room'
    },
    {
        id: 5,
        name: 'Pothos Golden',
        tag: 'TRAILING',
        price: 28,
        priceStr: '$28',
        image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=500',
        description: 'Fast-growing trailing vine perfect for hanging baskets'
    },
    {
        id: 6,
        name: 'Rubber Plant',
        tag: 'HARDY',
        price: 55,
        priceStr: '$55',
        image: 'https://nurserylive.com/cdn/shop/products/nurserylive-g-rubber-tree-rubber-plant-ficus-elastica-black-prince-burgundy-plant_f323c0dd-1d92-4496-89a9-499370fcc260_600x600.jpg?v=1680766044',
        description: 'Glossy burgundy leaves add elegance and color to your home'
    }
];

// Cart management
let cart = JSON.parse(localStorage.getItem('plantoCart')) || [];

// Group cart items by ID and add quantity
function getCartItems() {
    const cartMap = new Map();
    
    cart.forEach(item => {
        if (cartMap.has(item.id)) {
            cartMap.get(item.id).quantity += 1;
        } else {
            cartMap.set(item.id, { ...item, quantity: 1, price: parsePrice(item.price) });
        }
    });
    
    return Array.from(cartMap.values());
}

// Parse price string to number
function parsePrice(priceStr) {
    if (typeof priceStr === 'number') return priceStr;
    return parseFloat(priceStr.replace('$', ''));
}

// Update cart badge
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

// Show toast notification
function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 500);
    }, 3000);
}

// Render cart items
function renderCart() {
    const container = document.getElementById('cartItemsContainer');
    const emptyCart = document.getElementById('emptyCart');
    const cartItems = getCartItems();
    
    if (cartItems.length === 0) {
        container.style.display = 'none';
        emptyCart.style.display = 'block';
        updateSummary();
        return;
    }
    
    container.style.display = 'block';
    emptyCart.style.display = 'none';
    
    container.innerHTML = cartItems.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-tag">${item.tag}</div>
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-desc">${item.description}</p>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="decreaseQuantity(${item.id})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="qty-input" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="increaseQuantity(${item.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="btn-remove" onclick="removeItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    updateSummary();
}

// Update order summary
function updateSummary() {
    const cartItems = getCartItems();
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cartItems.length > 0 ? 10 : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = cartItems.length > 0 ? `$${shipping.toFixed(2)}` : '$0';
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Increase quantity
function increaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('plantoCart', JSON.stringify(cart));
        updateCartBadge();
        renderCart();
        showToast('Quantity increased');
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('plantoCart', JSON.stringify(cart));
        updateCartBadge();
        renderCart();
        
        if (cart.filter(item => item.id === productId).length === 0) {
            showToast('Item removed from cart');
        } else {
            showToast('Quantity decreased');
        }
    }
}

// Remove item completely
function removeItem(productId) {
    const itemName = cart.find(item => item.id === productId)?.name;
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('plantoCart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
    showToast(`${itemName} removed from cart`);
}

// Clear entire cart
function clearCart() {
    if (cart.length === 0) {
        showToast('Cart is already empty');
        return;
    }
    
    if (confirm('Are you sure you want to clear your entire cart?')) {
        cart = [];
        localStorage.setItem('plantoCart', JSON.stringify(cart));
        updateCartBadge();
        renderCart();
        showToast('Cart cleared');
    }
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty');
        return;
    }
    
    const total = document.getElementById('total').textContent;
    showToast(`Proceeding to checkout with ${total}`);
    
    // Here you would typically redirect to a checkout page
    setTimeout(() => {
        alert(`Checkout functionality coming soon!\n\nOrder Total: ${total}\nItems: ${cart.length}`);
    }, 1000);
}

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    renderCart();
    
    // Clear cart button
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
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
