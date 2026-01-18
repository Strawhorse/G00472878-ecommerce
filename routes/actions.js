// routes/actions.js
// Handles POST requests that change data

const express = require("express");
const router = express.Router();

const pool = require("../db/db");



/*
|--------------------------------------------------------------------------
| Login submit
|--------------------------------------------------------------------------
| Validates against DB users table
| Stores user in session
*/
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const [rows] = await pool.query(
            "SELECT id, email FROM users WHERE email = ? AND password = ? LIMIT 1",
            [email, password]
        );

        if (rows.length === 0) {
            return res.status(401).render("login", {
                title: "Login",
                error: "Invalid email or password"
            });
        }

        req.session.user = {
            id: rows[0].id,
            email: rows[0].email
        };

        res.redirect("/account");

    } catch (err) {
        console.error("DB error during login", err);

        res.status(500).render("login", {
            title: "Login",
            error: "Server error during login"
        });
    }
});



/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/
router.post("/logout", (req, res) => {

    req.session.user = null;

    res.redirect("/");
});



/*
|--------------------------------------------------------------------------
| Add to cart
|--------------------------------------------------------------------------
*/
router.post("/cart/add", (req, res) => {

    const { productId, name, price, qty } = req.body;

    if (!req.session.cart) {
        req.session.cart = {};
    }

    const id = String(productId);
    const qtyNum = parseInt(qty, 10) || 1;
    const priceNum = Number(price);

    if (req.session.cart[id]) {
        req.session.cart[id].qty += qtyNum;
    } else {
        req.session.cart[id] = {
            id,
            name,
            price: priceNum,
            qty: qtyNum
        };
    }

    res.redirect("/cart");
});



/*
|--------------------------------------------------------------------------
| Remove item
|--------------------------------------------------------------------------
*/
router.post("/cart/remove", (req, res) => {

    const { productId } = req.body;

    if (req.session.cart && req.session.cart[String(productId)]) {
        delete req.session.cart[String(productId)];
    }

    res.redirect("/cart");
});



/*
|--------------------------------------------------------------------------
| Clear cart
|--------------------------------------------------------------------------
*/
router.post("/cart/clear", (req, res) => {

    req.session.cart = {};

    res.redirect("/cart");
});



/*
|--------------------------------------------------------------------------
| Place order
|--------------------------------------------------------------------------
| Requires login
| Saves lastOrder then clears cart
*/
router.post("/order/place", (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    const cartItems = Object.values(req.session.cart || {});

    if (cartItems.length === 0) {
        req.session.lastOrder = null;
        return res.redirect("/account");
    }

    const total = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.qty),
        0
    );

    req.session.lastOrder = {
        items: cartItems,
        total,
        placedAt: new Date().toISOString()
    };

    req.session.cart = {};

    res.redirect("/account");
});



module.exports = router;
