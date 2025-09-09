const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/team', (req, res) => {
    res.render('team');
});

router.get('/activities', (req, res) => {
    res.render('activities');
});

router.get('/news', (req, res) => {
    res.render('news');
});

router.get('/gallery', (req, res) => {
    res.render('gallery');
});

router.get('/join', (req, res) => {
    res.render('join');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/donate', (req, res) => {
    res.render('donate'); // Assuming a donate.ejs view will be created
});

module.exports = router;
