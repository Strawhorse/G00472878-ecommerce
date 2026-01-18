// routes/pages.js
// GET routes that render pages

const express = require("express");

const router = express.Router();

const productsRepo = require("../data/productsRepo");



// Home page
router.get("/", (req, res) => {

    const heroImages = ["hero1.jpg", "hero2.jpg", "hero3.jpg"];
    const randomHero = heroImages[Math.floor(Math.random() * heroImages.length)];

    res.render("home", {
        title: "Homepage",
        heroImage: randomHero,
    });
});


// Products page
router.get("/products", (req, res) => {
    const products = productsRepo.getAllProducts();

    res.render("products", {
        title: "Mobile Phones",
        products
    });
});



// About placeholder
router.get("/about", (req, res) => {
    res.render("home", {
        title: "About (Coming Next)",
        heroImage: null,
    });
});


// Cart page
router.get("/cart", (req, res) => {

    const cartItems = Object.values(req.session.cart || {});

    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    res.render("cart", {
        title: "Your Cart",
        cartItems,
        total,
    });
});


// Account page shows last order
router.get("/account", (req, res) => {

    const lastOrder = req.session.lastOrder || null;

    res.render("account", {
        title: "Account",
        lastOrder,
    });
});


// Login placeholder
router.get("/login", (req, res) => {
    res.render("home", {
        title: "Login (Coming Next)",
        heroImage: null,
    });
});


module.exports = router;
