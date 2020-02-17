var app = require('./config/server');
var http = require('http').Server(app);
var selectedPort = 3000
var port = process.env.PORT || selectedPort
http.listen(port, function() {
    console.log("servidor rodando");
})
