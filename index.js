require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Note: Mongoose is imported but not used in this file.
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views')); // Set views directory

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/pages'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
