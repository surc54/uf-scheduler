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
                query("@*", animateChild(), {optional: true})
            ])
        ]),
        trigger("sidebarItemEntryExit", [
            state("void", style({
                opacity: 0,
                transform: "translateY(-100px)",
                height: 0,
                paddingTop: 0,
                paddingRight: 0,
                paddingLeft: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginRight: 0,
                marginLeft: 0,
                marginBottom: 0,
            })),
            state("*", style({
                opacity: 1,
                transform: "translateY(0)"
            })),
            transition(":leave", sequence([
                animate("0.25s 0s ease-in-out", style({
                    opacity: 0,
                    transform: "translateY(-100px)",
                    height: 0,
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingBottom: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginLeft: 0,
                    marginBottom: 0,
                })),
            ])),
            transition(":enter", [
                style({
                    opacity: 0,
                    height: 0,
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingBottom: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginLeft: 0,
                    marginBottom: 0,
                    transform: "translateY(-100px)"
                }),
                animate("0.25s 0.5s ease-in-out", style({
                    opacity: 1,
                    transform: "translateY(0)",
                })),
            ]),
        ]),
        trigger("noCourseMessage", [
            state("void", style({
                opacity: 0,
                transform: "translateY(-100px)",
            })),
            state("*", style({
                opacity: 1,
                transform: "translateY(0px)",
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
