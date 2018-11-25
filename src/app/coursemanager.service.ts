import {Injectable} from "@angular/core";

import {Class, Meeting} from "../models/Class";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {SearchPreviewService} from "./search-preview.service";

@Injectable({
    providedIn: "root"
})
export class CourseManagerService {

    constructor(private _sanitizer: DomSanitizer,
                private searchPreview: SearchPreviewService) {
        this.courses = [];
        this.meetingsNoTemp = [];
        this.colors = [
            {
                name: "s_color_1",
                background: "#3B8E30",
                foreground: "white",
                usage: 0
            },
            {
                name: "s_color_2",
                background: "#7C2774",
                foreground: "white",
                usage: 0
            },
            {
                name: "s_color_3",
                background: "#251351",
                foreground: "white",
                usage: 0
            },
            {
                name: "s_color_4",
                background: "#0149BC",
                foreground: "white",
                usage: 0
            },
            {
                name: "s_color_5",
                background: "#912224",
                foreground: "white",
                usage: 0
            },
        ];
        // Add sample course
        // this.addCourse(new Class({
        //     name: "Sample Class 1",
        //     courseCode: "SMP0001",
        //     classNumber: CourseManagerService.customClassNumber--,
        //     meetingsNoTemp: [
        //         new Meeting("M W F", 10, 10),
        //         new Meeting("F", 6, 7)
        //     ],
        //     instructors: ["Sample Teacher One"]
        // }));
    }

    static customClassNumber = -99999;

    courses: Class[];
    private meetingsNoTemp: SchedulerInfo[];
    meetings: SchedulerInfo[];
    eCells = false;

    colors: ColorUsage[] = [];

    static getConflictingMeetings(c1: Class, c2: Class) {
        let conflicts: MeetingConflict[] = [];

        for (let i = 0; i < c1.meetings.length; i++) {
            let m1 = c1.meetings[i];
            for (let j = 0; j < c2.meetings.length; j++) {
                let m2 = c2.meetings[j];
                for (let k = 0; k < m2.days.length; k++) {
                    let d2 = m2.days[k];
                    if (m1.days.indexOf(d2) !== -1) {
                        for (let l = m1.startPeriod; l <= m1.endPeriod; l++) {
                            if (l >= m2.startPeriod && l <= m2.endPeriod) {
                                conflicts.push({
                                    class1: c1,
                                    class2: c2,
                                    meeting1: m1,
                                    meeting2: m2,
                                    day: d2
                                });
                            }
                        }
                    }
                }
            }
        }
        if (conflicts.length === 0) {
            return false;
        }
        return conflicts;
    }

        getGridArea(m: Meeting) {
    //     let rowStart: number, rowEnd: number, colStart: number, colEnd: number;
    //     let d = m.days[0];
    //     switch (d.toLowerCase()) {
    //         case "m":
    //             colStart = 3;
    //             colEnd = 4;
    //             break;
    //         case "t":
    //             colStart = 4;
    //             colEnd = 5;
    //             break;
    //         case "w":
    //             colStart = 5;
    //             colEnd = 6;
    //             break;
    //         case "r":
    //             colStart = 6;
    //             colEnd = 7;
    //             break;
    //         case "f":
    //             colStart = 7;
    //             colEnd = 8;
    //             break;
    //         case "s":
    //             colStart = 8;
    //             colEnd = 9;
    //             break;
    //         default:
    //             return null;
    //     }
    //
    //     rowStart = Number(m.startPeriod) + 1;
    //     rowEnd = Number(m.endPeriod) + 2;
    //
    //     return this._sanitizer.bypassSecurityTrustStyle(`${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`);
        return this.searchPreview.getGridArea(m);
    }

    addCourse(c: Class) {
        return new Promise((resolve, reject) => {
            let conflicts = this.getConflictingClasses(c);
            if (this.alreadyInCourseList(c)) {
                console.error("Class number already exists in list (" + c.classNumber + ")");
                reject("Class number already exists in list.");
            } else if (conflicts.length !== 0) {
                console.error("Class is conflicting with others in list. ", conflicts);
                reject("Class conflicts with others in the list.");
            } else {
                if (this.searchPreview.previewClass && this.searchPreview.previewClass.classNumber === c.classNumber) {
                    this.searchPreview.unsetPreviewClass();
                }

                let color: ColorUsage = this.getAvailableColor();
                c.options.colors.foreground = color.foreground;
                c.options.colors.background = color.background;

                color.usage++; // works surprisingly
                console.log(`Adding class ${c.courseCode}: `, c);


                this.courses.push(c);
                this.buildMeetings(true);
                resolve(this.courses);
            }
        });
    }

