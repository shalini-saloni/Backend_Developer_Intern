import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
export declare function create(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function list(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function get(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function patch(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function remove(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=tasks.controller.d.ts.map