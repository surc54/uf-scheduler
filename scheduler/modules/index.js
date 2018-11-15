import $ from "jquery";
import CourseSidebarModule from "./CourseSidebarModule";
import NewCourseModule from "./NewCourseModule";
import Test from "./Test";
import UFDataRetriever from "../../modules/UFDataRetriever";
import LoadingModule from "../../modules/LoadingModule";
import CourseManager from "./CourseManager";
import {Class} from "../../modules/Class";


let main,
    courses,
    courseList,
    courseDrag,
    newCourseModule,
    courseManager;
    
$(() => {
    main = $("body > main");
    courses = $("div#courses");
    courseList = courses.find("section#courseList");
    courseDrag = null;
    
    /**@type {NewCourseModule} */
    newCourseModule = new NewCourseModule();

    /** @type {CourseManager} */
    courseManager = new CourseManager();

    CourseSidebarModule.init(main);
    

    newCourseModule.init();

    newCourseModule.showSearchModal((modal) => {
        modal.getElement().find("[s_action='search-classes']").on("click", (e) => {
            newCourseModule.clearErrorsInSearchForm();

            let validation = newCourseModule.validateInputs();
            if (validation !== true) {
                validation.forEach(value => {
                    newCourseModule.showErrorInSearchForm(value);
                });
                return;
            }

            let loadingModule = new LoadingModule("section#search_results");
            loadingModule.show(false);

            // UFDataRetriever.sampleData().then((classes) => {
            //     let classList = UFDataRetriever.parseData(classes);
            //     console.log("Found classes", classList);
            //     newCourseModule.showResults(classList);
            //     global.cl = classList;
            // }).catch(reason => {
            //     newCourseModule.showErrorInSearchForm(reason);
            // });
            let options = {
                semesterCode: $("#s_search_semester_code").val(),
            };
            let classNumInput = $("div.modal #s_search_class_num");
            if (classNumInput.val()) {
                options.classNum = classNumInput.val()
            } else {
                options.courseCode = $("div.modal #s_search_course_code").val();
            }
            console.log(options);
            UFDataRetriever.search(options).then((classes) => {
                let classList = UFDataRetriever.parseData(classes);
                console.log("Found classes", classList);
                newCourseModule.showResults(classList);
                global.cl = classList;
            }).catch(reason => {
                newCourseModule.showErrorInSearchForm(reason);
                console.log(reason);
            });

        });
        
    });

    $("#courses-add").on("click", (e) => {
        e.preventDefault();
        // search modal open goes here
    });





    
    // Calling test.
    Test();

});


