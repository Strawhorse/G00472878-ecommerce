// app.js
// This is the entry point for the entire web application.
// Node runs THIS file first when you type: npm start



// Import Express so we can create a web server easily.
const express = require("express");

// Import express-session so we can store user login + cart data between requests.
const session = require("express-session");

// Import path so we can build safe file paths (works on Windows/Mac/Linux).
const path = require("path");

// Create the Express application object (our server).
const app = express();

// Decide which port the server should listen on.
// If a hosting service sets PORT, we use it; otherwise use 3000 locally.
const PORT = process.env.PORT || 3000;

// Tell Express which template engine we want to use for rendering HTML pages.
// EJS files live in the "views" folder by default.
app.set("view engine", "ejs");




// Tell Express where our static files live (CSS, client JS, images).
// Anything inside /public can be requested by the browser directly.
app.use(express.static(path.join(__dirname, "public")));

// Tell Express how to read "form posts" from HTML forms.
// Without this, req.body will be undefined for POST requests from forms.
app.use(express.urlencoded({ extended: false }));



// Formatted this to make it easier to read
app.use(
    session({
        secret: "dev-secret",
        resave: false,
        saveUninitialized: true
    })
);


// Configure sessions so we can remember a user's cart and login status.
// This stores a session ID in a cookie in the user's browser.
app.use(
    session({
        // This secret is used to sign the session cookie (prevents tampering).
        // In a real app you'd keep this in an environment variable.
        secret: "dev-secret-change-me-later",

        // Don't resave unchanged session data on every request.
        resave: false,

        // Save a new session even if we haven't added anything to it yet.
        saveUninitialized: true,
    })
);

// Make session values available to EVERY template automatically.
// This allows the navbar/footer to show cart count or login status.
app.use((req, res, next) => {
    // Expose the logged-in user (if any) to all EJS templates.
    res.locals.user = req.session.user || null;

    // Expose the cart (if any) to all EJS templates.
    res.locals.cart = req.session.cart || [];

    // Continue to the next middleware/route handler.
    next();
});

// Import our GET routes (pages that render templates).
const pagesRoutes = require("./routes/pages");

// Import our POST routes (actions like login, add-to-cart, etc.).
const actionsRoutes = require("./routes/actions");

// Register the GET routes.
app.use("/", pagesRoutes);

// Register the POST routes.
app.use("/", actionsRoutes);

// Catch-all for any route that doesn't exist.
// This prevents "Cannot GET /whatever" messages.
app.use((req, res) => {
    res.status(404).send("404 - Page not found");
});

// Start listening for requests.
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
