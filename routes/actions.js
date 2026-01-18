// routes/actions.js
// POST routes that change state like cart actions

const express = require("express");

const router = express.Router();


// Add a product to the cart
router.post("/cart/add", (req, res) => {

    // Product details coming from the products form
    const { productId, name, price, qty } = req.body;

    // Create cart storage on first use
    if (!req.session.cart) {
        req.session.cart = {};
    }

    // Convert qty and price into real numbers
    const quantity = parseInt(qty, 10);
    const unitPrice = parseFloat(price);

    // Basic safety for weird values
    const safeQty = Number.isNaN(quantity) || quantity < 1 ? 1 : quantity;
    const safePrice = Number.isNaN(unitPrice) || unitPrice < 0 ? 0 : unitPrice;

    // If item already exists, just increase qty
    if (req.session.cart[productId]) {
        req.session.cart[productId].qty += safeQty;
    } else {

        // Otherwise create a new cart entry
        req.session.cart[productId] = {
            id: productId,
            name,
            price: safePrice,
            qty: safeQty
        };
    }

    // Send user to the cart page to view the result
    res.redirect("/cart");
});


// Remove a product from the cart entirely
router.post("/cart/remove", (req, res) => {

    // Product id to remove
    const { productId } = req.body;

    // If cart exists and item exists, delete it
    if (req.session.cart && req.session.cart[productId]) {
        delete req.session.cart[productId];
    }

    // Back to cart page
    res.redirect("/cart");
});


// Clear the whole cart
router.post("/cart/clear", (req, res) => {

    // Reset cart back to empty object
    req.session.cart = {};

    // Back to cart page
    res.redirect("/cart");
});


// Place order placeholder
router.post("/order/place", (req, res) => {

    // Clear cart after placing order
    req.session.cart = {};

    // Go back to account page
    res.redirect("/account");
});







// Export router to app.js
module.exports = router;
