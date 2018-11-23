import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Class, Meeting} from "../models/Class";

@Injectable({
    providedIn: "root"
})
export class UFDataService {

    static sampleClassNum = 99999;

    constructor(private http: HttpClient) {
    }

    static validateCourseCode(courseCode: string) {
        const errors: string[] = [];

        const regex: RegExp = new RegExp(/^[a-zA-Z0-9]*$/);
        if (!regex.test(courseCode)) {
            errors.push("Course code is not alphanumeric.");
        }

        if (courseCode.length > 10) {
            errors.push("Course code is unusually long.");
        }

        if (errors.length === 0) {
            return false;
        } else {
            return errors;
        }
    }

    static validateClassNumber(classNum: number) {
        let s = String(classNum);
        if (s.length !== 5 && s.length !== 0) {
            return ["Class number must be five digits."];
        } else {
            return false;
        }
    }

    search(options: SearchOptions) {
        if (!options.classNumber && !options.courseCode) {
            return Observable.create((obs) => {
                obs.error("No course specific options specified");
            });
        }

        let json = {
            semesterCode: options.semesterCode,
        };

        let errors: string[] = [];

        if (options.courseCode) {
            const v = UFDataService.validateCourseCode(options.courseCode);
            if (v) {
                errors.concat(v);
            } else {
                json["courseCode"] = options.courseCode;
            }
        }

        if (options.classNumber) {
            const v = UFDataService.validateClassNumber(options.classNumber);
            if (v) {
                errors.concat(v);
            } else {
                json["classNumber"] = options.classNumber;
            }
        }

        if (errors.length !== 0) {
            return Observable.create((obs) => {
                for (let i = 0; i < errors.length; i++) {
                    obs.error(errors[i]);
                }
            });
        }

        let t_beginPeriod = Math.ceil(Math.random() * 11);
        let c = new Class({
            name: "Sample Class " + (100000 - UFDataService.sampleClassNum),
            classNumber: UFDataService.sampleClassNum--,
            courseCode: "SMPXXXX",
            instructors: ["Sample Teacher"],
            meetings: [
                new Meeting(Math.random() > 0.5 ? "M W F" : "T R", t_beginPeriod,
                    Math.random() > 0.5 || t_beginPeriod === 11 ? t_beginPeriod : t_beginPeriod + 1)
            ]
        });

        // return of([c]); // sample



        return this.http.get("http://localhost/lookup", {
            params: {
                json: JSON.stringify(json)
            }
        });

        // Validation testing
        // console.log("Validation of bigboi: " + this.validateCourseCode("bigboi"));
        // console.log("Validation of bigboi!: " + this.validateCourseCode("bigboi!"));
        // console.log("Validation of <nothing>: " + this.validateCourseCode(""));
        // console.log("Validation of >something<: " + this.validateCourseCode(">something<"));
    }

}

export interface SearchOptions {
    semesterCode: number;
    classNumber?: number;
    courseCode?: string;
}
