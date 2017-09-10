"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const parking_1 = require("./actions/parking");
const generateResponseJson_1 = require("./generateResponseJson");
const pointOfIntrest_1 = require("./actions/pointOfIntrest");
const immigrant_1 = require("./actions/immigrant");
const databaseUser_1 = require("../chat-logics/databaseUser");
const public_transport_1 = require("./actions/public-transport");
const weather_1 = require("./actions/weather");
const setHome_1 = require("./actions/setHome");
exports.resolveMessage = (action, parameters, sessionId) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let responseJson = {};
    switch (action) {
        case "parking" /* parking */:
            responseJson = generateResponseJson_1.generateResponseJson(yield parking_1.findNearestParkingSpot(parameters['address']));
            break;
        case "integration" /* integration */:
            break;
        case "immigrantEvent" /* immigrantEvent */:
            responseJson = generateResponseJson_1.generateResponseJson(yield immigrant_1.getRandomEventForImmigrants());
            break;
        case "learnSwedish" /* learnSwedish */:
            responseJson = generateResponseJson_1.generateResponseJson(yield immigrant_1.getSwedishDirections(parameters['swedishLevel'].toLowerCase()));
            break;
        case "poiAsTourist" /* poiAsTourist */:
            const param = parameters['point_of_interest'] || parameters['point_of_interest_any'];
            console.log(`The param is: ${param}`);
            responseJson = generateResponseJson_1.generateResponseJson(yield pointOfIntrest_1.findPointOfInterest(param)); // ?
            break;
        case "transport" /* transport */:
            console.log('transport action', parameters['from-address'], parameters['to-address']);
            responseJson = generateResponseJson_1.generateResponseJson(yield public_transport_1.findPublicTransport(parameters['from-address'], parameters['to-address']));
            break;
        case "weather" /* weather */:
            responseJson = generateResponseJson_1.generateResponseJson(yield weather_1.getWeather());
            break;
        case "setHome" /* setHome */:
            responseJson = generateResponseJson_1.generateResponseJson(yield setHome_1.setHome(sessionId, parameters['address']));
            break;
        case "test" /* test */:
            responseJson = {
                followupEvent: {
                    data: {
                        testtest: 'testing testing',
                    },
                    name: 'fill_slots'
                }
            };
            break;
        default:
            responseJson = generateResponseJson_1.generateResponseJson('Something went wrong, sorry!');
            break;
    }
    return responseJson;
});
exports.initApiAiWebhook = (app) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    // findPointOfInterest()
    app.post('/apiai', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        const sessionId = body.sessionId;
        const { action, parameters } = body.result;
        // const conexts = body.results.contexts
        console.log('session id', body.sessionId);
        console.log('Action: ', action, 'Parameters: ', parameters);
        const user = yield databaseUser_1.getUserFromSessionId(body.sessionId);
        console.log('user', user);
        const response = yield exports.resolveMessage(action, parameters, sessionId);
        res.send(JSON.stringify(response));
    }));
});
//# sourceMappingURL=apiai-webhook.js.map