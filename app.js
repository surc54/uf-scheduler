const express = require("express");
const app = express();
const http = app.listen(process.env.PORT || 80);

const path = require("path");
const morgan = require("morgan");

app.use(morgan("dev"));

app.use("/public", express.static("public"));

const schedulerRouter = require("./scheduler/router");
app.use("/schedule", schedulerRouter);

app.get("/", (req, res) => {
    res.redirect("/schedule");
});

app.use((req, res) => {
    res.status(404).send("404?<br>" + req.path);
});