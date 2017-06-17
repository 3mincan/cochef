const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

if (process.env.NODE_ENV != 'production') {
    app.use(require('./build'));
}

app.use('/public', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, function() {
    console.log("I'm listening on port " + port)
});
