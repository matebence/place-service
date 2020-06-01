const hateoasLinker = require('express-hateoas-links');
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require("cors");

const app = express();

app.use(cors({origin: "http://localhost:5000"}));
app.use(bodyParser.json());
app.use(hateoasLinker);
app.use(helmet());

require("./app/models");
require("./app/routes/regions.routes")(app);
require("./app/routes/districts.routes")(app);
require("./app/routes/villages.routes")(app);
require("./app/routes/errors.routes")(app);

app.listen(5000, () => {
    console.log(`Server beží na porte ${5000}`)
});