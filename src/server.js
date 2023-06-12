'use strict';
const express = require("express");
const app = express();
const foodRouter=require('./routes/foodRoutes')
const clothesRouter=require('./routes/clothesRoutes')
const notFound = require("./handlers/404");
const errorHandler = require("./handlers/500");
app.use(express.json());
app.use(foodRouter);
app.use(clothesRouter);

app.get('/', welcomeHandler);
function welcomeHandler(req, res) {
    res.status(200).send('hi');
}
function start(port) {
    app.listen(port, () => {
        console.log(`server is up and listen on ${port}`)
    });
}

app.use("*", notFound);
app.use(errorHandler);

module.exports = {
    start: start,
    app: app,
}

//comment 