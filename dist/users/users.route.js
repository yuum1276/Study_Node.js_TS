"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var users_service_1 = require("./users.service");
var router = express_1.Router();
router.get('/users', users_service_1.getUserList);
router.get('/users/:id', users_service_1.getUser);
router.post('/signup', [
    express_validator_1.body('email').exists().isEmail(),
    express_validator_1.body('password').exists().isLength({ min: 10, max: 20 }),
], users_service_1.createUser);
router.post('/login', [
    express_validator_1.body('email').exists().isEmail().withMessage('이메일을 입력해주세요!'),
    express_validator_1.body('password').exists().isLength({ min: 10, max: 20 }),
], users_service_1.login);
router.get('/logout', users_service_1.logout);
router.put('/users/:id', users_service_1.updateUser);
router.patch('/users/:id', users_service_1.updatePart);
router.delete('/users/:id', users_service_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.route.js.map