"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export interface ISession {
//   userId: string
//   connectionTime: number
// }
//
// let sessions: { [sessionId: string]: ISession }
//
// export const initSessions = () => sessions = {}
//
// export const addSession = (sessionId: string, userId: string) => {
//
// }
//
// // Remove old sessions
// setInterval(() => {
//   const keysToRemove: string[] = []
//   for (const sessionId in sessions) {
//     if (sessionId != null) {
//       const session = sessions[sessionId]
//       const connectionTimeLimit = moment().subtract(30, 'm').valueOf()
//
//       if (session.connectionTime < connectionTimeLimit) {
//         keysToRemove.push(sessionId)
//       }
//     }
//   }
//
//   for (const sessionId of keysToRemove) {
//     delete sessions[sessionId]
//   }
//
// }, 1000 * 30)
//# sourceMappingURL=sessions.js.map