"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = ok;
exports.fail = fail;
function ok(data, message = "OK") {
    return { success: true, message, data };
}
function fail(message, details) {
    return { success: false, error: { message, details } };
}
//# sourceMappingURL=apiResponse.js.map