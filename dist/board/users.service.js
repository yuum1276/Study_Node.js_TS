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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updatePart = exports.updateUser = exports.createUser = exports.getUser = exports.getUserList = void 0;
var users_model_1 = require("./users.model");
var getUserList = function (req, res) {
    try {
        var users = users_model_1.User;
        res.status(200).send({
            success: true,
            data: {
                users: users,
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
var createUser = function (req, res) {
    try {
        var data = req.body;
        users_model_1.User.push(data);
        res.status(200).send({
            success: true,
            data: { data: data },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};
exports.createUser = createUser;
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