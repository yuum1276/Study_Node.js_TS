"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_service_1 = require("./users.service");
var router = express_1.Router();
router.get('/', users_service_1.getUserList);
router.get('/:id', users_service_1.getUser);
router.post('/join', users_service_1.join);
router.post('/login', users_service_1.login);
exports.default = router;
//# sourceMappingURL=users.route.js.map