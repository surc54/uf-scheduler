import $ from "jquery";
import CourseSidebar from "./CourseSidebar";
import {FullScreenBackdrop} from "./FullScreenBackdrop";

let main,
    courses,
    courseList,
    courseDrag;
    
$(() => {
    main = $("main");
    courses = $("div#courses");
    courseList = courses.find("section#courseList");
    courseDrag = null;

    CourseSidebar.init(main);
    courseList.find(".course").on("mousedown", (e) => {
        e.preventDefault();
        courseDrag = {
            elem: $(e.currentTarget),
            activated: false,
            clickOrigin: {
                x: e.clientX,
                y: e.clientY
            }
        };
    });

    $(window).on("mouseup", (e) => {
        if (courseDrag != null) {
            if (courseDrag.activated) {
                e.preventDefault();
                courseDrag.dragger.removeClass("active");
                courseDrag.dragger.remove();
            }
            courseDrag = null;
        }
    });

    $(window).on("mousemove", (e) => {
        if (courseDrag != null) {
            let x = e.clientX;
            let y = e.clientY;

            if (courseDrag.activated) {
                e.preventDefault();
                courseDrag.dragger.css({
                    left: (e.clientX - 0.5 * courseDrag.dragger.width()) + "px",
                    top: (e.clientY - 0.5 * courseDrag.dragger.height()) + "px"
                });
                setTimeout(() => {
                    if (courseDrag != null && courseDrag.activated) {
                        courseDrag.dragger.addClass("active");
                    }
                }, 100);
            } else {
                let dist = distance(x, y, courseDrag.clickOrigin.x, courseDrag.clickOrigin.y);
                if (dist > 100) {
                    let cd = document.createElement("div");
                    cd = $(cd);
                    cd.addClass("course-drag");
                    // INSERT CLASS CODE!!
                    cd.html("COP3503");

                    $("body").append(cd);

                    cd.css({
                        left: (e.clientX - 0.5 * cd.width()) + "px",
                        top: (e.clientY - 0.5 * cd.height()) + "px"
                    });

                    courseDrag.activated = true;
                    courseDrag.dragger = cd;
                }
            }
        }
    });

    setTimeout(() => {
        FullScreenBackdrop.listeners.click = (e, elem) => {
            e.preventDefault();
            FullScreenBackdrop.removeBackdrop();
        };
        FullScreenBackdrop.createBackdrop(10, "body");
    }, 500);

});



function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}