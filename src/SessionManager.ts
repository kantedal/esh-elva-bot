/**
 * Singleton class. Every time you use this class you must use it like SessionManager.Instance
 */
export default class SessionManager {
  static instance: SessionManager
  private _currentLanguageById: Map<string, string>

  constructor() {
    this._currentLanguageById = new Map<string, string>()
  }

  static get Instance(): SessionManager {
    if (this.instance === null || this.instance === undefined) {
      this.instance = new SessionManager()
    }
    return this.instance
  }

  /**
   * Set val in map
   * @param {string} sessionId
   * @param {string} lang
   * @private
   */
  setCurrentLanguageForUser(sessionId: string, lang: string) {
    this._currentLanguageById.set(sessionId, lang)
  }

  getCurrentLanguageForUser(sessionId: string) {
    return this._currentLanguageById.get(sessionId)
  }
}

