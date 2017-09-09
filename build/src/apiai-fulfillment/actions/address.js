"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: 'AIzaSyDKeiIkZLf73-HdjzQN3Abz4ZIBypuS9Uo',
    formatter: null
};
const geocoder = NodeGeocoder(options);
exports.geocodeAddress = (address) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const geocode = yield geocoder.geocode(address);
    return geocode[0];
});
//# sourceMappingURL=address.js.map