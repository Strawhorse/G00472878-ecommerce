// routes/pages.js
// This file contains the GET routes that display pages to the user.

const express = require("express");

// Create a router object so we can group routes in this file.
const router = express.Router();

// Home page route.
// This shows a simple page with a shared header/footer using EJS.
router.get("/", (req, res) => {

    // A small list of hero images for the "random image on refresh" requirement.
    // We'll later display this on the home page.

    const heroImages = ["hero1.jpg", "hero2.jpg", "hero3.jpg"];

    // Pick one random image every time the page is loaded/refreshed.
    const randomHero = heroImages[Math.floor(Math.random() * heroImages.length)];

    // Render the home.ejs template and pass in data it needs.
    // this essentially renders by going from: pages.js  to  res.render(...)  to  home.ejs  and then finally to  head.ejs

    res.render("home", {
        title: "Homepage",
        heroImage: randomHero,
    });
});

// Products page route (placeholder for now).
// Products page route.
// For now we use a simple in-memory list (later we swap this for MySQL data).
router.get("/products", (req, res) => {

    // Temporary product catalog (mobile phones).
    const products = [
        {
            id: 1,
            name: "iPhone 15",
            description: "Apple iPhone 15 with improved camera and performance.",
            price: 999.00,
            image: "products/iphone15.jpg",
        },
        {
            id: 2,
            name: "Samsung Galaxy S24",
            description: "Samsung flagship with AMOLED display and fast performance.",
            price: 899.00,
            image: "products/galaxyS24.jpg",
        },
        {
            id: 3,
            name: "Google Pixel 8",
            description: "Clean Android experience with excellent photography.",
            price: 799.00,
            image: "products/pixel8.jpg",
        },
        {
            id: 4,
            name: "OnePlus 12",
            description: "Fast, smooth, and great value flagship phone.",
            price: 749.00,
            image: "products/oneplus12.jpg",
        },
        {
            id: 5,
            name: "Xiaomi 13",
            description: "High-end specs at a competitive price.",
            price: 699.00,
            image: "products/xiaomi13.jpg",
        },
    ];

    // Render the products page and pass the product list to the template.
    res.render("products", {
        title: "Mobile Phones",
        products,
    });
});

// About page route (placeholder for now).
router.get("/about", (req, res) => {
    res.render("home", {
        title: "About (Coming Next)",
        heroImage: null,
    });
});

// Cart page route (placeholder for now).
router.get("/cart", (req, res) => {
    res.render("home", {
        title: "Cart (Coming Next)",
        heroImage: null,
    });
});

// Login page route (placeholder for now).
router.get("/login", (req, res) => {
    res.render("home", {
        title: "Login (Coming Next)",
        heroImage: null,
    });
});

// Account page route (placeholder for now).
router.get("/account", (req, res) => {
    res.render("home", {
        title: "Account (Coming Next)",
        heroImage: null,
    });
});

// Export the router so app.js can use it.
module.exports = router;
