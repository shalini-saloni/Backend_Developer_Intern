import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
export declare function requireRole(...roles: Array<"USER" | "ADMIN">): (req: AuthRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=role.middleware.d.ts.map