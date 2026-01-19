import { prisma } from "../../config/prisma";

export async function createTask(ownerId: string, payload: any) {
  return prisma.task.create({ data: { ...payload, ownerId } });
}

export async function listTasks(userId: string, role: "USER" | "ADMIN") {
  if (role === "ADMIN") return prisma.task.findMany({ orderBy: { createdAt: "desc" } });
  return prisma.task.findMany({ where: { ownerId: userId }, orderBy: { createdAt: "desc" } });
}

export async function getTaskById(taskId: string) {
  return prisma.task.findUnique({ where: { id: taskId } });
}

export async function updateTask(taskId: string, payload: any) {
  return prisma.task.update({ where: { id: taskId }, data: payload });
}

export async function deleteTask(taskId: string) {
  return prisma.task.delete({ where: { id: taskId } });
}
