// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
            foods: currentUser.pantry,
        });
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


// create route ‘/users/:userId/foods’
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error,"<-----------------error");
        res.render('foods/new.ejs', { errorMessages: 'Error creating food item.' });
    }
});


// show route ‘/users/:userId/foods/:itemId’
router.get('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const pantry = currentUser.pantry.id(req.params.foodId);
        res.render('foods/show.ejs', {
            food: pantry,
        });
    } catch (error) {
        console.log(error,"<-----------------error");
        res.redirect('/');
    }
});


// edit route ‘/users/:userId/foods/:itemId/edit’
router.get('/:foodId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const pantry = currentUser.pantry.id(req.params.foodId);
        res.render('foods/edit.ejs', {
            food: pantry,
        });
    } catch (error) {
        console.log(error,"<-----------------error");
        res.redirect('/');
    }
});


// update route ‘/users/:userId/foods/:itemId’
router.put('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const pantry = currentUser.pantry.id(req.params.foodId);
        pantry.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error,"<-----------------error");
        res.redirect('/');
    }
});




//delete route ‘/users/:userId/foods/:itemId’
router.delete('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.foodId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error,"<-----------------error");
        res.redirect('/');
    }
});

module.exports = router;