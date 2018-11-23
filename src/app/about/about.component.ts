import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material";
import {UFDataService} from "../ufdata.service";

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<AboutComponent>, private data: UFDataService) {
    }

    ngOnInit() {
        this.data.search({
            classNumber: 11190,
            semesterCode: 2191
        }).subscribe(val => {
            console.log("Value retrieved! ", val);
        }, err => {
            console.error("Something went wrong while searching! ", err);
        });
    }

    closeModal() {
        this.dialogRef.close();
    }

}
