"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const translate = require('google-translate-api');
const SessionManager_1 = require("../SessionManager");
exports.translateMessage = (message, to, from, fromUser = false) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const response = yield translate(message, { to });
    // We don't need to translate english from user input
    if (fromUser && response.from.language.iso === 'en') {
        return message;
    }
    return response.text;
});
exports.setCurrentLanguageForMessage = (message, userSessionId) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const response = yield translate(message);
    const lang = response.from.language.iso;
    SessionManager_1.default.Instance.setCurrentLanguageForUser(userSessionId, lang);
});
//# sourceMappingURL=translate.js.map