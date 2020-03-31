const passport = require("passport");
module.exports={
    index: (req,res)=>{
        res.render('login.ejs', {
            
        });
    },
    login:(req,res)=>{
        passport.authenticate('local', { failureRedirect: '/login' }),
            function(req, res) {
            res.redirect('/');
    }}
}