"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.default);
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        // Se for um instancia do tipo error
        return res.status(400).json({
            status: 'error',
            message: err.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.',
    });
});
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`🚀​​ Server started on port ${PORT}!`);
});
