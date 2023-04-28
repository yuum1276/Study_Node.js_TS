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
exports.insertComment = exports.getCommentList = void 0;
var db_1 = require("../helper/db");
var getCommentList = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, comments, rows, _i, rows_1, row, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4, db_1.pool.getConnection()];
            case 1:
                connection = _a.sent();
                comments = [];
                return [4, connection.query('SELECT * FROM comment')];
            case 2:
                rows = (_a.sent())[0];
                for (_i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                    row = rows_1[_i];
                    if (row.secret === 'n') {
                        comments.push(row);
                    }
                    else {
                        comments.push({ comments: "🔒" });
                    }
                }  
                return [3, 4];
            case 3:
                err_1 = _a.sent();
                next(err_1);
                return [3, 4];
            case 4: return [4, next()];
            case 5:
                _a.sent();
                return [2];
        }
    });
}); };
exports.getCommentList = getCommentList;
var insertComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, connection, comments, row, row, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4, db_1.pool.getConnection()];
            case 2:
                connection = _a.sent();
                comments = [];
                if (!(data.secret === 'Y')) return [3, 4];
                return [4, connection.query('INSERT INTO (`postId`, `email`, `nick`, `secret`, `scrtCode`) VALUES (?, ?, ?, ?, ?)', [data.postId, data.email, data.nick, data.secret, data.scrtCode])];
            case 3:
                row = (_a.sent())[0];
                return [2, res.send({})];
            case 4: return [4, connection.query('INSERT INTO (`postId`, `email`, `nick`, `secret`) VALUES (?, ?, ?, ?)', [data.postId, data.email, data.nick, data.secret])];
            case 5:
                row = (_a.sent())[0];
                return [2, res.send({})];
            case 6: return [3, 8];
            case 7:
                err_2 = _a.sent();
                next(err_2);
                return [3, 8];
            case 8: return [4, next()];
            case 9:
                _a.sent();
                return [2];
        }
    });
}); };
exports.insertComment = insertComment;
//# sourceMappingURL=comment.service.js.map