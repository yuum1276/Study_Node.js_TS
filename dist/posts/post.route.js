"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var post_service_1 = require("./post.service");
var router = express_1.Router();
router.get('/board', post_service_1.getPostList);
router.get('/board/:id', post_service_1.getPost);
router.post('/board', post_service_1.createPost);
router.put('/board/:id', post_service_1.updatePost);
router.patch('/board/:id', post_service_1.updatePart);
router.delete('/board/:id', post_service_1.deletePost);
exports.default = router;
//# sourceMappingURL=post.route.js.map