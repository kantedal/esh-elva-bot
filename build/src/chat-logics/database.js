"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const serviceAccount = require('./serviceAccount/elva-ac7f6-firebase-adminsdk-lwzk8-9c1b8070c0.json');
admin.initializeApp({
    credential: serviceAccount,
    databaseURL: 'https://elva-ac7f6.firebaseio.com'
});
const database = admin.database();
class DatabaseUser {
    constructor(sessionToken, userId) {
        this._userRef = database.ref('users/' + userId).on('value', (snapshot) => {
            console.log('connected: ', snapshot.val());
        });
    }
}
exports.DatabaseUser = DatabaseUser;
//# sourceMappingURL=database.js.map