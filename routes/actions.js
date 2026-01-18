// routes/actions.js
// This file contains POST routes that "do things" (actions) rather than show pages.

const express = require("express");

// Create a router object for grouping action routes.
const router = express.Router();

// Temporary route to prove that POST handling works.
// We'll replace this later with login/cart/checkout actions.
router.post("/demo-post", (req, res) => {
    // Send a simple response so we can verify POST works in the browser/devtools.
    res.send("POST received successfully.");
});

// Export the router so app.js can use it.
module.exports = router;
