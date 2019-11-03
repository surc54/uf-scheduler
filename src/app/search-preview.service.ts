import { Injectable } from "@angular/core";
import { Class, ColorTemplate, Meeting } from "../models/Class";
import { CourseManagerService, SchedulerInfo } from "./coursemanager.service";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
    providedIn: "root",
})
export class SearchPreviewService {
    static savedSearchQuery: SearchQuery = {
        semester: "2201",
    };
    static savedResults: Class[] = [];

    constructor(private _sanitizer: DomSanitizer) {}

    previewClass: Class;
    private previousColors: ColorTemplate;
    meetings: SchedulerInfo[];

    setPreviewClass(c: Class) {
        this.unsetPreviewClass();

        this.previewClass = c;

        // save and set colors
        let colors = this.previewClass.options.colors;
        this.previousColors = {
            background: colors.background,
            foreground: colors.foreground,
        };
        colors.background = "black";
        colors.foreground = "white";

        this.buildMeetings();
    }

    unsetPreviewClass() {
        if (this.previewClass) {
            this.previewClass.options.colors = {
                background: this.previousColors.background,
                foreground: this.previousColors.foreground,
            };
        }
        this.meetings = [];
        this.previewClass = null;
    }

    buildMeetings() {
        this.meetings = [];
        if (!this.previewClass) {
            return;
        }

        let result: SchedulerInfo;

        for (let j = 0; j < this.previewClass.meetings.length; j++) {
            let m = this.previewClass.meetings[j];
            for (let k = 0; k < m.days.length; k++) {
                let d = m.days[k];
                let m2 = new Meeting(d, m.startPeriod, m.endPeriod);
                result = {
                    course: this.previewClass,
                    meeting: m2,
                    gridArea: this.getGridArea(m2),
                };
                this.meetings.push(result);
            }
        }
    }

    getGridArea(m: Meeting) {
        let rowStart: number, rowEnd: number, colStart: number, colEnd: number;
        let d = m.days[0];
        switch (d.toLowerCase()) {
            case "m":
                colStart = 3;
                colEnd = 4;
                break;
            case "t":
                colStart = 4;
                colEnd = 5;
                break;
            case "w":
                colStart = 5;
                colEnd = 6;
                break;
            case "r":
                colStart = 6;
                colEnd = 7;
                break;
            case "f":
                colStart = 7;
                colEnd = 8;
                break;
            case "s":
                colStart = 8;
                colEnd = 9;
                break;
            default:
                return null;
        }

        rowStart = Number(m.startPeriod) + 1;
        rowEnd = Number(m.endPeriod) + 2;

        return this._sanitizer.bypassSecurityTrustStyle(
            `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`
        );
    }
}

export interface SearchQuery {
    semester?: string;
    classNumber?: number;
    courseCode?: string;
}
