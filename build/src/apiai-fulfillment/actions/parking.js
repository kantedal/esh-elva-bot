"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const request = require("request-promise");
const Distance = require('geo-distance');
const address_1 = require("./address");
const parkingApiKey = process.env.PARKING_API_KEY;
const parkingApiAddress = 'http://parkering.linkoping.se/Parkeringsdata/ParkeringsdataV1.svc/GetParkeringsytaList/';
exports.findNearestParkingSpot = (address) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        const userGeoCode = yield address_1.geocodeAddress(address);
        const userCoordinate = { lon: userGeoCode.longitude, lat: userGeoCode.latitude };
        try {
            const parkingSpots = JSON.parse(yield request(parkingApiAddress + parkingApiKey + '/0')).ParkingAreaNewList;
            let nearestParkingSpot = parkingSpots[0];
            let shortestDistance = Distance('100000 km');
            for (const parkingSpot of parkingSpots) {
                const parkingSpotCoordinate = { lon: parkingSpot.Longitude, lat: parkingSpot.Latitude };
                const distanceToParkingSpot = Distance.between(userCoordinate, parkingSpotCoordinate);
                if (distanceToParkingSpot < Distance(shortestDistance)) {
                    nearestParkingSpot = parkingSpot;
                    shortestDistance = distanceToParkingSpot;
                }
            }
            const distanceFromUser = shortestDistance.human_readable().distance + shortestDistance.human_readable().unit;
            return `The nearest parking spot is ${nearestParkingSpot.Name} which is ${distanceFromUser} from your current location.`;
        }
        catch (error) {
            return 'Could not find parking spots at the moment.';
        }
    }
    catch (err) {
        return 'Could not find your current location.';
    }
});
//# sourceMappingURL=parking.js.map