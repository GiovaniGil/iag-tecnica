var app = require('./config/server');
var http = require('http').Server(app);

var port = process.env.PORT || 3000
http.listen(port, function() {
    console.log("servidor rodando");
})
