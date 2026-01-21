"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_1 = require("../utils/jwt");
const apiResponse_1 = require("../utils/apiResponse");
function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return res.status(401).json((0, apiResponse_1.fail)("Missing or invalid Authorization header"));
    }
    try {
        const token = header.split(" ")[1];
        const payload = (0, jwt_1.verifyJwt)(token);
        req.user = { userId: payload.userId, role: payload.role };
        return next();
    }
    catch {
        return res.status(401).json((0, apiResponse_1.fail)("Invalid/expired token"));
    }
}
//# sourceMappingURL=auth.middleware.js.map