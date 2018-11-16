import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material";
import {UFDataService} from "../ufdata.service";

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<AboutComponent>) {
    }

    ngOnInit() {
        UFDataService.search({
            classNumber: 33,
            semesterCode: 3
        });
    }

    closeModal() {
        this.dialogRef.close();
    }

}
