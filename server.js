const hateoasLinker = require('express-hateoas-links');
const expressValidator = require('express-validator');
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
    endpoint: 'http://192.168.99.100:8888',
    name: 'place-service',
    profiles: 'dev',
    auth: {user: "app-blesk-config-server", pass: "b8199f18ee07292f39f5d9213cf493e8"}
}).then(config => {
    require("./app/models")(app, config);

    require("./app/component/eureka")(app, config);
    require("./app/component/zipkin")(app, config);

    require("./app/routes/auth.routes")(app, config);

    require("./app/routes/regions.routes")(app);
    require("./app/routes/districts.routes")(app);
    require("./app/routes/villages.routes")(app);

    require("./app/routes/errors.routes")(app);

    app.listen(5000, () => {
        console.log(`Server beží na porte ${5000}`)
    });
}).catch(console.error);