import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { createTaskSchema, updateTaskSchema } from "./tasks.validation";
import { ok, fail } from "../../utils/apiResponse";
import { createTask, deleteTask, getTaskById, listTasks, updateTask } from "./tasks.service";

export async function create(req: AuthRequest, res: Response) {
  const body = createTaskSchema.parse(req.body);
  const task = await createTask(req.user!.userId, body);
  return res.status(201).json(ok(task, "Task created"));
}

export async function list(req: AuthRequest, res: Response) {
  const tasks = await listTasks(req.user!.userId, req.user!.role);
  return res.status(200).json(ok(tasks));
}

export async function get(req: AuthRequest, res: Response) {
  const task = await getTaskById(req.params.id);
  if (!task) return res.status(404).json(fail("Task not found"));

  if (req.user!.role !== "ADMIN" && task.ownerId !== req.user!.userId) {
    return res.status(403).json(fail("Forbidden"));
  }

  return res.status(200).json(ok(task));
}

export async function patch(req: AuthRequest, res: Response) {
  const task = await getTaskById(req.params.id);
  if (!task) return res.status(404).json(fail("Task not found"));

  if (req.user!.role !== "ADMIN" && task.ownerId !== req.user!.userId) {
    return res.status(403).json(fail("Forbidden"));
  }

  const body = updateTaskSchema.parse(req.body);
  const updated = await updateTask(req.params.id, body);
  return res.status(200).json(ok(updated, "Task updated"));
}

export async function remove(req: AuthRequest, res: Response) {
  const task = await getTaskById(req.params.id);
  if (!task) return res.status(404).json(fail("Task not found"));

  if (req.user!.role !== "ADMIN" && task.ownerId !== req.user!.userId) {
    return res.status(403).json(fail("Forbidden"));
  }

  await deleteTask(req.params.id);
  return res.status(200).json(ok({ id: req.params.id }, "Task deleted"));
}
