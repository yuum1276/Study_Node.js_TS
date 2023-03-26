"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var users_route_1 = require("./users/users.route");
var Server = (function () {
    function Server() {
        var app = express();
        this.app = app;
    }
    Server.prototype.setRoute = function () {
        this.app.use(users_route_1.default);
    };
    Server.prototype.setMiddleware = function () {
        var app = express();
        this.app.use(function (req, res, next) {
            console.log(req.rawHeaders[1]);
            console.log('this is logging middleware');
            next();
        });
        this.app.use(express.json());
        this.setRoute();
        this.app.use(function (req, res, next) {
            console.log('This is error middleware');
            res.send({ error: '404 not found error' });
        });
    };
    Server.prototype.listen = function () {
        var port = 8000;
        this.setMiddleware();
        this.app.listen(port, function () {
            console.log("App listening at http://localhost:" + port);
        });
    };
    return Server;
}());
function init() {
    var server = new Server();
    server.listen();
}
init();
//# sourceMappingURL=app.js.map