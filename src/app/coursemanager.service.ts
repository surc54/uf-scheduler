import {Injectable} from "@angular/core";

import {Class, Meeting} from "../models/Class";

@Injectable({
    providedIn: "root"
})
export class CourseManagerService {

    static customClassNumber = -1;

    courses: Class[];

    constructor() {

    }

    addCourse(c: Class) {

    }

    alreadyInCourseList(c: Class|number) {
        if (c instanceof  Class) {
            // Is Class Object

        } else {
            // Is (hopefully) a number
        }
    }

}
