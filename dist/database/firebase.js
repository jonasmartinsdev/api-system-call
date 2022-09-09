"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Called = exports.Customers = exports.User = exports.Auth = void 0;
const app_1 = __importDefault(require("firebase/compat/app"));
require("firebase/compat/auth");
require("firebase/compat/firestore");
require("firebase/compat/storage");
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: process.env.FIREBASE_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE,
    messagingSenderId: process.env.FIREBASE_MESSAGING,
    appId: process.env.FIREBASE_APP,
};
if (!app_1.default.apps.length) {
    app_1.default.initializeApp(firebaseConfig);
}
const db = app_1.default.firestore();
const Auth = app_1.default.auth();
exports.Auth = Auth;
const User = db.collection('Users');
exports.User = User;
const Customers = db.collection('Customers');
exports.Customers = Customers;
const Called = db.collection('Called');
exports.Called = Called;
