const bodyParser = require('body-parser');
const express = require('express');
const cors = require("cors");

const app = express();
const database = require("./app/models");

database.sequelize.sync({force: true});

app.use(cors({origin: "http://localhost:5000"}));
app.use(bodyParser.json());

require("./app/routes/regions.routes")(app);
require("./app/routes/districts.routes")(app);
require("./app/routes/villages.routes")(app);

app.listen(5000);