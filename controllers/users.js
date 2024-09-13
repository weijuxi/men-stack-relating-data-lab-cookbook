const express = require('express');
const router = express.Router();
const User = require('../models/user.js');// Assuming you have a User model defined in models directory

// GET all users (community page)
router.get('/', async (req, res) => {
  try {
      const users = await User.find({});
      res.render('users/index.ejs', { users: users });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
});

// GET a specific user's pantry (show page)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    res.render('users/show.ejs', { user: user });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
