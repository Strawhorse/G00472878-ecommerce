// app.js
// Entry point for the whole app
// Node runs this first when you do npm start


// Sessions for per-user data like carts
const session = require("express-session");

// Web server framework
const express = require("express");

// Safe paths for Windows/Mac/Linux
const path = require("path");


// Create the Express server app
const app = express();

// Pick a port
const PORT = process.env.PORT || 3000;


// Use EJS templates in /views
app.set("view engine", "ejs");


// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));


// Read form POST data into req.body
app.use(express.urlencoded({ extended: false }));


// Enable sessions so each visitor has their own storage area
app.use(
    session({
        // Secret used to sign the session cookie
        secret: "dev-secret-change-me-later",

        // Avoid re-saving unchanged session data
        resave: false,

        // Create a session even before we store anything in it
        saveUninitialized: true
    })
);


// Make session data available inside every EJS template
app.use((req, res, next) => {

    // Logged in user placeholder for later
    res.locals.user = req.session.user || null;

    // Cart stored as object keyed by productId
    res.locals.cart = req.session.cart || {};

    // Total quantity across all items for navbar badge
    const items = Object.values(res.locals.cart);
    res.locals.cartCount = items.reduce((sum, item) => sum + item.qty, 0);

    next();
});





// GET routes that show pages
const pagesRoutes = require("./routes/pages");

// POST routes that do actions like add-to-cart
const actionsRoutes = require("./routes/actions");







// Register page routes
app.use("/", pagesRoutes);

// Register action routes
app.use("/", actionsRoutes);


// Fallback for unknown routes
app.use((req, res) => {
    res.status(404).send("404 - Page not found");
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
