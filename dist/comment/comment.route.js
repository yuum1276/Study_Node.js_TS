"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var comment_service_1 = require("./comment.service");
var router = express_1.Router();
router.get('/', comment_service_1.getCommentList);
router.post('/', comment_service_1.createComment);
router.get('/:parent_id', comment_service_1.reComment);
exports.default = router;
//# sourceMappingURL=comment.route.js.map