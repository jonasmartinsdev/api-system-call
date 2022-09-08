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
const usersRoutes = (0, express_1.Router)();
// Cadastrar novo usuário
usersRoutes.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = request.body;
    const { user } = yield firebase_1.Auth.createUserWithEmailAndPassword(email, password);
    yield firebase_1.User.doc(user === null || user === void 0 ? void 0 : user.providerId).set({
        name,
        avatarURL: null,
        email,
    });
    return response.json(user);
}));
// Login usuário
usersRoutes.post('/sessions', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { email, password } = request.body;
    const { user } = yield firebase_1.Auth.signInWithEmailAndPassword(email, password);
    const userProfile = yield firebase_1.User.doc(user === null || user === void 0 ? void 0 : user.providerId).get();
    const data = {
        uid: user === null || user === void 0 ? void 0 : user.uid,
        name: (_a = userProfile.data()) === null || _a === void 0 ? void 0 : _a.name,
        avatarURL: (_b = userProfile.data()) === null || _b === void 0 ? void 0 : _b.avatarURL,
        email: (_c = userProfile.data()) === null || _c === void 0 ? void 0 : _c.email,
    };
    return response.json(data);
}));
exports.default = usersRoutes;
