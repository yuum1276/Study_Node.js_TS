"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var users_route_1 = require("./users/users.route");
var post_route_1 = require("./posts/post.route");
var validationResult = require('express-validator').validationResult;
var Server = (function () {
    function Server() {
        var app = express();
        this.app = app;
    }
    Server.prototype.setRoute = function () {
        this.app.use(users_route_1.default);
        this.app.use(post_route_1.default);
    };
    Server.prototype.setMiddleware = function () {
        var app = express();
        this.app.use(function (req, res, next) {
            console.log(req.rawHeaders[1]);
            console.log('this is logging middleware');
            next();
        });
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.setRoute();
        this.app.use(function (req, res, next) {
            var errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        });
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
//# sourceMappingURL=app_1.js.map