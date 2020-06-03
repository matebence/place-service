module.exports = app => {
    const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
    const {BatchRecorder, jsonEncoder: {JSON_V2}} = require('zipkin');
    const zipkinConfig = require("../config/zipkin.config");
    const {HttpLogger} = require('zipkin-transport-http');
    const CLSContext = require('zipkin-context-cls');
    const {Tracer} = require('zipkin');

    const tracer = new Tracer({
        ctxImpl: new CLSContext('zipkin'),
        recorder: new BatchRecorder({
            logger: new HttpLogger({
                endpoint: `${zipkinConfig.baseUrl}/api/v2/spans`,
                jsonEncoder: JSON_V2
            })
        }),
        localServiceName: zipkinConfig.serviceName
    });

    app.use(zipkinMiddleware({tracer}));
};