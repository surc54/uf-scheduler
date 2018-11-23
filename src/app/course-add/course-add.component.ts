import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Class, Meeting} from "../../models/Class";
import {CourseManagerService} from "../coursemanager.service";
import {SearchOptions, UFDataService} from "../ufdata.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {MatButton, MatSnackBar} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: "app-course-add",
    templateUrl: "./course-add.component.html",
    styleUrls: ["./course-add.component.scss"]
})
export class CourseAddComponent implements OnInit {

    constructor(protected couresManager: CourseManagerService,
                private data: UFDataService,
                private snackBar: MatSnackBar) {
    }

    protected results: Class[] = [];

    // tslint:disable-next-line
    searchForm = new FormGroup({
            semester: new FormControl(
                "2191",
                Validators.required),
            classNumber: new FormControl(
                "",
                CourseAddComponent.classNumberLengthValidator),
            courseCode: new FormControl(
                "",
                [
                    CourseAddComponent.courseCodeAlphaNumericValidator,
                    CourseAddComponent.courseCodeLengthValidator
                ])
        },
        {validators: CourseAddComponent.atLeastOneClassSpecifier}
    );

    searching = false;
    searchedOnce = false;

    static atLeastOneClassSpecifier: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        const classNum = control.get("classNumber");
        const courseCode = control.get("courseCode");

        return !classNum.value && !courseCode.value ? {"noSpecifier": true} : null;
        // tslint:disable-next-line semicolon
    };

    static courseCodeAlphaNumericValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const regex: RegExp = new RegExp(/^[a-zA-Z0-9]*$/);
        // console.log(`testing ${control.value} /// ${regex.test(control.value)}`);
        return (regex.test(control.value)) ? null : {"notAlphaNumeric": true};
        // tslint:disable-next-line
    };

    static courseCodeLengthValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }
        const s = String(control.value);
        if (s.length > 10 || s.length < 4) {
            return {"invalidLength": true};
        } else {
            return null;
        }
        // tslint:disable-next-line
    };

    static classNumberLengthValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }
        const s = String(control.value);
        if (s.length !== 5 && s.length !== 0) {
            return {"notFiveChars": true};
        } else {
            return null;
        }
        // tslint:disable-next-line
    };

    ngOnInit() {
        // TODO: test items below. remove soon
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
        // this.results.push(x); // for testing

        // setInterval(() => {
        //     console.log(this.searchForm.errors);
        //     console.log(this.searchForm.get("courseCode").errors);
        // }, 500);
    }

    search(e) {
        // e.preventDefault();
        // console.log(this.searchForm);

        let semester = this.searchForm.get("semester");
        let classNum = this.searchForm.get("classNumber");
        let courseCode = this.searchForm.get("courseCode");


        let options: SearchOptions = {
            semesterCode: semester.value
        };

        if (classNum.value && classNum.valid) {
            options.classNumber = classNum.value;
        }

        if (courseCode.value && courseCode.valid) {
            options.courseCode = courseCode.value;
        }

        this.searching = true;
        this.searchedOnce = true;

        this.results = [];

        this.data.search(options)
            .subscribe(
                (val) => {
                    this.searching = false;
                    this.results = val;
                    this.snackBar.open(`Found ${val.length} class${val.length === 1 ? "" : "es"}.`, "", {
                        duration: 3000
                    });
                },
                (err) => {
                    this.searching = false;
                    console.error("Could not execute class search: ", err);
                    if (err instanceof HttpErrorResponse) {
                        err = err.message;
                    }
                    if (Array.isArray(err)) {
                        err = err.join(", ");
                    }
                    this.snackBar.open("Could not search for classes: " + err, "Okay");
                }
            );

    }


}


interface SearchQuery {
    semester?: string;
    classNumber?: number;
    courseCode?: string;
}
