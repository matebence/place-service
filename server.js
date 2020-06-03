const hateoasLinker = require('express-hateoas-links');
const expressValidator = require('express-validator');
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

require("./app/models");
require("./app/component/eureka");
require("./app/component/zipkin")(app);
require("./app/routes/regions.routes")(app);
require("./app/routes/districts.routes")(app);
require("./app/routes/villages.routes")(app);
require("./app/routes/errors.routes")(app);

app.listen(5000, () => {
    console.log(`Server beží na porte ${5000}`)
});