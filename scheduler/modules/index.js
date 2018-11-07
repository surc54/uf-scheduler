import $ from "jquery";
import CourseSidebarModule from "./CourseSidebarModule";
import NewCourseModule from "./NewCourseModule";
import Test from "./Test";
import {ContentType} from "./ModalModule";

let main,
    courses,
    courseList,
    courseDrag;
    
$(() => {
    main = $("body > main");
    courses = $("div#courses");
    courseList = courses.find("section#courseList");
    courseDrag = null;

    CourseSidebarModule.init(main);
    

    NewCourseModule.init();

    $("#courses-add").on("click", (e) => {
        e.preventDefault();
        NewCourseModule.showSearchModal((modal) => {
            modal.getElement().find("[s_action='search-classes']").on("click", (e) => {console.log("tttt");});

            setTimeout(() => {
                modal.saveState("test1");
                modal.setContent({
                    type: ContentType.CUSTOM,
                    data: "Test111"
                });
                modal.updateModal();

                setTimeout(() => {
                    modal.loadState("test1");
                    modal.updateModal();
                }, 2500)
            }, 2500);
        });
    });





    
    // Calling test.
    Test();

});


