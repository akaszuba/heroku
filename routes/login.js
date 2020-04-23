const passport = require("passport");
module.exports = {
    index: (req, res) => {
        res.render('login.ejs', {

        });
    },
    login: (req, res) => {
        global.passport.authenticate('local', { failureRedirect: '/login' });
                 res.redirect('/');
        
    }
}