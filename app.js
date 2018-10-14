const express = require("express");
const app = express();
const http = app.listen(process.env.PORT || 80);


app.get("/", (req, res) => {
    res.status(200).send("Good to go.");
});