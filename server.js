const express = require('express');
const bodParser = require('body-parser');

const app = express();

app.use(bodParser.json());

app.use((req, res, next) => {
    console.log("Express middleware");
    next();
});

app.listen(5000);