    removeCourse(classNumber: number) {
        return new Promise((resolve, reject) => {
            if (!this.alreadyInCourseList(classNumber)) {
                reject("Class number is not in course list.");
            } else {
                for (let i = 0; i < this.courses.length; i++) {
                    let c = this.courses[i];
                    if (c.classNumber === classNumber) {
                        // reset colors
                        let colors = c.options.colors;
                        this.lowerUsageOfColor(colors.background, colors.foreground);
                        colors.background = "white";
                        colors.foreground = "black";

                        // remove
                        this.courses.splice(i, 1);
                        this.buildMeetings(false); // remove from meeting list (controls schedule table)
                        resolve(this.courses);
                    }
                }
                reject("Could not find class number even though it was previously established it exists.");
            }
        });
    }

    getCourse(classNum: number) {
        for (let i = 0; i < this.courses.length; i++) {
            let c = this.courses[i];
            if (c.classNumber === classNum) {
                return c;
            }
        }
        return null;
    }

    getAvailableColor() {
        let lowestUsage = Number.MAX_SAFE_INTEGER;
        let color: ColorUsage;
        for (let i = 0; i < this.colors.length; i++) {
            let c = this.colors[i];
            let u = c.usage;
            if (u < lowestUsage) {
                lowestUsage = u;
                color = c;
            }
        }
        return color;
    }

    lowerUsageOfColor(background: string, foreground: string) {
        for (let i = 0; i < this.colors.length; i++) {
            let c = this.colors[i];
            if (c.foreground === foreground && c.background === background) {
                c.usage--;
            }
        }
    }

    buildMeetings(add = false) {

        if (!add) {
            let _debug_removed = 0;
            for (let i = 0; i < this.meetingsNoTemp.length; i++) {
                let m = this.meetingsNoTemp[i];
                if (!this.alreadyInCourseList(m.course.classNumber)) {
                    this.meetingsNoTemp.splice(i, 1);
                    _debug_removed++;
                    i = -1;
                }
            }
        } else {
            let result;

            let i = this.courses.length - 1;
            let c = this.courses[i];

            for (let j = 0; j < c.meetings.length; j++) {
                let m = c.meetings[j];
                for (let k = 0; k < m.days.length; k++) {
                    let d = m.days[k];
                    let m2 = new Meeting(d, m.startPeriod, m.endPeriod);
                    let obj = {
                        course: c,
                        meeting: m2,
                        gridArea: this.getGridArea(m2)
                    };
                    result = (obj);
                    this.meetingsNoTemp.push(result);
                }
            }
        }

        this.updateMeetings();
        // this.meetingsNoTemp = result;
    }

    updateMeetings() {
        this.meetings = [];
        this.meetings = this.meetings.concat(this.meetingsNoTemp);
        if (this.searchPreview.previewClass) {
            this.meetings = this.meetings.concat(this.searchPreview.meetings);
        }
        this.eCells = false;

        for (let i = 0; i < this.meetings.length; i++) {
            let m = this.meetings[i];
            if (m.meeting.meetBegin > 11 || m.meeting.meetEnd > 11) {
                this.eCells = true;
                break;
            }
        }

    }

    alreadyInCourseList(c: Class | number) {
        if (c instanceof Class) {
            // Is Class Object
            return this.alreadyInCourseList(c.classNumber);
        } else {
            // Is (hopefully) a number
            for (let i = 0; i < this.courses.length; i++) {
                let searching = this.courses[i];
                if (searching.classNumber === c) {
                    return true;
                }
            }

            return false;
        }
    }

    getConflictingClasses(c: Class) {
        let conflicts: ClassConflict[] = [];
        for (let i = 0; i < this.courses.length; i++) {
            let c2 = this.courses[i];
            let con = CourseManagerService.getConflictingMeetings(c, c2);
            if (!con || con.length === 0) {
                continue;
            }
            conflicts.push({
                class1: c,
                class2: c2,
                meetingConflicts: con
            });
        }
        return conflicts;
    }

}

interface ClassConflict {
    class1: Class;
    class2: Class;
    meetingConflicts: MeetingConflict[];
}

interface MeetingConflict {
    class1: Class;
    class2: Class;
    meeting1: Meeting;
    meeting2: Meeting;
    day: String;
}

export interface SchedulerInfo {
    course: Class;
    meeting: Meeting;
    gridArea: string | SafeStyle;
}

interface ColorUsage {
    name: string;
    background: string;
    foreground: string;
    usage: number;
}