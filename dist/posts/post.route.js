"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var post_service_1 = require("../posts/post.service");
var router = express_1.Router();
router.get('/', post_service_1.getPostList);
router.get('/:id', post_service_1.getPost);
router.post('/create', post_service_1.createPost);
router.put('/posts/:id', post_service_1.updatePost);
router.delete('/:id', post_service_1.deletePost);
exports.default = router;
//# sourceMappingURL=post.route.js.map