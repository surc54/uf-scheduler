import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {MatDialog, MatSnackBar} from "@angular/material";
import {AboutComponent} from "../about/about.component";
import {CourseManagerService} from "../coursemanager.service";
import {Class} from "../../models/Class";
import {UFDataService} from "../ufdata.service";

@Component({
    selector: "app-toolbar",
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {

    @Input() sidebar;
    @Output() clickAdd: EventEmitter<boolean> = new EventEmitter();

    addButtonToggle = false;


    constructor(public snackBar: MatSnackBar,
                public dialog: MatDialog,
                private courseManager: CourseManagerService,
                private data: UFDataService) {
    }

    ngOnInit() {
    }

    toggleSidebar() {
        if (this.sidebar) {
            this.sidebar.toggle();
        }
    }

    click_addCourse() {
        this.addButtonToggle = !this.addButtonToggle;
        this.clickAdd.emit(this.addButtonToggle);
        return;

        // old stuff
        let message = "Feature is not implemented.";

        message = "Searching for classes...";
        this.data.search({
            semesterCode: 2191,
            classNumber: 11190
        }).subscribe(
            val => {
                if (val.length === 0) {
                    this.snackBar.open("Class was not found.", "", {
                        duration: 5000
                    });
                } else {
                    this.snackBar.open("Class found! Attempting to add...", "", {
                        duration: 5000
                    });
                    let c = val[0];
                    let result = this.courseManager.addCourse(c);
                    result.then(courseList => {
                        this.snackBar.open("Class added successfully.", "", {
                            duration: 5000
                        });
                    }).catch(err => {
                        this.snackBar.open("Could not add class: " + err, "", {
                            duration: 5000
                        });
                    });
                }
            },
            err => {
                this.snackBar.open("Something went wrong.", "", {
                    duration: 5000
                });
            }
        );

        // do something
        const unimplemented = this.snackBar.open(message, "Okay", {
            duration: 5000
        });
    }

    click_about() {
        this.dialog.open(AboutComponent, {
            minWidth: 500
        });
    }
}
