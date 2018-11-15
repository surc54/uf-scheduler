/**
 * This module handles everything with adding a new course, such as
 *   - Show new course modal
 *   - Start and show search results from user
 *   - Update course list on the sidebar
 *   - Update schedule table
 */

import { Modal, FooterButton, FooterType, ContentType } from "./ModalModule";
import { Class } from "../../modules/Class";

export default class NewCourseModule {
    init() {
    }

    showSearchModal(callback = null) {
        let searchModal = new Modal("Search", {
            backdropClickCloses: true,
            closeButton: true,
            showHeader: true
        });

        searchModal.setContent({
            type: ContentType.SELECTOR,
            data: "#s_modal_search",
            removeClasses: "s_modal_hide",
            deleteAfterGrab: false
        });

        searchModal.setFooter({
            type: FooterType.NONE
        });

        searchModal.show();
        if (callback) callback(searchModal);

        this.modal = searchModal;
        this.modalElem = this.modal.getElement();
    }

    /**
     * @param {Class[]} classList
     */
    showResults(classList) {
        let sr = this.modalElem.find("section#search_results");
        let h2 = $(document.createElement("h2"));
        h2.html("Results");
        sr.html(h2);
        classList.forEach(c => {
            sr.append(createCard(c));
        });
    }

    showErrorInSearchForm(msg) {
        if (!this.modalElem) {
            console.error("Attempted to create errors without modal.");
            return;
        }
        const html = `
            <span class="material-icons">
                warning
            </span>
            <p>${msg}</p>
        `;
        let elem = $(document.createElement("div"));
        elem.addClass("s_search_error s_result_err");
        elem.html(html);
        this.modalElem.find(".s_search_btn_wrapper").after(elem);
        return elem;
    }

    clearErrorsInSearchForm() {
        if (!this.modalElem) {
            console.error("Attempted to clear errors without modal.");
            return;
        }
        this.modalElem.find(".s_search_error.s_result_err").remove();
    }
    /**
     * @returns {String[]|Boolean}
     */
    validateInputs() {
        if (!this.modalElem) {
            console.error("Attempted to validate inputs without modal.");
            return false;
        }
        let errors = [];

        let semesterCodeInput = this.modalElem.find("#s_search_semester_code");
        let classNumInput = this.modalElem.find("#s_search_class_num");
        let courseCodeInput = this.modalElem.find("#s_search_course_code");

        let sc = semesterCodeInput.val().toString();
        let cNum = classNumInput.val().toString();
        let cCode = courseCodeInput.val().toString();

        let alphaNumRegex = new RegExp(/^[a-z0-9]+$/i);

        if (!cNum && !cCode) {
            errors.push("Either Course Code or Class Number is required.");
        }

        // alphaNum Tests
        if (sc && !alphaNumRegex.test(sc)) {
            errors.push("Semester Code is not alphanumeric");
        }
        if (cNum && !alphaNumRegex.test(cNum)) {
            errors.push("Class Number is not alphanumeric");
        }
        if (cCode && !alphaNumRegex.test(cCode)) {
            errors.push("Course Code is not alphanumeric");
        }



        if (sc.length <= 0) {
            errors.push("Semester Code is not valid");
        }

        if (cNum.length !== 5 && cNum.toString().length !== 0) {
            errors.push("Class Number is not valid");
        }

        if (cCode.length > 7) {
            errors.push("Course code is not valid");
        }

        if (errors.length === 0) {
            return true;
        } else return errors;
    }

}


/**
 * Create class card
 * @param {Class} c 
 * @returns HTML
 */
function createCard(c) {
    let conflicts = checkForConflicts(c);
    let added = checkIfAdded(c);

    let elem = $(document.createElement("div"));
    elem.addClass("class-card");

    let classHeading = $(document.createElement("div"));
    classHeading.addClass("class-heading");
    {
        let title = $(document.createElement("h1"));
        title.html(c.name);

        let subtitle = $(document.createElement("h2"));
        subtitle.html(c.courseCode + " - " + c.classNumber);

        let button = $(document.createElement("button"));
        button.attr("s_action", !added && !conflicts ? "add_class" : "");
        button.attr("s_data", c.classNumber);
        button.addClass("material-icons" + (added ? " class-added" : conflicts ? " class-conflicted" : ""));
        button.html((added ? "check" : conflicts ? "warning" : "add"))

        classHeading.append(title);
        classHeading.append(subtitle);
        classHeading.append(button);
    }

    let classDetails = $(document.createElement("div"));
    classDetails.addClass("class-details");
    {
        let teachers = $(document.createElement("div"));
        teachers.addClass("teachers");
        {
            let h3 = $(document.createElement("h3"));
            h3.html("Taught by");

            let ul = $(document.createElement("ul"));
            c.instructors.forEach(v => {
                let li = $(document.createElement("li"));
                li.html(v);
                ul.append(li);
            });

            teachers.append(h3);
            teachers.append(ul);
        }

        let meetings = $(document.createElement("div"));
        meetings.addClass("meetings");
        {
            let h3 = $(document.createElement("h3"));
            h3.html("Meetings");

            meetings.append(h3);

            c.meetings.forEach(m => {
                let meeting = $(document.createElement("div"));
                meeting.addClass("meeting");
                // TODO: Need to add conflicted detection!
                m.days.forEach(d => {
                    let span = $(document.createElement("span"));
                    span.addClass("meeting-day");
                    span.html(d);
                    meeting.append(span);
                });
                let span = $(document.createElement("span"));
                span.addClass("meeting-time");
                span.html(periodsToTime(m.startPeriod, m.endPeriod));
                meeting.append(span);

                meetings.append(meeting);
            });
        }

        classDetails.append(teachers);
        classDetails.append(meetings);
    }
    elem.append(classHeading);
    elem.append(classDetails);
    return elem;
}

function checkForConflicts(c) {
    // placeholder function..

    return false;
}

function checkIfAdded(c) {
    // placeholder function..

    return false;
}

/**
 * Converts periods to time (for class cards)
 * @param {number} begin
 * @param {number} end
 * @returns {String} time
 */
function periodsToTime(begin, end) {
    return periodTimes(begin)[0] + " - " + periodTimes(end)[1];
}

/**
 * Returns start and end of period
 * @param {number} period
 * @returns {string[]}
 */
function periodTimes(period) {
    period = Number(period);
    switch(period) {
        case 1: return ["7:25 AM", "8:15 AM"];
        case 2: return ["8:30 AM", "9:20 AM"];
        case 3: return ["9:35 AM", "10:25 AM"];
        case 4: return ["10:40 AM", "11:30 AM"];
        case 5: return ["11:45 AM", "12:35 AM"];
        case 6: return ["12:50 PM", "1:40 PM"];
        case 7: return ["1:55 PM", "2:45 PM"];
        case 8: return ["3:00 PM", "3:50 PM"];
        case 9: return ["4:05 PM", "4:55 PM"];
        case 10: return ["5:10 PM", "6:00 PM"];
        case 11: return ["6:15 PM", "7:05 PM"];
        default: return ["Error", "Error"];
    }
}