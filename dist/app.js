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
var express_1 = require("express");
var mysql = require("mysql2/promise");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var conn, app, port;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, mysql.createConnection({
                        host: 'localhost',
                        user: 'root',
                        database: 'node_ts',
                    })];
                case 1:
                    conn = _a.sent();
                    app = express_1.default();
                    port = 3000;
                    app.use(function (err, req, res, next) {
                        console.error(err.stack);
                        res.status(500).send('Something went wrong!');
                    });
                    app.use(express_1.default.json());
                    app.use(express_1.default.urlencoded({ extended: false }));
                    app.get('/users', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                        var rows, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4, conn.query("SELECT * FROM users")];
                                case 1:
                                    rows = _a.sent();
                                    console.log(rows);
                                    res.send(rows);
                                    return [3, 3];
                                case 2:
                                    err_1 = _a.sent();
                                    console.log(err_1);
                                    next(err_1);
                                    return [3, 3];
                                case 3: return [2];
                            }
                        });
                    }); });
                    app.get('/users/:id', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                        var email, rows, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    email = req.params.email;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4, conn.query('SELECT email FROM users WHERE `email` = ?', [email])];
                                case 2:
                                    rows = _a.sent();
                                    if (rows === null) {
                                        return [2, res.status(404).send('User not found')];
                                    }
                                    res.send(rows);
                                    return [3, 4];
                                case 3:
                                    err_2 = _a.sent();
                                    next(err_2);
                                    return [3, 4];
                                case 4: return [2];
                            }
                        });
                    }); });
                    app.post('/signup', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, email, password, result, user, err_3;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    _a = req.params, email = _a.email, password = _a.password;
                                    return [4, conn.query('INSERT INTO `users` (`email`, `password`) VALUES (?, ?)', [email, password])];
                                case 1:
                                    result = _b.sent();
                                    user = {
                                        email: email,
                                        password: password
                                    };
                                    return [2, user];
                                case 2:
                                    err_3 = _b.sent();
                                    console.log(err_3);
                                    return [2, (err_3)];
                                case 3: return [2];
                            }
                        });
                    }); });
                    app.post('/login', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, email, password, rows;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = req.params, email = _a.email, password = _a.password;
                                    return [4, conn.query('SELECT * FROM `users` WHERE `email` = ?', [email])];
                                case 1:
                                    rows = _b.sent();
                                    return [2];
                            }
                        });
                    }); });
                    app.get('/posts', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                        var rows, err_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4, conn.query('SELECT id, title, content, created_at, updated_at FROM posts')];
                                case 1:
                                    rows = _a.sent();
                                    res.send(rows);
                                    return [3, 3];
                                case 2:
                                    err_4 = _a.sent();
                                    next(err_4);
                                    return [3, 3];
                                case 3: return [2];
                            }
                        });
                    }); });
                    app.get('/posts/:id', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                        var id, rows, err_5;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    id = req.params.id;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4, conn.query('SELECT id, title, content, created_at, updated_at FROM posts WHERE id = ?', [id])];
                                case 2:
                                    rows = _a.sent();
                                    if (rows === null) {
                                        return [2, res.status(404).send('Post not found')];
                                    }
                                    res.send(rows);
                                    return [3, 4];
                                case 3:
                                    err_5 = _a.sent();
                                    next(err_5);
                                    return [3, 4];
                                case 4: return [2];
                            }
                        });
                    }); });
                    app.listen(port, function () {
                        console.log("Server running on port " + port);
                    });
                    return [2];
            }
        });
    });
}
main();
//# sourceMappingURL=app.js.map