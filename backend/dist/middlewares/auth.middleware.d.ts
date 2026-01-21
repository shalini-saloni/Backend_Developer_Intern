import { Request, Response, NextFunction } from "express";
export type AuthRequest = Request & {
    user?: {
        userId: string;
        role: "USER" | "ADMIN";
    };
};
export declare function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth.middleware.d.ts.map