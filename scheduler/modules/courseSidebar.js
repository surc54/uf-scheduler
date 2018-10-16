// import $ from "jquery";
let $ = require("jquery");
let EasingFunctions = require("../../modules/easing");
let main;

let CourseSidebar = {
    init: (mainDomElement) => {
        main = mainDomElement;
        CourseSidebar.resizeCourseList();
        CourseSidebar.expand(1); // quick expand.
        
        $("[s-action='expand-courses']").on("click", (e) => {
            e.preventDefault();
            CourseSidebar.expand();
        });

        $("[s-action='collapse-courses']").on("click", (e) => {
            e.preventDefault();
            CourseSidebar.collapse();
        });
        
        // Disabled because it might not be needed.
        // $(window).on("resize", (e) => {
        //     CourseSidebar.resizeCourseList();
        // });
    },

    /**
     * Expand Sidebar
     * sidebarAnimationMaxIndex - Controls speed of animation
     */
    expand: (sidebarAnimationMaxIndex = 25) => {
        $("a#courses-expand").hide();
        let i = 0;
        let interval = setInterval(() => {
            let percent = EasingFunctions.easeOutQuad(i++/sidebarAnimationMaxIndex);
            let maxValue = 50;
            if (percent >= 1) {
                main.css("grid-template-columns", "");
                main.removeClass("course-collapsed");
                CourseSidebar.resizeCourseList();
                clearInterval(interval);
            }
            main.css("grid-template-columns", "auto " + (maxValue * percent) + "rem");
        }, 10);
    },

    /**
     * Collapse Sidebar
     * sidebarAnimationMaxIndex - Controls speed of animation
     */
    collapse: (sidebarAnimationMaxIndex = 25) => {
        $("a#courses-expand").show();
        let i = sidebarAnimationMaxIndex;
        let initTime = Date.now();
        let interval = setInterval(() => {
            let percent = EasingFunctions.easeOutQuad(i--/sidebarAnimationMaxIndex);
            let maxValue = 50;
            if (percent <= 0) {
                main.css("grid-template-columns", "");
                main.addClass("course-collapsed");
                let endTime = Date.now();
                console.log("Animation took " + ((endTime - initTime) / 1000) + "s");
                clearInterval(interval);
            }
            main.css("grid-template-columns", "auto " + (maxValue * percent) + "rem");
        }, 10);
    },

    /**
     * Resize Course List
     * Should the size of section.header change, resize courseList to fit on window.
     */
    resizeCourseList: (valueToSubtract) => {
        $("section#courseList").css({
            height: "calc(100vh - " + valueToSubtract + "px)"
        });
        // courses.find("section.header").outerHeight()
    }
};

module.exports = CourseSidebar;