
// Middleware to check if the user is signed in




const isSignedIn = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/auth/sign-in');
};
  
module.exports = isSignedIn;