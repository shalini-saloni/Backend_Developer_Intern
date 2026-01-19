import { Request, Response } from "express";
import { registerSchema, loginSchema } from "./auth.validation";
import { loginUser, registerUser } from "./auth.service";
import { ok } from "../../utils/apiResponse";

export async function register(req: Request, res: Response) {
  const body = registerSchema.parse(req.body);
  const user = await registerUser(body.name, body.email, body.password);
  return res.status(201).json(ok(user, "Registered successfully"));
}

export async function login(req: Request, res: Response) {
  const body = loginSchema.parse(req.body);
  const data = await loginUser(body.email, body.password);
  return res.status(200).json(ok(data, "Login successful"));
}
