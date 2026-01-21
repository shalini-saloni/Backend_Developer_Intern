"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const auth_validation_1 = require("./auth.validation");
const auth_service_1 = require("./auth.service");
const apiResponse_1 = require("../../utils/apiResponse");
async function register(req, res) {
    const body = auth_validation_1.registerSchema.parse(req.body);
    const user = await (0, auth_service_1.registerUser)(body.name, body.email, body.password);
    return res.status(201).json((0, apiResponse_1.ok)(user, "Registered successfully"));
}
async function login(req, res) {
    const body = auth_validation_1.loginSchema.parse(req.body);
    const data = await (0, auth_service_1.loginUser)(body.email, body.password);
    return res.status(200).json((0, apiResponse_1.ok)(data, "Login successful"));
}
//# sourceMappingURL=auth.controller.js.map