"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eventForImmigrants_1 = require("../data/eventForImmigrants");
exports.getRandomEventForImmigrants = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let answer = '';
    const event = eventForImmigrants_1.default[Math.floor(Math.random() * eventForImmigrants_1.default.length)];
    answer = `How about ${event.title}? \n
    ${event.desc}\n
    You can learn more by sending an email to ${event.mail}`;
    if (event.phone !== '') {
        answer += ` or by calling ${event.phone}`;
    }
    answer += `.\n Otherwise feel free to ask again!`;
    return answer;
});
//# sourceMappingURL=immigrantEvent.js.map