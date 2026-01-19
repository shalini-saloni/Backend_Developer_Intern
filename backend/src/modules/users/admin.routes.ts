import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { prisma } from "../../config/prisma";
import { ok } from "../../utils/apiResponse";

export const adminRoutes = Router();

adminRoutes.get("/users", authMiddleware, requireRole("ADMIN"), async (_req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });
  return res.status(200).json(ok(users));
});
