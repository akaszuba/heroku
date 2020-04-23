const users = require("../db/users")

module.exports = {
    index: function (req, res) {


        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }

        res.render('home.ejs', {
            title: !req.isAuthenticated() ? "auth" : req.user



        });

    }
}