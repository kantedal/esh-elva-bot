"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
exports.startExpressApp = () => {
    return new Promise((resolve, reject) => {
        const app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.listen(process.env.PORT || 5000, () => {
            console.log(`App listening on ${process.env.PORT || 5000}`);
            resolve(app);
        });
    });
};
//# sourceMappingURL=start-express-app.js.map