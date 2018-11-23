import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Class} from "../../models/Class";
import {CourseManagerService} from "../coursemanager.service";
import {animate, sequence, style, transition, trigger} from "@angular/animations";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: "app-class-card",
    templateUrl: "./class-card.component.html",
    styleUrls: ["./class-card.component.scss"],
    animations: [
        trigger("courseListItem", [
            transition(":enter", [
                style({
                    transform: "translateX(-100px)",
                    opacity: 0
                }),
                animate("0.25s 0s ease-in-out", style({
                    transform: "translateX(0px)",
                    opacity: 1,
                })),
            ]),
            transition(":leave", sequence([
                animate("0.25s 0s ease-in-out", style({
                    transform: "translateX(-100px)",
                    opacity: 0
                })),
                animate("0.25s 0s ease-in-out", style({
                    transform: "translateX(-100px)",
                    opacity: 0,
                    height: 0,
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingBottom: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginLeft: 0,
                    marginBottom: 0
                }))
            ])),
        ]),
    ]
})
export class ClassCardComponent implements OnInit {

    @Input() classNum: number;
    // tslint:disable-next-line:no-input-rename
    @Input("class") attrCourse: Class;
    @Input() footer = "IN_COURSE_LIST";

    @Output() selfRemove: EventEmitter<any> = new EventEmitter();

    course: Class = new Class({
        name: "Invalid Course",
        courseCode: "INV1000",
        classNumber: -1,
        instructors: [],
        meetings: [],
        colors: {
            background: "black",
            foreground: "white"
        }
    });

    constructor(protected courseManager: CourseManagerService, private snackBar: MatSnackBar, private nativeElement: ElementRef) {
    }

    ngOnInit() {
        if (this.attrCourse) {
            this.course = this.attrCourse;
            if (this.courseManager.getCourse(this.course.classNumber)) {
                // GET COLORS FROM COURSE MANAGER!! COULD BE A LOT MORE CHECKS BUT IM SUPER LAZY
                this.course.options.colors = this.courseManager.getCourse(this.course.classNumber).options.colors;
            }
        } else if (this.classNum) {
            this.course = this.courseManager.getCourse(this.classNum);
            if (this.course === null) {
                throw new Error("Invalid class number given as component attribute (@Input).");
            }
        } else {
            throw new Error("No attribute given to identify class. Provide either 'class' or 'classNum'");
        }
    }

    add() {
        this.courseManager.addCourse(this.course)
            .then(val => {
                this.snackBar.open(`Added course ${this.course.courseCode}`, "", {
                    duration: 5000
                });
            })
            .catch(err => {
                this.snackBar.open(`Failed to add course ${this.course.courseCode}: ${err}`, "", {
                    duration: 5000
                });
            });
    }

    remove() {
        this.courseManager.removeCourse(this.course.classNumber)
            .then(val => {
                this.snackBar.open("Removed course " + this.course.courseCode + ".", "", {
                    duration: 5000
                });
            })
            .catch(err => {
                console.log("Attempting to remove course that is not in Course Manager.");
                this.selfRemove.emit(this.nativeElement);
                this.snackBar.open("Removed custom course " + this.course.courseCode + ".", "", {
                    duration: 5000
                });
            });
    }

    preview(add: boolean) {
        if (add && !this.courseManager.alreadyInCourseList(this.course.classNumber)) {
            this.courseManager.addCourse(this.course);
        } else if (!add && this.courseManager.alreadyInCourseList(this.course.classNumber)) {
            this.courseManager.removeCourse(this.course.classNumber);
        }
    }

}


@Component({
    selector: "app-class-card-instructor",
    template: "<ng-content></ng-content>",
    styleUrls: [
        "./class-card-instructor.component.scss"
    ]
})
export class ClassCardInstructorComponent implements OnInit {

    ngOnInit(): void {

    }
}
