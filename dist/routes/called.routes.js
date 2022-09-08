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
const date_fns_1 = require("date-fns");
const express_1 = require("express");
const firebase_1 = require("../database/firebase");
const calledRoutes = (0, express_1.Router)();
// Cadastrar novo Chamado
calledRoutes.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer, customerId, subject, status, complement, userId } = request.body;
    yield firebase_1.Called.add({
        created: new Date(),
        customer,
        customerId,
        subject,
        status,
        complement,
        userId,
    });
    return response.json();
}));
// Listar todos os chamados
calledRoutes.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const listCalled = [];
    const snapshot = yield firebase_1.Called.orderBy('created', 'desc').get();
    snapshot.forEach(doc => {
        listCalled.push({
            id: doc.id,
            subject: doc.data().subject,
            customer: doc.data().customer,
            customerId: doc.data().customer,
            created: doc.data().created,
            createdFormate: (0, date_fns_1.format)(doc.data().created.toDate(), 'dd/MM/yyyy'),
            status: doc.data().status,
            complement: doc.data().complement,
        });
    });
    return response.json(listCalled);
}));
// Listar apenas um chamado
calledRoutes.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const called = yield firebase_1.Called.doc(id).get();
    return response.json(called.data());
}));
// Editar chamados
calledRoutes.put('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer, customerId, subject, status, complement, userId } = request.body;
    const { id } = request.params;
    yield firebase_1.Called.doc(id).update({
        customer,
        customerId,
        subject,
        status,
        complement,
        userId,
    });
    return response.json();
}));
exports.default = calledRoutes;
