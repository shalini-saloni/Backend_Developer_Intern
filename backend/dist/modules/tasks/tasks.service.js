"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.listTasks = listTasks;
exports.getTaskById = getTaskById;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
const prisma_1 = require("../../config/prisma");
async function createTask(ownerId, payload) {
    return prisma_1.prisma.task.create({ data: { ...payload, ownerId } });
}
async function listTasks(userId, role) {
    if (role === "ADMIN")
        return prisma_1.prisma.task.findMany({ orderBy: { createdAt: "desc" } });
    return prisma_1.prisma.task.findMany({ where: { ownerId: userId }, orderBy: { createdAt: "desc" } });
}
async function getTaskById(taskId) {
    return prisma_1.prisma.task.findUnique({ where: { id: taskId } });
}
async function updateTask(taskId, payload) {
    return prisma_1.prisma.task.update({ where: { id: taskId }, data: payload });
}
async function deleteTask(taskId) {
    return prisma_1.prisma.task.delete({ where: { id: taskId } });
}
//# sourceMappingURL=tasks.service.js.map