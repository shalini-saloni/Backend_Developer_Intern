import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { create, get, list, patch, remove } from "./tasks.controller";

export const taskRoutes = Router();

/**
 * @openapi
 * /api/v1/tasks:
 *   get:
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 */
taskRoutes.get("/", authMiddleware, list);

taskRoutes.post("/", authMiddleware, create);
taskRoutes.get("/:id", authMiddleware, get);
taskRoutes.patch("/:id", authMiddleware, patch);
taskRoutes.delete("/:id", authMiddleware, remove);
