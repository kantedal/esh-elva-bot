"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const translate = require('google-translate-api');
exports.translateMessage = (message, to, from) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const response = yield translate(message, { to });
    return response.text;
});
//# sourceMappingURL=translate.js.map