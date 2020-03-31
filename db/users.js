module.exports = {
    findByUsername: function (username) {
        return new Promise((resolve, reject) => {
            global.db.query(`select * from uzytkownicy where username = '${username}'`, (error, results) => {
                if (error) { reject(new Error(error)) }
                if (results && results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            });
        });
    }
}