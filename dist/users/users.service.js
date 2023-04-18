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
exports.logout = exports.login = exports.join = exports.getUser = exports.getUserList = void 0;
var db_1 = require("../helper/db");
var crypto_1 = require("crypto");
var token_1 = require("../helper/token");
var getUserList = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, db_1.pool.getConnection()];
            case 1:
                connection = _a.sent();
                return [4, connection.query("SELECT * FROM users").catch(function (err) {
                        console.log(err);
                        next(err);
                    })];
            case 2:
                rows = _a.sent();
                console.log(rows);
                res.send(rows);
                return [2];
        }
    });
}); };
exports.getUserList = getUserList;
var getUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, connection, rows, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4, db_1.pool.getConnection()];
            case 1:
                connection = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4, connection.query('SELECT * FROM users WHERE `id` = ?', [id])];
            case 3:
                rows = (_a.sent())[0];
                console.log(rows);
                if (!rows[0]) {
                    res.send('아이디가 없어용');
                }
                else {
                    res.send(rows);
                }
                return [3, 5];
            case 4:
                err_1 = _a.sent();
                next(err_1);
                return [3, 5];
            case 5: return [2];
        }
    });
}); };
exports.getUser = getUser;
var join = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, connection, rows, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                return [4, db_1.pool.getConnection()];
            case 1:
                connection = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, , 8]);
                return [4, connection.query('SELECT * FROM `users` WHERE `email` = ?', [data.email])];
            case 3:
                rows = (_a.sent())[0];
                console.log(rows);
                if (!(rows.length > 0)) return [3, 4];
                res.send({ message: '사용중인 이멜이에용' });
                return [3, 6];
            case 4: return [4, connection.query('INSERT INTO `users` (`email`, `nick`,`password`) VALUES (?, ?, ?)', [data.email, data.nick, data.password])];
            case 5:
                result = (_a.sent())[0];
                res.send({
                    message: data.nick + " \uD68C\uC6D0\uAC00\uC785 \uC131\uACF5! ",
                });
                _a.label = 6;
            case 6: return [3, 8];
            case 7:
                err_2 = _a.sent();
                console.log(err_2);
                return [2, err_2];
            case 8: return [2];
        }
    });
}); };
exports.join = join;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, connection, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                return [4, db_1.pool.getConnection()];
            case 1:
                connection = _a.sent();
                return [4, connection.query('SELECT email FROM `users` WHERE `email` = ? AND `password` = ?', [data.email, data.password])];
            case 2:
                rows = (_a.sent())[0];
                console.log(rows);
                if (rows.length > 0) {
                    token_1.tokenInfo.email = data.email;
                    token_1.tokenInfo.token = crypto_1.randomUUID();
                    console.log(token_1.tokenInfo.token);
                    res.send({
                        message: '로그인 성공!',
                        token: token_1.tokenInfo.token,
                    });
                }
                else {
                    res.send({
                        message: '로그인 실패',
                    });
                }
                return [2];
        }
    });
}); };
exports.login = login;
var logout = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send({ message: '로그아웃🥲' });
        return [2];
    });
}); };
exports.logout = logout;
//# sourceMappingURL=users.service.js.map