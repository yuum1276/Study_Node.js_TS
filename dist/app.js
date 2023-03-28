"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var users_route_1 = require("./users/users.route");
var board_route_1 = require("./board/board.route");
var mysql = require('mysql');
var validationResult = require('express-validator').validationResult;
var con = mysql.createConnection({
    host: 'localhost',
    user: 'node_ts',
    password: 'dbal3326@@',
    database: 'node_ts',
});
var Server = (function () {
    function Server() {
        var app = express();
        con.connect(function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('mysql connected.');
            }
        });
        this.app = app;
    }
    Server.prototype.setRoute = function () {
        this.app.use(users_route_1.default);
        this.app.use(board_route_1.default);
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
//# sourceMappingURL=app.js.map