const Layer = require("@cloud-vault/http-responses-lambda-layer");

/*** Handler (Async Handler(s) *should* return a non-awaited promise) */
exports.handler = async function (event, context) {
    console.log("[Debug] Environment Variable(s)" + ":", serialize(process.env));
    console.log("[Debug] Lambda Handler Context" + ":", serialize(context));
    console.log("[Debug] Event" + ":", serialize(event));

    return serialize({
        "Layer-Example": Layer
    });
};

const serialize = (object) => JSON.stringify(object, null, 4);
