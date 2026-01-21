"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = requireRole;
const apiResponse_1 = require("../utils/apiResponse");
function requireRole(...roles) {
    return (req, res, next) => {
        const role = req.user?.role;
        if (!role)
            return res.status(401).json((0, apiResponse_1.fail)("Unauthorized"));
        if (!roles.includes(role))
            return res.status(403).json((0, apiResponse_1.fail)("Forbidden"));
        return next();
    };
}
//# sourceMappingURL=role.middleware.js.map