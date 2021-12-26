const XRay = require("aws-xray-sdk-core");
const AWS = XRay.captureAWS(require("aws-sdk"));

// Layer Example
const Layer = XRay.captureAWS(require("@cloud-vault/http-responses-lambda-layer"));

// Create Client outside of Handler for reuse
const Lambda = new AWS.Lambda();

/*** Handler (Async Handler(s) *should* return a non-awaited promise */
exports.handler = async function (event, context) {
    event.Records.forEach((record) => {
        console.log(record.body);
    });

    console.log("[Debug] Environment Variable(s)" + ":", serialize(process.env));
    console.log("[Debug] Lambda Handler Context" + ":", serialize(context));
    console.log("[Debug] Event" + ":", serialize(event));

    return {
        "Account-Settings": getAccountSettings(),
        "Layer-Example": Layer
    };
};

// Use SDK Client
const getAccountSettings = function () {
    return Lambda.getAccountSettings().promise();
};

const serialize = (object) => JSON.stringify(object, null, 4);
