const users = require("../db/users")

module.exports = {
    index: function (req, res) {

       
            res.render('home.ejs', {
                

           
        });

    }
}