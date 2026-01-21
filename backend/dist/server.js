"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
app_1.app.listen(env_1.env.PORT, () => {
    console.log(`API running on http://localhost:${env_1.env.PORT}`);
    console.log(`Swagger docs on http://localhost:${env_1.env.PORT}/api-docs`);
});
//# sourceMappingURL=server.js.map