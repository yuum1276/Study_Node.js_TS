"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var comment_service_1 = require("../comment/comment.service");
var router = express_1.Router();
router.get('/', comment_service_1.getCommentList);
router.get('/:id', comment_service_1.insertComment);
exports.default = router;
//# sourceMappingURL=comment.route.js.map