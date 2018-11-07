const express = require("express");
const app = express();
const http = app.listen(process.env.PORT || 80);

const path = require("path");
const morgan = require("morgan");

app.use(morgan("dev"));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


/**
 * STATIC PATH (/public)
 */
app.use("/public", express.static("public"));

/**
 * ROUTERS
 */
const schedulerRouter = require("./scheduler/router");
app.use("/schedule", schedulerRouter);

const classLookupRouter = require("./classlookup/router");
app.use("/lookup", classLookupRouter);

/**
 * REDIRECTION FOR /
 * Might use a landing page instead, but for now, this will do.
 */
app.get("/", (req, res) => {
    res.redirect("/schedule");
});

/**
 * 404 Error
 */
app.use((req, res) => {
    res.status(404).send("404?<br>" + req.path);
});