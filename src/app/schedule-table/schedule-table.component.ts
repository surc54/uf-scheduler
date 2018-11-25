import {Component, OnInit} from "@angular/core";
import {CourseManagerService} from "../coursemanager.service";
import {animate, query, state, style, transition, trigger} from "@angular/animations";
import {Class} from "../../models/Class";
import {SearchPreviewService} from "../search-preview.service";
import {UFDataService} from "../ufdata.service";

@Component({
    selector: "app-schedule-table",
    templateUrl: "./schedule-table.component.html",
    styleUrls: ["./schedule-table.component.scss"],
    animations: [
        trigger("classBlock", [
            state("void", style({
                transform: "scale(0.7)",
                opacity: 0
            })),
            state("*", style({
                transform: "scale(1)"
            })),
            transition(":enter", animate("0.25s 0s ease-in-out")),
            transition(":leave", animate("0.25s 0s ease-in-out"))
        ]),
        trigger("previewAnimation", [
            state("sty3", style({
                opacity: 1
            })),
            transition("sty1 => sty2", animate("1s 0.25s ease-in-out", style({
                opacity: 0.3,
                transform: "scale(0.9)"
            }))),
            transition("sty2 => sty1", animate("1s 0.25s ease-in-out", style({
                opacity: 1,
                transform: "scale(1)"
            }))),
        ])
    ]
})
export class ScheduleTableComponent implements OnInit {

    anim = "sty1";
    eCells = false;

    constructor(protected courseManager: CourseManagerService,
                protected searchPreview: SearchPreviewService,
                private data: UFDataService) {
    }

    ngOnInit() {
        setInterval(() => {
            this.anim = this.anim === "sty1" ? "sty2" : "sty1";
        }, 950);

        let ints: number[] = [11190, 11050, 19141, 19169, 16234, 16239];
        ints = [];
        setTimeout(() => {
            for (let i = 0; i < ints.length; i++) {
                let n = ints[i];
                this.data.search({
                    semesterCode: 2191,
                    classNumber: n
                })
                    .subscribe(
                        val => {
                            if (val.length !== 0) {
                                this.courseManager.addCourse(val[0]).
                                catch(err => {
                                    console.warn("something went wrongo!!", err);
                                });
                            }
                        },
                        err => {

                        });
            }
        }, 500);
    }

    getBackground(c: Class) {
        return c.options.colors.background;
    }

    getForeground(c: Class) {
        return c.options.colors.foreground;
    }

    getOpacity(c: Class) {
        return "1";
    }

    isPreview(c: Class) {
        if (!this.searchPreview.previewClass) {
            return false;
        }
        return c.classNumber === this.searchPreview.previewClass.classNumber;
    }

}
