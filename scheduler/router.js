const express = require("express");
const router = express.Router();

const path = require("path");


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});

router.use("/styles", express.static(path.join(__dirname, "styles"), {
    etag: false
}));

router.use("/dist", express.static(path.join(__dirname, "dist"), {
    etag: false
}));

module.exports = router;