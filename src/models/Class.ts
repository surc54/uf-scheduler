export class Class {
    options: ClassOptions;

    /**
     * Create class object
     */
    constructor(options: ClassOptions) {
        this.options = options;
    }

    get courseCode() {
        return this.options.courseCode;
    }

    get name() {
        return this.options.name;
    }

    get classNumber() {
        return this.options.classNumber;
    }

    get instructors() {
        return this.options.instructors;
    }

    get meetings() {
        return this.options.meetings;
    }
}

export class Meeting {
    meetDays: string[];
    meetBegin: number;
    meetEnd: number;

    constructor(meetDays, meetBegin, meetEnd) {
        if (Array.isArray(meetDays)) {
            this.meetDays = meetDays;
        } else {
            this.meetDays = meetDays.split(" ");
        }
        this.meetBegin = meetBegin;
        this.meetEnd = meetEnd;
    }


    get days() {
        return this.meetDays;
    }

    get startPeriod() {
        return this.meetBegin;
    }

    get endPeriod() {
        return this.meetEnd;
    }
}


interface ClassOptions {
    name: string;
    classNumber: number;
    courseCode: string;
    instructors: string[];
    meetings: Meeting[];
}
