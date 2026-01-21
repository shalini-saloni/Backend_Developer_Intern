"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../config/prisma");
const jwt_1 = require("../../utils/jwt");
async function registerUser(name, email, password) {
    const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (existing) {
        const err = new Error("Email already in use");
        err.statusCode = 409;
        throw err;
    }
    const passwordHash = await bcrypt_1.default.hash(password, 12);
    const user = await prisma_1.prisma.user.create({
        data: { name, email, passwordHash }
    });
    return { id: user.id, name: user.name, email: user.email, role: user.role };
}
async function loginUser(email, password) {
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        const err = new Error("Invalid credentials");
        err.statusCode = 401;
        throw err;
    }
    const match = await bcrypt_1.default.compare(password, user.passwordHash);
    if (!match) {
        const err = new Error("Invalid credentials");
        err.statusCode = 401;
        throw err;
    }
    const token = (0, jwt_1.signJwt)({ userId: user.id, role: user.role });
    return {
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
    };
}
//# sourceMappingURL=auth.service.js.map