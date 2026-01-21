import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { fail } from "../utils/apiResponse";

export type AuthRequest = Request & {
  user?: { userId: string; role: "USER" | "ADMIN" };
};

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json(fail("Missing or invalid Authorization header"));
  }

  try {
    const token = header.split(" ")[1];
    const payload = verifyJwt(token);
    req.user = { userId: payload.userId, role: payload.role };
    return next();
  } catch {
    return res.status(401).json(fail("Invalid/expired token"));
  }
}
