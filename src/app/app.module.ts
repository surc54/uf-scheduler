import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

/** Add BrowserAnimationsModule for Material Animations */
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

/** MaterialComponentsModule -> Imports all material components in use */
import {MaterialComponentsModule} from "./materialcomponents.module";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {AboutComponent} from "./about/about.component";

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialComponentsModule
    ],
    providers: [],
    entryComponents: [
        AboutComponent
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule {
}
