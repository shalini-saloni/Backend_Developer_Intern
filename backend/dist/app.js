"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./config/env");
const auth_routes_1 = require("./modules/auth/auth.routes");
const tasks_routes_1 = require("./modules/tasks/tasks.routes");
const admin_routes_1 = require("./modules/users/admin.routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const error_middleware_1 = require("./middlewares/error.middleware");
exports.app = (0, express_1.default)();
exports.app.use((0, helmet_1.default)());
exports.app.use((0, cors_1.default)({ origin: env_1.env.CORS_ORIGIN, credentials: true }));
exports.app.use(express_1.default.json({ limit: "1mb" }));
exports.app.use((0, morgan_1.default)("dev"));
exports.app.get("/health", (_req, res) => res.json({ status: "ok" }));
exports.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
exports.app.use("/api/v1/auth", auth_routes_1.authRoutes);
exports.app.use("/api/v1/tasks", tasks_routes_1.taskRoutes);
exports.app.use("/api/v1/admin", admin_routes_1.adminRoutes);
exports.app.use(error_middleware_1.errorMiddleware);
//# sourceMappingURL=app.js.map