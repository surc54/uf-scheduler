import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class UFDataService {

    constructor() {
    }

    static validateCourseCode(courseCode: string) {
        const regex: RegExp = new RegExp(/^[a-zA-Z0-9]*$/);
        return regex.test(courseCode);
    }

    static search(options: SearchOptions) {
        if (!options.classNumber && !options.courseCode) {
            console.error("[UFDataService] No course specific options specified.");
            return null;
        }
        console.log("Validation of bigboi: " + this.validateCourseCode("bigboi"));
        console.log("Validation of bigboi!: " + this.validateCourseCode("bigboi!"));
        console.log("Validation of <nothing>: " + this.validateCourseCode(""));
        console.log("Validation of >something<: " + this.validateCourseCode(">something<"));
    }

}

interface SearchOptions {
    semesterCode: number;
    classNumber?: number;
    courseCode?: string;
}
