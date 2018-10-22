import {Class, Meeting} from "./Class";

export default class SampleDataRetriever {

    /**
     * Search for classes
     * @param {Object} options
     * @param {number} options.semesterCode
     * @param {string} [options.classCode]
     * @param {string} [options.courseCode]
     * @returns {Class|null}
     */
    static search(options) {
        if (!options.classCode && !options.courseCode) {
            return null;
        }
        return new Class({
            courseCode: "COP3503",
            name: "Programming Fundamentals 2",
            classNumber: 11190,
            instructors: [
                "Joshua Fox",
                "Joshua Fox"
            ],
            meetings: [
                new Meeting("M W F", 10, 10),
                new Meeting("F", 6, 7)
            ]
        });
    }
}
