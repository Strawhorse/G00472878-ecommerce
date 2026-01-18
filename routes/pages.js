// routes/pages.js
// Handles all "page" routes (GET requests that render EJS views)

const express = require("express");
const router = express.Router();

// Import the MySQL connection pool
// This allows us to query the database using async/await
const pool = require("../db/db");

/*
|--------------------------------------------------------------------------
| HOME PAGE
|--------------------------------------------------------------------------
| Displays the homepage with a random hero image.
| No database access here yet.
*/
router.get("/", (req, res) => {

    // Available hero images (stored in /public/images)
    const heroImages = ["hero1.jpg", "hero2.jpg", "hero3.jpg"];

    // Pick one at random each page load
    const randomHero = heroImages[Math.floor(Math.random() * heroImages.length)];

    // Render home.ejs and pass data into the template
    res.render("home", {
        title: "Homepage",
        heroImage: randomHero
    });
});

/*
|--------------------------------------------------------------------------
| PRODUCTS PAGE
|--------------------------------------------------------------------------
| Fetches all products from the MySQL database and
| displays them in a Bootstrap grid using products.ejs.
*/
router.get("/products", async (req, res) => {
    try {
        // Query the products table
        // Returns an array of rows (each row = one product)
        const [rows] = await pool.query(
            "SELECT id, name, description, price, image FROM products"
        );

        // Render products.ejs and pass the products to the view
        res.render("products", {
            title: "Mobile Phones",
            products: rows
        });

    } catch (err) {
        // If something goes wrong (DB offline, SQL error, etc.)
        console.error("Error loading products:", err);
        res.status(500).send("Database error loading products");
    }
});

/*
|--------------------------------------------------------------------------
| ABOUT PAGE (PLACEHOLDER)
|--------------------------------------------------------------------------
| Static page for now — real content later.
*/
router.get("/about", (req, res) => {
    res.render("home", {
        title: "About (Coming Next)",
        heroImage: null
    });
});

/*
|--------------------------------------------------------------------------
| CART PAGE
|--------------------------------------------------------------------------
| Displays all items currently stored in the session cart.
*/
router.get("/cart", (req, res) => {

    // Convert cart object into an array
    const cartItems = Object.values(req.session.cart || {});

    // Calculate total price
    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    // Render cart.ejs with cart data
    res.render("cart", {
        title: "Your Cart",
        cartItems,
        total
    });
});

/*
|--------------------------------------------------------------------------
| LOGIN PAGE (PLACEHOLDER)
|--------------------------------------------------------------------------
| Authentication will be added later.
*/
router.get("/login", (req, res) => {
    res.render("home", {
        title: "Login (Coming Next)",
        heroImage: null
    });
});

/*
|--------------------------------------------------------------------------
| ACCOUNT PAGE
|--------------------------------------------------------------------------
| Displays order confirmation and future account info.
*/
router.get("/account", (req, res) => {
    res.render("account", {
        title: "Account",
        message: null
    });
});

// Export the router so app.js can use it
module.exports = router;
