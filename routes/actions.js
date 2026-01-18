// routes/actions.js
// POST routes that change server state

const express = require("express");

const router = express.Router();


// Add item to cart
router.post("/cart/add", (req, res) => {

    const { productId, name, price, qty } = req.body;

    if (!req.session.cart) {
        req.session.cart = {};
    }

    const id = String(productId);
    const qtyInt = parseInt(qty, 10) || 1;

    if (req.session.cart[id]) {
        req.session.cart[id].qty += qtyInt;
    } else {
        req.session.cart[id] = {
            id,
            name,
            price: parseFloat(price),
            qty: qtyInt,
        };
    }

    res.redirect("/cart");
});


// Remove a single item
router.post("/cart/remove", (req, res) => {

    const { productId } = req.body;

    if (req.session.cart && req.session.cart[productId]) {
        delete req.session.cart[productId];
    }

    res.redirect("/cart");
});


// Clear cart
router.post("/cart/clear", (req, res) => {

    req.session.cart = {};

    res.redirect("/cart");
});


// Place order
router.post("/order/place", (req, res) => {

    const cart = req.session.cart || {};
    const items = Object.values(cart);

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    req.session.lastOrder = {
        placedAt: new Date().toISOString(),
        items,
        total,
    };

    req.session.cart = {};

    res.redirect("/account");
});


module.exports = router;
