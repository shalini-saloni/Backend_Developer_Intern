"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const prisma_1 = require("../../config/prisma");
const apiResponse_1 = require("../../utils/apiResponse");
exports.adminRoutes = (0, express_1.Router)();
exports.adminRoutes.get("/users", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)("ADMIN"), async (_req, res) => {
    const users = await prisma_1.prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
    return res.status(200).json((0, apiResponse_1.ok)(users));
});
//# sourceMappingURL=admin.routes.js.map