const passport = require("passport");
module.exports = {
    index: (req, res) => {
        res.render('login.ejs', {

           message:req.flash('message')
        });
    },
    login:(req,res)=>{
        global.passport.authenticate('local', { failureRedirect: '/login',  failureMessage: true }),
            function(req, res) {
            res.redirect('/');
    }}

}