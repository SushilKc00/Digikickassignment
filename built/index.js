"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("./routes/router"));
const cors_1 = __importDefault(require("cors"));
const dbconfig_1 = require("./database/dbconfig");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const url = process.env.DB_URL;
const Port = process.env.PORT || 8080;
//midelwares
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//router middleware
app.use("/api/auth", router_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../clients/dist/")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../clients/dist/index.html"));
});
//dbconnection
(0, dbconfig_1.dbconnection)(url);
app.listen(Port, () => {
    console.log("server running");
});
