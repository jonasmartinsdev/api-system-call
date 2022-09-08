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
const express_1 = require("express");
const firebase_1 = require("../database/firebase");
const customersRoutes = (0, express_1.Router)();
// Listar Clientes
customersRoutes.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const listCustomer = [];
    const snapshot = yield firebase_1.Customers.get();
    snapshot.forEach(doc => {
        listCustomer.push({
            id: doc.id,
            address: doc.data().address,
            cnpj: doc.data().cnpj,
            enterprise: doc.data().enterprise,
        });
    });
    return response.json(listCustomer);
}));
// Cadastrar novo Cliente
customersRoutes.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { enterprise, cnpj, address } = request.body;
    yield firebase_1.Customers.add({
        enterprise,
        cnpj,
        address,
    });
    return response.json();
}));
exports.default = customersRoutes;
