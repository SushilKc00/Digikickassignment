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
exports.authRegister = exports.authLogin = void 0;
const authschema_1 = require("../models/authschema");
const jwtToken_1 = require("../helpers/jwtToken");
//registercontroller
const authRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const userExist = yield authschema_1.authSchema.findOne({ email });
        if (userExist) {
            return res.json({
                success: false,
                message: "user already exist please use unique email",
            });
        }
        else {
            yield authschema_1.authSchema.create(req.body);
            res.json({ success: true, message: "register successfull" });
        }
    }
    catch (err) {
        res.json({
            success: false,
            message: "server errror",
        });
    }
});
exports.authRegister = authRegister;
//logincontroller
const authLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userExist = yield authschema_1.authSchema.findOne({ email });
    if (userExist) {
        if (userExist.password === password) {
            const token = yield (0, jwtToken_1.jsonToken)(userExist._id);
            res.json({
                success: true,
                message: "login successfull",
                userid: userExist._id,
                token,
            });
        }
        else {
            res.json({ success: false, message: "wrong credentials" });
        }
    }
    else {
        res.json({ success: false, message: "user not found" });
    }
});
exports.authLogin = authLogin;
