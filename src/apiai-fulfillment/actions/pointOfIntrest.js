"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const request = require("request-promise");
const parseXMLString = require('xml2js').parseString;
const poiApiAddress1 = 'http://kartan.linkoping.se/isms/poi?service=wfs&request=getfeature&typename=';
const poiApiAddress2 = '&version=1.1.0&';
exports.findPointOfInterest = (type) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const res1 = yield request(poiApiAddress1 + type + poiApiAddress2);
    return new Promise((resolve, reject) => {
        parseXMLString(res1, (err, res2) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                err.toString();
            }
            let pointsOfInterest = res2['wfs:FeatureCollection'];
            if (!pointsOfInterest) {
                reject(`Could not find results for ${type}`);
            }
            pointsOfInterest = pointsOfInterest['gml:featureMember'];
            const data = [];
            for (const poi of pointsOfInterest) {
                const poiObject = poi[`ms:${type}`][0];
                const name = poiObject['ms:NAMN'][0];
                const address = poiObject['ms:ADRESS'][0];
                const phone = poiObject['ms:TELEFONNUMMER'][0];
                const link = poiObject['ms:LINK'][0];
                // console.log(name)
                // console.log(address)
                // console.log(phone)
                // console.log(link)
                if (name && address) {
                    data.push({ name, address, phone, link });
                }
            }
            let returnString = `Try the following:\n`;
            for (const d of data) {
                returnString += `\n${d.name} at ${d.address} \n`;
                if (d.phone) {
                    returnString += `Phone: ${d.phone}\n`;
                }
                if (d.link) {
                    returnString += `Link: ${d.link}\n`;
                }
                returnString += `\n`;
            }
            resolve(returnString);
        }))
            .then((response) => response)
            .catch((reason) => {
            console.error(reason);
            return reason.toString() || '';
        });
    });
});
//# sourceMappingURL=pointOfIntrest.js.map