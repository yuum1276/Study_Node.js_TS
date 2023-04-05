"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var users_route_1 = require("./users/users.route");
var post_route_1 = require("./posts/post.route");
var mysql = require("mysql2/promise");
var validationResult = require('express-validator').validationResult;
var Server = (function () {
    function Server() {
        var app = express();
        this.app = app;
    }
    Server.prototype.dbConnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, _a, rows, fields, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, mysql.createConnection({
                            host: 'localhost',
                            user: 'root',
                            database: 'node_type',
                        })];
                    case 1:
                        connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4, connection.query('SELECT id, title, content FROM posts;')];
                    case 3:
                        _a = _b.sent(), rows = _a[0], fields = _a[1];
                        rows.forEach(function (row) {
                            console.log('id: ', row.id, 'title', row.title, 'content: ', row.content);
                        });
                        fields.forEach(function (field) {
                            console.log('table: ', field.table);
                        });
                        return [3, 5];
                    case 4:
                        err_1 = _b.sent();
                        throw err_1;
                    case 5: return [2];
                }
            });
        });
    };
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
        this.dbConnect();
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