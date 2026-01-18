// routes/pages.js
// GET routes that render pages

const express = require("express");

const router = express.Router();


// Home page
router.get("/", (req, res) => {

    // Hero images shown randomly on refresh
    const heroImages = ["hero1.jpg", "hero2.jpg", "hero3.jpg"];

    const randomHero =
        heroImages[Math.floor(Math.random() * heroImages.length)];

    // Render homepage
    res.render("home", {
        title: "Homepage",
        heroImage: randomHero
    });
});


// Products page
router.get("/products", (req, res) => {

    // Temporary in-memory product list
    const products = [
        {
            id: 1,
            name: "iPhone 15",
            description: "Apple iPhone 15 with improved camera and performance",
            price: 999.00,
            image: "products/iphone15.jpg"
        },
        {
            id: 2,
            name: "Samsung Galaxy S24",
            description: "Samsung flagship with AMOLED display",
            price: 899.00,
            image: "products/galaxyS24.jpg"
        }
        // etc
    ];

    // Render products page
    res.render("products", {
        title: "Mobile Phones",
        products
    });
});


// Cart page
router.get("/cart", (req, res) => {

    // Convert cart object into array for EJS looping
    const cartItems = Object.values(req.session.cart || {});

    // Calculate cart total
    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    // Render cart page
    res.render("cart", {
        title: "Your Cart",
        cartItems,
        total
    });
});


// Export routes
module.exports = router;
