import {Component, OnInit} from "@angular/core";
import {Class, Meeting} from "../../models/Class";
import {CourseManagerService} from "../coursemanager.service";

@Component({
    selector: "app-course-add",
    templateUrl: "./course-add.component.html",
    styleUrls: ["./course-add.component.scss"]
})
export class CourseAddComponent implements OnInit {

    protected searchErrors: string[] = [];
    protected results: Class[] = [];

    constructor(protected couresManager: CourseManagerService) {
    }

    ngOnInit() {
        // TODO: test items below. remove soon
        this.searchErrors.push("Sample error!");
        let x = new Class({
            classNumber: 11190,
            courseCode: "COP3502",
            name: "Programming Fundamentals 2",
            instructors: ["Joshua Fox"],
            meetings: [
                new Meeting("M W F", 10, 10)
            ],
            colors: {
                foreground: "black",
                background: "white"
            }
        });
        this.results.push(x);
    }

}
