"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
exports.authRoutes = (0, express_1.Router)();
/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Registered
 */
exports.authRoutes.post("/register", auth_controller_1.register);
/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Logged in
 */
exports.authRoutes.post("/login", auth_controller_1.login);
//# sourceMappingURL=auth.routes.js.map