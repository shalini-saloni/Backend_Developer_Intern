"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.list = list;
exports.get = get;
exports.patch = patch;
exports.remove = remove;
const tasks_validation_1 = require("./tasks.validation");
const apiResponse_1 = require("../../utils/apiResponse");
const tasks_service_1 = require("./tasks.service");
async function create(req, res) {
    const body = tasks_validation_1.createTaskSchema.parse(req.body);
    const task = await (0, tasks_service_1.createTask)(req.user.userId, body);
    return res.status(201).json((0, apiResponse_1.ok)(task, "Task created"));
}
async function list(req, res) {
    const tasks = await (0, tasks_service_1.listTasks)(req.user.userId, req.user.role);
    return res.status(200).json((0, apiResponse_1.ok)(tasks));
}
async function get(req, res) {
    const task = await (0, tasks_service_1.getTaskById)(req.params.id);
    if (!task)
        return res.status(404).json((0, apiResponse_1.fail)("Task not found"));
    if (req.user.role !== "ADMIN" && task.ownerId !== req.user.userId) {
        return res.status(403).json((0, apiResponse_1.fail)("Forbidden"));
    }
    return res.status(200).json((0, apiResponse_1.ok)(task));
}
async function patch(req, res) {
    const task = await (0, tasks_service_1.getTaskById)(req.params.id);
    if (!task)
        return res.status(404).json((0, apiResponse_1.fail)("Task not found"));
    if (req.user.role !== "ADMIN" && task.ownerId !== req.user.userId) {
        return res.status(403).json((0, apiResponse_1.fail)("Forbidden"));
    }
    const body = tasks_validation_1.updateTaskSchema.parse(req.body);
    const updated = await (0, tasks_service_1.updateTask)(req.params.id, body);
    return res.status(200).json((0, apiResponse_1.ok)(updated, "Task updated"));
}
async function remove(req, res) {
    const task = await (0, tasks_service_1.getTaskById)(req.params.id);
    if (!task)
        return res.status(404).json((0, apiResponse_1.fail)("Task not found"));
    if (req.user.role !== "ADMIN" && task.ownerId !== req.user.userId) {
        return res.status(403).json((0, apiResponse_1.fail)("Forbidden"));
    }
    await (0, tasks_service_1.deleteTask)(req.params.id);
    return res.status(200).json((0, apiResponse_1.ok)({ id: req.params.id }, "Task deleted"));
}
//# sourceMappingURL=tasks.controller.js.map