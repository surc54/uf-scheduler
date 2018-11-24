import {Component} from "@angular/core";
import {animate, animateChild, query, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    animations: [
        trigger("sidebarParent", [
            transition(":enter, :leave", [
                query("@*", animateChild(), {optional: true})
            ])
        ]),
        trigger("sidebarTitleButtonRotation", [
            state("normal", style({
                transform: "rotate(0deg)"
            })),
            state("rotated", style({
                transform: "rotate(45deg)"
            })),
            transition("normal <=> rotated", animate("0.25s 0s ease-in-out"))
        ])
    ]
})
export class AppComponent {
    title = "schedule-template";
    addMode = false;


}
