// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab
router.get('/', async (req, res) => {
    try {
        res.render('foods/index.ejs');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    try {
        res.render('foods/new.ejs');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        currentUser.foods.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${req.params.userId}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



module.exports = router;