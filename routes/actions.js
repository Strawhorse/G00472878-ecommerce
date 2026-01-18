// routes/actions.js

const express = require("express");

const router = express.Router();


// Place order
router.post("/order/place", (req, res) => {

    const cart = req.session.cart || {};

    const cartItems = Object.values(cart);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    req.session.lastOrder = {
        placedAt: new Date().toISOString(),
        items: cartItems,
        total
    };

    req.session.cart = {};

    res.redirect("/account");
});


module.exports = router;
