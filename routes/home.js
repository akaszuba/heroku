const users = require("../db/users")

module.exports = {
    index: function (req, res) {

<<<<<<< HEAD
       
            res.render('home.ejs', {

                user : req.user
=======
>>>>>>> dd3592c42dff3bbed1a6c1dce0c6506b98aeeeb7

        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }

        res.render('home.ejs', {
            title: !req.isAuthenticated() ? "auth" : req.user



        });

    }
}