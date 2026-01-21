import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { fail } from "../utils/apiResponse";

export function requireRole(...roles: Array<"USER" | "ADMIN">) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role) return res.status(401).json(fail("Unauthorized"));
    if (!roles.includes(role)) return res.status(403).json(fail("Forbidden"));
    return next();
  };
}
