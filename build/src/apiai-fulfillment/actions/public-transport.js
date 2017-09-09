"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const request = require('request-promise');
const address_1 = require("./address");
const transportTypes = {
    WALK: 'walk',
    JNY: 'bus',
};
exports.findPublicTransport = (from, to) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        const geoPoints = yield Promise.all([address_1.geocodeAddress(from), address_1.geocodeAddress(to)]);
        const apiKey = process.env.OGT_API_KEY;
        const apiCallUrl = `https://api.resrobot.se/v2/trip.json?key=${process.env.OGT_API_KEY}&originCoordLat=${geoPoints[0].latitude}&originCoordLong=${geoPoints[0].longitude}&destCoordLat=${geoPoints[1].latitude}&destCoordLong=${geoPoints[1].longitude}`;
        const res = JSON.parse(yield request(apiCallUrl));
        const legList = res.Trip[0].LegList.Leg;
        let responseMessage = 'Your best alternative is to ';
        if (legList.length > 1) {
            responseMessage += ' first ';
        }
        let count = 0;
        for (const leg of legList) {
            if (count !== 0)
                responseMessage += 'Then ';
            switch (leg.type) {
                case 'WALK':
                    console.log(leg);
                    responseMessage += `walk to ${leg.Destination.name}, this will take approximately ${leg.duration[2]} minutes. `;
                    break;
                case 'JNY':
                    responseMessage += `take bus ${leg.Product.name} which leaves at ${leg.Origin.time} and arrives at ${leg.Destination.time}. `;
                    break;
                default:
                    break;
            }
            count++;
        }
        return responseMessage;
    }
    catch (err) {
        console.log('error', err);
        return 'Could not parse addresses.';
    }
});
//# sourceMappingURL=public-transport.js.map