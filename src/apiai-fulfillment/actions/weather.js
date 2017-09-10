"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const address_1 = require("./address");
const request = require("request-promise");
const Distance = require('geo-distance');
exports.isRain = (hours_forward, address) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        let weatherCoordinate = null;
        let weatherApiAddress = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/15.513/lat/58.417/data.json';
        if (hours_forward !== undefined) {
            hours_forward = 0;
        }
        if (address !== undefined) {
            const userGeoCode = yield address_1.geocodeAddress(address);
            weatherCoordinate = { lon: userGeoCode.longitude, lat: userGeoCode.latitude };
            weatherApiAddress = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/'
                + weatherCoordinate.lon + '/lat/' + weatherCoordinate.lat + '/data.json';
        }
        try {
            const weatherData = JSON.parse(yield request(weatherApiAddress));
            const weatherParameters = weatherData.timeSeries[0 + hours_forward].parameters;
            for (const parameter of weatherParameters) {
                if (parameter.name === 'pmean') {
                    if (parameter.values[0] > 0) {
                        return true;
                    }
                    console.log(parameter.values[0]);
                }
            }
            return false;
        }
        catch (error) {
            return 'Could not find weather on this location. :(';
        }
    }
    catch (err) {
        return 'Could not find your current location. :(';
    }
});
// If user wants to use address 'hours_forward' has to be passed!
exports.getWeather = (hours_forward, address) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        let weatherCoordinate = null;
        let weatherApiAddress = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/15.513/lat/58.417/data.json';
        if (address !== undefined) {
            const userGeoCode = yield address_1.geocodeAddress(address);
            weatherCoordinate = { lon: userGeoCode.longitude, lat: userGeoCode.latitude };
            weatherApiAddress = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/'
                + weatherCoordinate.lon + '/lat/' + weatherCoordinate.lat + '/data.json';
        }
        try {
            if (hours_forward !== undefined) {
                hours_forward = 0;
            }
            const weatherData = JSON.parse(yield request(weatherApiAddress));
            const weatherParameters = weatherData.timeSeries[0 + hours_forward].parameters;
            let temp;
            let sky = -1;
            let rain = -1;
            let snow = -1;
            let wind = -1;
            let thunder = -1;
            let weatherMessage = '';
            for (const parameter of weatherParameters) {
                if (parameter.name === 't') {
                    temp = parameter.values[0];
                    weatherMessage += 'Currently it is ' + temp + '°C degrees. ';
                }
            }
            for (const parameter of weatherParameters) {
                if (parameter.name === 'tcc_mean') {
                    sky = parameter.values[0];
                    if (sky < 3) {
                        weatherMessage += '☀ ';
                    }
                    else if (sky < 6) {
                        weatherMessage += '⛅ ';
                    }
                    else {
                        weatherMessage += '☁ ';
                    }
                }
                else if (parameter.name === 'pmean') {
                    rain = parameter.values[0];
                    if (rain > 0) {
                        weatherMessage += '☔ ';
                    }
                }
                else if (parameter.name === 'ws') {
                    wind = parameter.values[0];
                    if (wind > 5) {
                        weatherMessage += '💨 ';
                    }
                }
                else if (parameter.name === 'tstm') {
                    thunder = parameter.values[0];
                    if (thunder > 50) {
                        weatherMessage += '⚡ ';
                    }
                }
            }
            if (temp < 0 && rain > 0) {
                snow = rain;
                rain = 0;
                if (snow > 0) {
                    weatherMessage += '❄⛄';
                }
            }
            return weatherMessage;
        }
        catch (error) {
            return 'Could not find weather on this location.';
        }
    }
    catch (err) {
        return 'Could not find your current location.';
    }
});
//# sourceMappingURL=weather.js.map