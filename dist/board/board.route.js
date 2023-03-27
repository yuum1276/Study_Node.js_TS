"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var board_service_1 = require("./board.service");
var router = express_1.Router();
router.get('/board', board_service_1.getPostList);
router.get('/board/:id', board_service_1.getPost);
router.post('/board', board_service_1.createPost);
router.put('/board/:id', board_service_1.updatePost);
router.patch('/board/:id', board_service_1.updatePart);
router.delete('/board/:id', board_service_1.deletePost);
exports.default = router;
//# sourceMappingURL=board.route.js.map