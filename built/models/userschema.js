"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModal = void 0;
const mongoose_1 = require("mongoose");
const schemaUser = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    mobile: { type: String, required: true, trim: true, min: 3 },
    address: { type: String, required: true, trim: true },
    gender: { type: String, required: true, trim: true },
    profile: { type: String, default: "profile.png" },
});
exports.userModal = (0, mongoose_1.model)("user", schemaUser);
