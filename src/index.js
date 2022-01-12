const Layer = require("@cloud-technology/lambda-layer-concept");

/*** Handler (Async Handler(s) *should* return a non-awaited promise) */
exports.handler = async function (event, context) {
    console.log("[Debug] Environment Variable(s)" + ":", serialize(process.env));
    console.log("[Debug] Lambda Handler Context" + ":", serialize(context));
    console.log("[Debug] Event" + ":", serialize(event));

    return new Promise((resolve) => {
        resolve({
            statusCode: 200,
            headers: {
                "Content-Type": "Application/JSON",
            },
            body: JSON.stringify({
                Message: Layer.UUID.v4()
            }, null, 4)
        });
    });
};

const serialize = (object) => JSON.stringify(object, null, 4);

