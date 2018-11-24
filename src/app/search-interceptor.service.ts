import {Injectable} from "@angular/core";
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from "@angular/common/http";

import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Class, Meeting} from "../models/Class";

@Injectable({
    providedIn: "root"
})
export class SearchInterceptorService implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(map(event => {
            if (event instanceof HttpResponse && event.headers.get("X-Request-Name") === "Class-Lookup") {

                const data = event.body;
                const classList: Class[] = [];

                if (data == null) {
                    throw Error("Null data received");
                }

                let courses = data[0]["COURSES"];
                for (let courseKey in courses) {
                    if (courses.hasOwnProperty(courseKey)) {
                        let course = courses[courseKey];
                        let sections = course.sections;
                        for (let sectionKey in sections) {
                            if (sections.hasOwnProperty(sectionKey)) {
                                let section = sections[sectionKey];

                                let teachers = [];
                                for (let instructorKey in section.instructors) {
                                    if (teachers.indexOf(section.instructors[instructorKey]["name"]) !== -1) {
                                        continue;
                                    }
                                    teachers.push(section.instructors[instructorKey]["name"]);
                                }

                                let meetingList = [];
                                for (let meetingKey in section.meetTimes) {
                                    if (section.meetTimes.hasOwnProperty(meetingKey)) {
                                        let meeting = section.meetTimes[meetingKey];

                                        let begin: string = meeting.meetPeriodBegin;
                                        let end: string = meeting.meetPeriodEnd;

                                        if (begin.charAt(0).toLowerCase() === 'e') {
                                            meeting.meetPeriodBegin = 11 + Number(begin.slice(1, begin.length));
                                        }
                                        if (end.charAt(0).toLowerCase() === 'e') {
                                            meeting.meetPeriodEnd = 11 + Number(end.slice(1, end.length));
                                        }

                                        meetingList.push(new Meeting(meeting.meetDays, meeting.meetPeriodBegin, meeting.meetPeriodEnd));
                                    }
                                }

                                let c = new Class({
                                    name: course.name,
                                    courseCode: course.code,
                                    classNumber: section.classNumber,
                                    instructors: teachers,
                                    meetings: meetingList
                                }, section);
                                classList.push(c);
                            }
                        }
                    }
                }

                event = event.clone({body: classList});
            }
            return event;
        }));
    }
}
