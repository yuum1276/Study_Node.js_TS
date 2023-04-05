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
exports.deletePost = exports.updatePart = exports.updatePost = exports.createPost = exports.getPost = exports.getPostList = void 0;
var post_model_1 = require("./post.model");
var getPostList = function (req, res) {
    try {
        var posts = post_model_1.Post;
        res.status(200).send({
            success: true,
            data: {
                posts: posts,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};
exports.getPostList = getPostList;
var getPost = function (req, res) {
    try {
        var params_1 = req.params;
        console.log(params_1);
        var post = post_model_1.Post.find(function (post) {
            return post.id === params_1.id;
        });
        res.status(200).send({
            success: true,
            data: {
                post: post,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};
exports.getPost = getPost;
var createPost = function (req, res) {
    try {
        var post = req.body;
        console.log(post);
        post_model_1.Post.push(post);
        res.status(200).send({
            success: true,
            data: { post: post },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};
exports.createPost = createPost;
var updatePost = function (req, res) {
    try {
        var params_2 = req.params;
        var body_1 = req.body;
        var result_1;
        post_model_1.Post.forEach(function (post) {
            if (post.id === params_2.id) {
                post = body_1;
                result_1 = post;
            }
        });
        res.status(200).send({
            success: true,
            data: {
                result: result_1,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};
exports.updatePost = updatePost;
var updatePart = function (req, res) {
    try {
        var params_3 = req.params;
        var body_2 = req.body;
        var result_2;
        post_model_1.Post.forEach(function (post) {
            if (post.id === params_3.id) {
                post = __assign(__assign({}, post), body_2);
                result_2 = post;
            }
        });
        res.status(200).send({
            success: true,
            data: {
                result: result_2,
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
var deletePost = function (req, res) {
    try {
        var params_4 = req.params;
        var newpost = post_model_1.Post.filter(function (post) { return post.id !== params_4.id; });
        res.status(200).send({
            success: true,
            data: newpost,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};
exports.deletePost = deletePost;
//# sourceMappingURL=post.service.js.map