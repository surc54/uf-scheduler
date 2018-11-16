import {Component, OnInit} from "@angular/core";
import {MatDialog, MatSnackBar} from "@angular/material";
import {AboutComponent} from "../about/about.component";

@Component({
    selector: "app-toolbar",
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {

    constructor(public snackBar: MatSnackBar, public dialog: MatDialog) {
    }

    ngOnInit() {
    }

    click_addCourse() {
        // do something
        const unimplemented = this.snackBar.open("Feature is not implemented.", "Okay", {
            duration: 5000
        });
    }

    click_about() {
        this.dialog.open(AboutComponent, {
            minWidth: 500
        });
    }
}
