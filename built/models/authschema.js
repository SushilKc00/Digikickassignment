"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = void 0;
const mongoose_1 = require("mongoose");
const schemaAuth = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true, min: 3 },
    confirmpassword: { type: String, required: true, trim: true, min: 3 },
});
exports.authSchema = (0, mongoose_1.model)("h3data", schemaAuth);
