import $ from "jquery";
let CourseSidebar = require("./courseSidebar");

let main,
    courses,
    courseList;

$(() => {
    main = $("main");
    courses = $("div#courses");
    courseList = courses.find("section#courseList");

    CourseSidebar.init(main);

});