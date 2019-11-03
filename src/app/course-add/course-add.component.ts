import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Class, Meeting} from "../../models/Class";
import {CourseManagerService} from "../coursemanager.service";
import {SearchOptions, UFDataService} from "../ufdata.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {MatButton, MatSnackBar} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";
import {animate, sequence, state, style, transition, trigger} from "@angular/animations";
import {SearchPreviewService} from "../search-preview.service";

@Component({
    selector: "app-course-add",
    templateUrl: "./course-add.component.html",
    styleUrls: ["./course-add.component.scss"],
    animations: [
        trigger("sidebarItemEntryExit", [
            state("void", style({
                opacity: 0,
                transform: "translateY(100px)"
            })),
            state("*", style({
                opacity: 1,
                transform: "translateY(0)"
            })),
            transition(":leave", sequence([
                animate("0.25s 0s ease-in-out", style({
                    opacity: 0,
                    transform: "translateY(100px)"
                })),
                animate("0.25s 0s ease-in-out", style({
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
                })),
            ])),
            transition(":enter", [
                animate("0s", style({
                    opacity: 0,
                    transform: "translateY(100px)",
                    height: 0,
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingBottom: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginLeft: 0,
                    marginBottom: 0
                })),
                animate("0.25s 0.5s ease-in-out", style({
                    opacity: 1,
                    transform: "translateY(0)",
                })),
            ]),
        ]),
    ]
})
export class CourseAddComponent implements OnInit {

    constructor(protected couresManager: CourseManagerService,
                private data: UFDataService,
                private snackBar: MatSnackBar) {
    }

    results: Class[] = SearchPreviewService.savedResults;

    // tslint:disable-next-line
    searchForm = new FormGroup({
            semester: new FormControl(
                SearchPreviewService.savedSearchQuery.semester ? SearchPreviewService.savedSearchQuery.semester : "2201",
                Validators.required),
            classNumber: new FormControl(
                SearchPreviewService.savedSearchQuery.classNumber ? SearchPreviewService.savedSearchQuery.classNumber : "",
                CourseAddComponent.classNumberLengthValidator),
            courseCode: new FormControl(
                SearchPreviewService.savedSearchQuery.courseCode ? SearchPreviewService.savedSearchQuery.courseCode : "",
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
            SearchPreviewService.savedSearchQuery.classNumber = classNum.value;
        } else {
            SearchPreviewService.savedSearchQuery.classNumber = null;
        }

        if (courseCode.value && courseCode.valid) {
            options.courseCode = courseCode.value;
            SearchPreviewService.savedSearchQuery.courseCode = courseCode.value;
        } else {
            SearchPreviewService.savedSearchQuery.courseCode = null;
        }

        this.searching = true;
        this.searchedOnce = true;

        this.results = [];

        this.data.search(options)
            .subscribe(
                (val) => {
                    this.searching = false;
                    this.results = val;
                    SearchPreviewService.savedResults = this.results;
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

