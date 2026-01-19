import { Router } from "express";
import { login, register } from "./auth.controller";

export const authRoutes = Router();

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
authRoutes.post("/register", register);

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
authRoutes.post("/login", login);
