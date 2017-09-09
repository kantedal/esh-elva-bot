"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const parking_1 = require("./actions/parking");
const generateResponseJson_1 = require("./generateResponseJson");
exports.resolveMessage = (action, parameters) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let responseMessage = '';
    switch (action) {
        case "parking":
            responseMessage = yield parking_1.findNearestParkingSpot(parameters['address']);
            break;
        default:
            responseMessage = 'Something went wrong, sorry!';
            break;
    }
    return generateResponseJson_1.generateResponseJson(responseMessage);
});
exports.initApiAiWebhook = (app) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    app.post('/apiai', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const action = body.result.action;
        const parameters = body.result.parameters;
        console.log('Action: ', action, 'Parameters: ', parameters);
        const response = yield exports.resolveMessage(action, parameters);
        res.send(JSON.stringify(response));
    }));
});
//# sourceMappingURL=apiai-webhook.js.map