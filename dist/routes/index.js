"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const called_routes_1 = __importDefault(require("./called.routes"));
const customers_routes_1 = __importDefault(require("./customers.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const routes = (0, express_1.Router)();
routes.use('/users', users_routes_1.default);
routes.use('/called', called_routes_1.default);
routes.use('/customers', customers_routes_1.default);
exports.default = routes;
