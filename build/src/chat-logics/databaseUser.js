"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: 'elva-ac7f6',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC7kv6nCojehVK2\nYcL8CDZLNbrRjeNC2pvjIlz16h0XlE8kPea4VwcWk+bIYWfjb4cYrc5w8bBarvwq\n59DKJWxpH435JkYxCBVvqF6PcxJ2rbYooaCmsKvun8IXt22NV6GKaf6S+kGVsLyR\nQ/DOFWePkMyUOLby0t2zPTrZf9IVzWFwyZ04Zv7u7AymMCsqkgUNZrqM+R/XHtG/\nib+DBe8yFJ5PfAYDHnkJyACCXJ8xbRzvmJoV8dpKo2vrOC4c/wzdoKBqkzO+BsZB\nW11fTAxhtjToEGflVfke1F3YcNXm814UV+DiowjnvU0uzut6xYLx75mH7OOwRSug\nlXd9ULc5AgMBAAECggEAFOvEIKIvih8lbq9oeacaVCjn333TfFZI5wxjATAlosbB\nTX3kfQjC4wEnz09y8IZ001s2YHlKhdDI0inFKzjBlteExKZg05Du4CNvuZD4fRlq\nrO07D4B6yryRn8bPDqHYpAkmsmK8fCtIWuzwn7G6OWRpdvo86Ig9n0Nb7ByiNFlg\np3cNfVRasIvJ//Oz0NN+5uAX1kYLrdvr3GrOfG5kIXC7WP6/RIfF2LUPasIDFx3A\nMzpOo4DV5cg1XS2EHQemf8eGTv0MoOgxKLMkvKtGFY0g2dREMYxIJECssJcH5xX+\nru3el/ffpOteS7ctPH0IDsayZ8TJPsdIsUjWxLm9UQKBgQD9cl+M9m+3I3xRZRqu\nsAWyQ4cpqfnwlU7A/mDHrdjqAc1SFJhBoWytQeerHr1dCqmphvzsnntWW1y3uiLu\nNdX3To1rscnE53GqAqxEwN0Iflo/i9ATG185K3itDNRz7L6Kp7BWlv7OAZt6lUhu\nU9CqbqyL3Dbv0ndjVtPmJ/nl0QKBgQC9dr1HMt0YocGacEqTOGbnHxC1PXsoEDaY\nJdALokZ1GprBLvl0SNy9+DOcvYgACbWTRVufQRU8UHWbVZE8Zi1cPINx7ECzpTzo\noDFpe7RLKQh1vHQX6Lx4bNJucNEI30O/xDVZYjyHiPfK74YLRXXSlC1zj4UUFs03\n+evxXvzM6QKBgDA6bnJNhs6rwwFeIuiw+DSG4xaLkNM2JklVXqdArrFA7Ig9AQgk\nJqEFlIccj15AJC7tT/3a3o99TTRtCC6aMgAgg4rFxyZgAGIgphVjOexe1t+WxF6O\na91eJ1WOxnLUzyFlbYncq9oZtjNqauELs/5qlwz6N74FJ9DQefwnCUexAoGAOamr\nzcGTPO3uKHzIlany16DCywZdN0JH+2J2wTOwUe+47dbIITYTyNWDj863V5uc4aeY\nTQ3X0rWCNbaDL2jBoXLhZojK4GIH+ZzXrQzzQHTKmFq00poI0nX8TZSUaijZS8IB\noqSdW3q6P89Kcp+/Tkm+0474p7aQ2tp7jsikFBECgYAxExLa6SVA4kLYYDKrpQ52\ndG1YSMYf1+eeXqDSjQ9R6BD335QhXtdHmfPb6do/U+g5k28OlesaL8Or6EWdj9Yt\ncw+ak6cMi2nvzKJmkhXs15HkNzo5SgjZjvyEQk2lheUck+yd2MGsCudIo2fgrw7/\nad2LEPxsy1LQeIIg4+eC2w==\n-----END PRIVATE KEY-----\n',
        clientEmail: 'firebase-adminsdk-lwzk8@elva-ac7f6.iam.gserviceaccount.com'
    }),
    databaseURL: 'https://elva-ac7f6.firebaseio.com'
});
exports.getDatabaseUser = (userId) => {
    const usersRef = admin.database().ref('users');
    return new Promise((resolve, reject) => {
        usersRef.orderByChild('userId').equalTo(userId).limitToFirst(1).once('value', (snapshot) => {
            const users = snapshot.val();
            for (const userKey in users) {
                if (userKey != null) {
                    const user = users[userKey];
                    if (user) {
                        resolve(user);
                        return;
                    }
                }
            }
            const newUser = { userId };
            const newUserRef = usersRef.push();
            newUserRef.set(newUser);
            resolve(newUser);
        });
    });
};
//# sourceMappingURL=databaseUser.js.map