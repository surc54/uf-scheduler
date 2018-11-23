import {Component, OnInit} from "@angular/core";
import {CourseManagerService} from "../coursemanager.service";
import {animate, query, state, style, transition, trigger} from "@angular/animations";
import {Class} from "../../models/Class";

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
                transform: "scale(1)",
                opacity: 1
            })),
            transition(":enter", animate("0.25s 0s ease-in-out")),
            transition(":leave", animate("0.25s 0s ease-in-out"))
        ])
    ]
})
export class ScheduleTableComponent implements OnInit {


    constructor(protected courseManager: CourseManagerService) {
    }

    ngOnInit() {
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

}
