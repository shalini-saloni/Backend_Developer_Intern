"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const tasks_controller_1 = require("./tasks.controller");
exports.taskRoutes = (0, express_1.Router)();
/**
 * @openapi
 * /api/v1/tasks:
 *   get:
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 */
exports.taskRoutes.get("/", auth_middleware_1.authMiddleware, tasks_controller_1.list);
exports.taskRoutes.post("/", auth_middleware_1.authMiddleware, tasks_controller_1.create);
exports.taskRoutes.get("/:id", auth_middleware_1.authMiddleware, tasks_controller_1.get);
exports.taskRoutes.patch("/:id", auth_middleware_1.authMiddleware, tasks_controller_1.patch);
exports.taskRoutes.delete("/:id", auth_middleware_1.authMiddleware, tasks_controller_1.remove);
//# sourceMappingURL=tasks.routes.js.map