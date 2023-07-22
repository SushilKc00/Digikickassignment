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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleUser = exports.updateUser = exports.deleteAllUsers = exports.deleteUser = exports.getUser = exports.createUser = void 0;
const userschema_1 = require("../models/userschema");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const allUsers = await userModal.find();
        if (req.query.limit) {
            const pageLimit = req.query.limit;
            const page = req.query.page;
            const allUsers = yield userschema_1.userModal
                .find()
                .limit(pageLimit)
                .skip((Number(page) - 1) * Number(pageLimit));
            const count = yield userschema_1.userModal.find().countDocuments();
            res.status(200).json({
                success: true,
                allUsers,
                pageCount: Math.ceil(count / pageLimit),
            });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.getUser = getUser;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield userschema_1.userModal.findById(req.params.id);
        res.status(200).json({
            success: true,
            User,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.getSingleUser = getSingleUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield userschema_1.userModal.findOne({ email: req.body.email });
    if (match) {
        return res.json({
            success: false,
            message: "email already exist use different email",
        });
    }
    try {
        const users = yield userschema_1.userModal.create(req.body);
        users.address = "";
        res
            .status(200)
            .json({ success: true, users, message: "user created successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteUser = yield userschema_1.userModal.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res
            .status(200)
            .json({ success: true, message: "user updated successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteUser = yield userschema_1.userModal.findByIdAndDelete(req.params.id);
        res
            .status(200)
            .json({ success: true, message: "user Deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.deleteUser = deleteUser;
const deleteAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userschema_1.userModal.deleteMany({});
        res
            .status(200)
            .json({ success: true, message: "All User Deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.deleteAllUsers = deleteAllUsers;
