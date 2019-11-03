import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

/** Add BrowserAnimationsModule for Material Animations */
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

/** MaterialComponentsModule -> Imports all material components in use */
import {MaterialComponentsModule} from "./materialcomponents.module";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {AboutComponent} from "./about/about.component";
import {SearchInterceptorService} from "./search-interceptor.service";
import { CourseListComponent } from './course-list/course-list.component';
import { MainContentComponent } from './main-content/main-content.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';
import {ClassCardComponent, ClassCardInstructorComponent} from "./class-card/class-card.component";
import { CourseAddComponent } from './course-add/course-add.component';

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        AboutComponent,
        CourseListComponent,
        MainContentComponent,
        ScheduleTableComponent,
        ClassCardComponent,
        ClassCardInstructorComponent,
        CourseAddComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialComponentsModule,
        HttpClientModule,
        LayoutModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SearchInterceptorService,
            multi: true
        }
    ],
    entryComponents: [
        AboutComponent
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule {
}
