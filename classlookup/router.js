const express = require("express");
const router = express.Router();

const request = require("request-promise-native");

router.post("/encodeme", (req, res) => {
    let json = req.body;

    let status = 200;
    let response;

    res.setHeader("Content-Type", "text/json");

    if (!json) {
        status = 500;
        response = JSON.stringify({error: "Server error"});
    } else {
        res.setHeader("Content-Type", "text/plain");
        response = encodeURI(JSON.stringify(json));
    }

    res.status(status).send(response);
});

/**
 * /?json=<data>
 * 
 *  data {JSON}: {
 *      semesterCode (number),
 *      classNum? (number|string),
 *      courseCode? (string)
 *  }
 */
router.get("/", async (req, res) => {
    let options = JSON.parse(decodeURI(req.query.json));
    let semesterCode = options.semesterCode;
    let classNum = options.classNum;
    let courseCode = options.courseCode;

    let status = 200;
    let response;

    res.setHeader("Content-Type", "text/json");

    if (!semesterCode) {
        status = 400;
        response = JSON.stringify({error: "Missing parameter (semesterCode)"});
    } else if (!classNum && !courseCode) {
        status = 400;
        response = JSON.stringify({error: "Missing parameter (classNum/courseCode)"});
    } else {
        let x = await sendRequest(options);
        response = x;
    }

    res.status(status).send(response);
});

async function sendRequest(options) {
    let semesterCode = options.semesterCode;
    let classNum = options.classNum;
    let courseCode = options.courseCode;
    let url = "https://one.uf.edu/apix/soc/schedule/" +
    "?category=CWSP" +
    `&class-num=${classNum ? classNum : ""}` +
    `&course-code=${courseCode ? courseCode : ""}` +
    "&course-title=" +
    "&cred-srch=" +
    "&credits=" +
    "&day-f=" +
    "&day-m=" +
    "&day-r=" +
    "&day-s=" +
    "&day-t=" +
    "&day-w=" +
    "&days=false" +
    "&dept=+" +
    "&eep=" +
    "&fitsSchedule=false" +
    "&ge=" +
    "&ge-b=" +
    "&ge-c=" +
    "&ge-d=" +
    "&ge-h=" +
    "&ge-m=" +
    "&ge-n=" +
    "&ge-p=" +
    "&ge-s=" +
    "&hons=false" +
    "&instructor=" +
    "&last-control-number=0" +
    "&level-max=--" +
    "&level-min=--" +
    "&no-open-seats=false" +
    "&online-a=" +
    "&online-c=" +
    "&online-h=" +
    "&online-p=" +
    "&period-b=" +
    "&period-e=" +
    "&prog-level=+" +
    `&term=${semesterCode}` +
    "&wr-2000=" +
    "&wr-4000=" +
    "&wr-6000=" +
    "&writing=";
    let res = request(url, function (error, res, body) {
        if (error) repsonse = JSON.stringify({error: error});
        else {
            reponse = body;
        }
    });
    return res;
}

module.exports = router;