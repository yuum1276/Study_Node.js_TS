"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var post_route_1 = __importDefault(require("./posts/post.route"));
var users_route_1 = __importDefault(require("./users/users.route"));
var app = express_1.default();
var port = 8000;
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/posts', post_route_1.default);
app.use('/users', users_route_1.default);
var errorHandler = function (err, req, res, next) {
    res.status(500).send({
        message: 'Server Error',
        error: err,
    });
};
app.use(errorHandler);
app.listen(port, function () {
    console.log("Server running on port " + port);
});
//# sourceMappingURL=app.js.map