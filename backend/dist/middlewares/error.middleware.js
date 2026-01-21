"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const zod_1 = require("zod");
const apiResponse_1 = require("../utils/apiResponse");
function errorMiddleware(err, _req, res, _next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json((0, apiResponse_1.fail)("Validation error", err.issues.map((e) => ({
            path: e.path.join("."),
            message: e.message
        }))));
    }
    const status = err?.statusCode ?? 500;
    const message = err?.message ?? "Internal Server Error";
    return res.status(status).json((0, apiResponse_1.fail)(message));
}
//# sourceMappingURL=error.middleware.js.map