"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const request = require("request-promise");
const parseXMLString = require('xml2js').parseString;
const poiApiAddress1 = 'http://kartan.linkoping.se/isms/poi?service=wfs&request=getfeature&typename=';
const poiApiAddress2 = '&version=1.1.0&';
exports.findPointOfIntrest = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const type = 'bangolf';
    const res = yield request(poiApiAddress1 + type + poiApiAddress2);
    parseXMLString(res, (err, res) => {
        const pointsOfIntrest = res['wfs:FeatureCollection']['gml:featureMember'];
        console.log(pointsOfIntrest);
        for (const poi of pointsOfIntrest) {
            console.log(poi);
        }
    });
});
//# sourceMappingURL=pointOfIntrest.js.map