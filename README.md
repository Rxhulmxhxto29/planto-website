# Planto - Plant E-Commerce Website 🌿

A modern, interactive plant e-commerce website with a beautiful glassmorphism design and dark green nature theme.

🌐 **Live Demo**: [https://rxhulmxhxto29.github.io/planto-website/](https://rxhulmxhxto29.github.io/planto-website/)

![Planto Website](https://img.shields.io/badge/Status-Active-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🌟 Features

- **Modern Glassmorphism Design** - Beautiful backdrop blur effects and transparent elements
- **Shopping Cart System** - Full-featured cart with quantity controls and persistent storage
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Animations** - Smooth scroll animations and hover effects
- **Product Catalog** - Browse 6 different plant varieties with detailed descriptions
- **Customer Reviews** - Display customer testimonials and ratings
- **Newsletter Subscription** - Email subscription form for updates
- **Local Storage** - Cart data persists across browser sessions

## 🚀 Live Demo

Open `index.html` in your browser to see the website in action!

## 📁 Project Structure

```
planto-website/
│
├── index.html          # Main homepage
├── cart.html           # Shopping cart page
├── style.css           # Main stylesheet
├── cart.css            # Cart page styles
├── script.js           # Main JavaScript functionality
├── cart.js             # Cart page functionality
└── README.md           # Project documentation
```

## 🎨 Design Features

### Color Palette
- **Primary Green**: #55B000
- **Dark Background**: #1B2316
- **Accent Yellow**: #FFF84E
- **White Overlays**: rgba(255, 255, 255, 0.05)

### Key Technologies
- HTML5 semantic markup
- CSS3 with modern features (Grid, Flexbox, Backdrop-filter)
- Vanilla JavaScript (ES6+)
- Font Awesome 6.5.1 icons
- Google Fonts (Inter)

## 🛒 Cart Features

- ✅ Add items to cart from product listings
- ✅ View all cart items with images and details
- ✅ Increase/decrease quantity for each item
- ✅ Remove individual items
- ✅ Clear entire cart
- ✅ Real-time price calculations
- ✅ Order summary with subtotal, shipping, and tax
- ✅ Persistent cart using localStorage

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/planto-website.git
```

2. Navigate to the project directory:
```bash
cd planto-website
```

3. Open `index.html` in your browser:
```bash
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

Or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

## 🎯 Usage

### Main Page (`index.html`)
- Browse featured plants and trending collections
- View top-selling products
- Read customer reviews
- Explore O2 plant collections
- Add items to cart by clicking the cart icon on products

### Cart Page (`cart.html`)
- View all items in your cart
- Adjust quantities using +/- buttons
- Remove unwanted items
- See real-time price calculations
- Proceed to checkout

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📱 Responsive Breakpoints

- **Desktop**: 1400px+
- **Laptop**: 1024px - 1399px
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🔧 Customization

### Changing Colors
Edit the CSS custom properties in `style.css`:
```css
:root {
    --primary: #55B000;
    --dark: #1B2316;
    --yellow: #FFF84E;
}
```

### Adding Products
Edit the `products` array in `script.js` and `cart.js`:
```javascript
const products = [
    {
        id: 7,
        name: 'Your Plant Name',
        tag: 'CATEGORY',
        price: 50,
        priceStr: '$50',
        image: 'url-to-image',
        description: 'Plant description'
    }
];
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with 💚 by [Your Name]

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For questions or suggestions, please open an issue on GitHub.

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

**Planto** - Breathe Natural 🌿
