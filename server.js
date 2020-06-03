const hateoasLinker = require('express-hateoas-links');
const expressValidator = require('express-validator');
const node = require('./resources/bootstrap');
const client = require("cloud-config-client");
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(expressValidator());
app.use(bodyParser.json());
app.use(hateoasLinker);
app.use(helmet());

client.load({
    endpoint: node.cloud.config.uri,
    name: node.application.name,
    profiles: node.profiles.active,
    auth: {user: node.cloud.config.username, pass: node.cloud.config.password}
}).then(config => {
    config.bootstrap = node;

    require("./app/models")(app, config);

    require("./app/component/eureka")(app, config);
    require("./app/component/zipkin")(app, config);

    require("./app/routes/auth.routes")(app, config);

    require("./app/routes/regions.routes")(app);
    require("./app/routes/districts.routes")(app);
    require("./app/routes/villages.routes")(app);

    require("./app/routes/errors.routes")(app);

    app.listen(node.server.port, () => {
        console.log(`Server beží na porte ${node.server.port}`)
    });
}).catch(console.error);