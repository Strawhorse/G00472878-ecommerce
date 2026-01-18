// app.js
// Entry point for the web app
// Run with npm start

const path = require("path");
const express = require("express");
const session = require("express-session");


const app = express();
const PORT = process.env.PORT || 3000;


app.set("view engine", "ejs");


// Static files
app.use(express.static(path.join(__dirname, "public")));


// Form parsing
app.use(express.urlencoded({ extended: false }));


// Sessions
app.use(
    session({
        secret: "dev-secret-change-me-later",
        resave: false,
        saveUninitialized: true,
    })
);


// Make session data available to all EJS templates
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.cart = req.session.cart || {};
    next();
});


// Routes
const pagesRoutes = require("./routes/pages");
const actionsRoutes = require("./routes/actions");

app.use("/", pagesRoutes);
app.use("/", actionsRoutes);


// 404 fallback
app.use((req, res) => {
    res.status(404).send("404 - Page not found");
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
