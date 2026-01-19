import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { fail } from "../utils/apiResponse";

export function errorMiddleware(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json(
      fail("Validation error", err.errors.map(e => ({
        path: e.path.join("."),
        message: e.message
      })))
    );
  }

  const status = err?.statusCode ?? 500;
  const message = err?.message ?? "Internal Server Error";
  return res.status(status).json(fail(message));
}
