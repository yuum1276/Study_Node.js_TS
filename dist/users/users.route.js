"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_service_1 = require("./users.service");
var router = express_1.Router();
router.get('/users', users_service_1.getUserList);
router.get('/users/:id', users_service_1.getUser);
router.post('/signup', users_service_1.createUser);
router.post('/login', users_service_1.login);
router.get('/logout', users_service_1.logout);
router.put('/users/:id', users_service_1.updateUser);
router.patch('/users/:id', users_service_1.updatePart);
router.delete('/users/:id', users_service_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.route.js.map