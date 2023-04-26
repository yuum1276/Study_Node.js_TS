"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPostList = void 0;
var db_1 = require("../helper/db");
var token_1 = require("../helper/token");
var getPostList = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, board, rows, _i, rows_1, row, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4, db_1.pool.getConnection()];
            case 1:
                connection = _a.sent();
                board = [];
                return [4, connection.query('SELECT * FROM posts')];
            case 2:
                rows = (_a.sent())[0];
                for (_i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                    row = rows_1[_i];
                    if (row.secret === 'n') {
                        board.push(row);
                    }
                    else {
                        board.push({ post: "🔒SECRET POST" });
                    }
                }
                res.send(board);
                return [3, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                next(err_1);
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
exports.getPostList = getPostList;
var getPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, connection, rows, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                data = req.body;
                return [4, db_1.pool.getConnection()];
            case 1:
                connection = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 8, , 9]);
                return [4, connection.query('SELECT * FROM posts WHERE id = ?', [id])];
            case 3:
                rows = (_a.sent())[0];
                if (!!rows[0]) return [3, 4];
                res.send({
                    message: '작성된 글이 없어용'
                });
                return [3, 7];
            case 4:
                if (!(rows[0].secret === 'Y')) return [3, 6];
                return [4, connection.query("SELECT * FROM posts WHERE scrtCode = ? AND id = ?", [data.scrtCode, id])];
            case 5:
                result = (_a.sent())[0];
                if (result.length > 0) {
                    res.send(rows);
                }
                else {
                    res.send({
                        message: "secret code 불일치"
                    });
                }
                return [3, 7];
            case 6: return [2, res.send(rows)];
            case 7: return [3, 9];
            case 8:
                err_2 = _a.sent();
                next(err_2);
                return [3, 9];
            case 9: return [2];
        }
    });
}); };
exports.getPost = getPost;
var createPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, connection, rows, result, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                console.log(data);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 11, , 12]);
                if (data.token === '') {
                    res.send({
                        message: '로그인 후 사용가능!',
                    });
                }
                return [4, db_1.pool.getConnection()];
            case 2:
                connection = _a.sent();
                return [4, connection.query('SELECT email FROM `users` WHERE `email` = ?', [data.email])];
            case 3:
                rows = (_a.sent())[0];
                console.log(rows);
                if (!(rows.length > 0)) return [3, 10];
                if (!(token_1.tokenInfo.token === data.token)) return [3, 9];
                if (!!data.secret) return [3, 5];
                if (!data.title || !data.content) {
                    return [2, res.send({
                            message: '제목, 내용은 필수!'
                        })];
                }
                return [4, connection.query('INSERT INTO `posts` (`title`, `content`,`email`) VALUES (?, ?, ?)', [data.title, data.content, data.email])];
            case 4:
                result = (_a.sent())[0];
                console.log(result);
                return [2, res.send({
                        title: data.title,
                        content: data.content,
                        email: data.email,
                    })];
            case 5:
                if (!data.scrtCode) return [3, 7];
                if (!data.title || !data.content) {
                    return [2, res.send({
                            message: '제목, 내용은 필수!'
                        })];
                }
                return [4, connection.query('INSERT INTO `posts` (`title`, `content`,`email`, `secret` ,`scrtCode`) VALUES (?, ?, ?, ? ,?)', [data.title, data.content, data.email, data.secret, data.scrtCode])];
            case 6:
                result = (_a.sent())[0];
                console.log(result);
                return [2, res.send({
                        title: data.title,
                        content: data.content,
                        email: data.email,
                    })];
            case 7: return [2, res.send({
                    message: '비밀번호를 입력해주세용'
                })];
            case 8: return [3, 10];
            case 9: return [2, res.send({
                    message: 'Token 불일치',
                })];
            case 10: return [3, 12];
            case 11:
                err_3 = _a.sent();
                next(err_3);
                return [3, 12];
            case 12: return [4, next()];
            case 13:
                _a.sent();
                return [2];
        }
    });
}); };
exports.createPost = createPost;
var updatePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, connection, rows, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                data = req.body;
                console.log(data);
                if (data.token === '') {
                    res.send({
                        message: '로그인 후 사용가능!',
                    });
                }
                return [4, db_1.pool.getConnection()];
            case 1:
                connection = _a.sent();
                return [4, connection.query('SELECT id FROM `posts` WHERE `email` = ? AND `id` = ? ', [data.email, id]).catch(function (err) {
                        console.log(err);
                        return err;
                    })];
            case 2:
                rows = (_a.sent())[0];
                if (!!rows[0]) return [3, 3];
                console.log('id' + id);
                res.send({
                    message: '작성된 글이 없음!'
                });
                return [3, 8];
            case 3:
                if (!(token_1.tokenInfo.email === data.email)) return [3, 7];
                if (!(token_1.tokenInfo.token === data.token)) return [3, 5];
                if (!data.title || !data.content) {
                    return [2, res.send({
                            message: '제목, 내용은 필수!'
                        })];
                }
                return [4, connection.query('UPDATE posts SET title = ?, content = ? WHERE id = ? AND email = ?', [data.title, data.content, id, data.email])];
            case 4:
                result = (_a.sent())[0];
                res.send({
                    message: '수정 완료!'
                });
                return [3, 6];
            case 5: return [2, res.send({
                    message: '로그인 후 사용가능!',
                })];
            case 6: return [3, 8];
            case 7: return [2, res.send({
                    message: '로그인 후 사용가능!',
                })];
            case 8: return [4, next()];
            case 9:
                _a.sent();
                return [2];
        }
    });
}); };
exports.updatePost = updatePost;
var deletePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, connection, rows, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                data = req.body;
                console.log(data);
                if (data.token === '') {
                    res.send({
                        message: '로그인 후 사용가능!',
                    });
                }
                return [4, db_1.pool.getConnection()];
            case 1:
                connection = _a.sent();
                return [4, connection.query('SELECT id FROM `posts` WHERE `email` = ? AND `id` = ? ', [data.email, id]).catch(function (err) {
                        console.log(err);
                        return err;
                    })];
            case 2:
                rows = (_a.sent())[0];
                if (!!rows[0]) return [3, 3];
                console.log('id' + id);
                res.send({
                    message: '작성된 글이 없음!'
                });
                return [3, 8];
            case 3:
                if (!(token_1.tokenInfo.email === data.email)) return [3, 7];
                if (!(token_1.tokenInfo.token === data.token)) return [3, 5];
                return [4, connection.query('DELETE FROM posts WHERE id = ?', [id])];
            case 4:
                result = (_a.sent())[0];
                res.send({
                    message: '삭제 완료!'
                });
                return [3, 6];
            case 5: return [2, res.send({
                    message: '로그인 후 사용가능!',
                })];
            case 6: return [3, 8];
            case 7: return [2, res.send({
                    message: '로그인 후 사용가능!',
                })];
            case 8: return [4, next()];
            case 9:
                _a.sent();
                return [2];
        }
    });
}); };
exports.deletePost = deletePost;
//# sourceMappingURL=post.service.js.map