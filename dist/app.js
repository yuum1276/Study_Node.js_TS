"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var post_route_1 = __importDefault(require("./posts/post.route"));
var users_route_1 = __importDefault(require("./users/users.route"));
var Server = (function () {
    function Server() {
        var app = express_1.default();
        this.app = app;
    }
    Server.prototype.setRouter = function () {
        this.app.use('/posts', post_route_1.default);
        this.app.use('/users', users_route_1.default);
    };
    Server.prototype.setMiddleware = function () {
        this.app.use(function (req, res, next) {
            console.log(req.rawHeaders[1]);
            console.log('this is logging middleware');
            next();
        });
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.setRouter();
        this.app.use(function (req, res, next) {
            console.log('This is error middleware');
            return res.send({ error: '404 not found error' });
        });
    };
    Server.prototype.listen = function () {
        var port = 8000;
        this.setMiddleware();
        this.app.listen(port, function () {
            console.log("Server running on port " + port);
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