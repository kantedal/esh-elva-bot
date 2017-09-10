"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Singleton class. Every time you use this class you must use it like SessionManager.Instance
 */
class SessionManager {
    constructor() {
        this._currentLanguageById = new Map();
    }
    static get Instance() {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new SessionManager();
        }
        return this.instance;
    }
    /**
     * Set val in map
     * @param {string} sessionId
     * @param {string} lang
     * @private
     */
    setCurrentLanguageForUser(sessionId, lang) {
        this._currentLanguageById.set(sessionId, lang);
    }
    getCurrentLanguageForUser(sessionId) {
        return this._currentLanguageById.get(sessionId);
    }
}
exports.default = SessionManager;
//# sourceMappingURL=SessionManager.js.map