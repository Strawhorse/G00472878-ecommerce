// routes/pages.js
// Handles all GET requests that render pages

const express = require("express");
const router = express.Router();

const pool = require("../db/db");



const requireLogin = (req, res, next) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
};



/*
|--------------------------------------------------------------------------
| Home
|--------------------------------------------------------------------------
| Random hero image on refresh
*/
router.get("/", (req, res) => {

    const heroImages = ["hero1.jpg", "hero2.jpg", "hero3.jpg"];
    const randomHero = heroImages[Math.floor(Math.random() * heroImages.length)];

    res.render("home", {
        title: "Homepage",
        heroImage: randomHero
    });
});



/*
|--------------------------------------------------------------------------
| Products
|--------------------------------------------------------------------------
| Loads products from DB
*/
router.get("/products", async (req, res) => {

    try {

        const [rows] = await pool.query(
            "SELECT id, name, description, price, image FROM products ORDER BY id"
        );

        res.render("products", {
            title: "Mobile Phones",
            products: rows
        });

    } catch (err) {
        console.error("DB error loading products", err);
        res.status(500).send("Database error loading products");
    }
});



/*
|--------------------------------------------------------------------------
| Product details
|--------------------------------------------------------------------------
*/
router.get("/products/:id", async (req, res) => {

    try {

        const productId = req.params.id;

        const [rows] = await pool.query(
            "SELECT id, name, description, price, image FROM products WHERE id = ? LIMIT 1",
            [productId]
        );

        if (rows.length === 0) {
            return res.status(404).send("Product not found");
        }

        res.render("productDetails", {
            title: rows[0].name,
            product: rows[0]
        });

    } catch (err) {
        console.error("DB error loading product details", err);
        res.status(500).send("Database error loading product");
    }
});



/*
|--------------------------------------------------------------------------
| Cart
|--------------------------------------------------------------------------
*/
router.get("/cart", (req, res) => {

    const cartItems = Object.values(req.session.cart || {});
    const total = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.qty),
        0
    );

    res.render("cart", {
        title: "Your Cart",
        cartItems,
        total
    });
});



/*
|--------------------------------------------------------------------------
| Login page
|--------------------------------------------------------------------------
*/
router.get("/login", (req, res) => {

    res.render("login", {
        title: "Login",
        error: null
    });
});



/*
|--------------------------------------------------------------------------
| Account page
|--------------------------------------------------------------------------
| Requires login
| Shows last order
*/
router.get("/account", requireLogin, (req, res) => {

    res.render("account", {
        title: "Account",
        lastOrder: req.session.lastOrder || null
    });
});



/*
|--------------------------------------------------------------------------
| Static placeholders
|--------------------------------------------------------------------------
*/
router.get("/about", (req, res) => {
    res.render("home", {
        title: "About (Coming Next)",
        heroImage: null
    });
});



module.exports = router;
