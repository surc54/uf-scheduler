import {Component, OnInit} from "@angular/core";
import {CourseManagerService} from "../coursemanager.service";
import {MatSnackBar} from "@angular/material";
import {Class} from "../../models/Class";

import {
    trigger,
    state,
    style,
    animate,
    transition, animateChild, query, sequence
} from "@angular/animations";

@Component({
    selector: "app-course-list",
    templateUrl: "./course-list.component.html",
    styleUrls: ["./course-list.component.scss"],
    animations: [
        trigger("courseListParent", [
            transition(":enter, :leave", [
                query("@*", animateChild())
            ])
        ]),
        trigger("noCourseMessage", [
            state("void", style({
                opacity: 0,
                transform: "translateX(-100px)",
            })),
            state("*", style({
                opacity: 1,
                transform: "translateX(0px)",
            })),
            transition("* <=> void", [
                animate("0.25s 0s ease-in-out")
            ])
        ])
    ]
})
export class CourseListComponent implements OnInit {

    constructor(protected courseManager: CourseManagerService, private snackBar: MatSnackBar) {
    }

    ngOnInit() {

    }

    forceDelete(a: any) {
        a.nativeElement.remove();
    }

    removeCourse(c: Class) {
        this.courseManager.removeCourse(c.classNumber)
            .then(val => {
                this.snackBar.open(`Removed course "${c.courseCode}"`, "", {
                    duration: 5000
                });
            })
            .catch(err => {
                console.error("Attempt to remove course failed: ", err);
                this.snackBar.open(`Could not remove course "${c.courseCode}". Error: ${err}`, "", {
                    duration: 5000
                });
            });
    }
}
