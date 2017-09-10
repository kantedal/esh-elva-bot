"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const databaseUser_1 = require("../../chat-logics/databaseUser");
exports.setHome = (sessionId, homeAddress) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    yield databaseUser_1.setUserProperty(sessionId, 'homeAddress', homeAddress);
    return {};
});
//# sourceMappingURL=setHome.js.map