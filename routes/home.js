module.exports = {
    index: function (req, res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('hello');
    }
}