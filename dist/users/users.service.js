"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.deleteUser = exports.updatePart = exports.updateUser = exports.logout = exports.login = exports.createUser = exports.getUser = exports.getUserList = void 0;
var users_model_1 = require("./users.model");
var uuid_1 = require("uuid");
var users = [];
var getUserList = function (req, res) {
    try {
        var users_1 = users_model_1.User;
        res.status(200).send({
            success: true,
            data: {
                users: users_1,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};
exports.getUserList = getUserList;
var getUser = function (req, res) {
    try {
        var params_1 = req.params;
        console.log(params_1);
        var user = users_model_1.User.find(function (user) {
            return user.id === params_1.id;
        });
        res.status(200).send({
            success: true,
            data: {
                user: user,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};
exports.getUser = getUser;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, password, email, existingUser, newUser;
    return __generator(this, function (_b) {
        _a = req.body, name = _a.name, password = _a.password, email = _a.email;
        existingUser = users.find(function (user) { return user.name === name; });
        if (existingUser) {
            return [2, res.send("이미 사용중입니당")];
        }
        newUser = { id: uuid_1.v4(), name: name, password: password, email: email };
        users.push(newUser);
        console.log(newUser);
        return [2, res.send("\uD658\uC601\uD569\uB2C8\uB2F9\uD83D\uDE0A")];
    });
}); };
exports.createUser = createUser;
var login = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (!email || !password) {
        return res.status(400).send("이메일과 비밀번호를 입력해주세용");
    }
    var user = users_model_1.User.find(function (user) { return user.email === email; });
    if (!user) {
        return res.status(401).send("이메일을 확인해주세용");
    }
    res.json({ message: "로그인 성공🙌", user: user });
};
exports.login = login;
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json({ message: "로그아웃🥲" });
        return [2];
    });
}); };
exports.logout = logout;
var updateUser = function (req, res) {
    try {
        var params_2 = req.params;
        var body_1 = req.body;
        var result_1;
        users_model_1.User.forEach(function (user) {
            if (user.id === params_2.id) {
                user = body_1;
                result_1 = user;
            }
        });
        res.status(200).send({
            success: true,
            data: {
                user: result_1,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};
exports.updateUser = updateUser;
var updatePart = function (req, res) {
    try {
        var params_3 = req.params;
        var body_2 = req.body;
        var result_2;
        users_model_1.User.forEach(function (user) {
            if (user.id === params_3.id) {
                user = __assign(__assign({}, user), body_2);
                result_2 = user;
            }
        });
        res.status(200).send({
            success: true,
            data: {
                user: result_2,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};
exports.updatePart = updatePart;
var deleteUser = function (req, res) {
    try {
        var params_4 = req.params;
        var newuser = users_model_1.User.filter(function (user) { return user.id !== params_4.id; });
        res.status(200).send({
            success: true,
            data: newuser,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.service.js.map