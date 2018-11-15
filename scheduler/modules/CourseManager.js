import {Class} from "../../modules/Class";


export default class CourseManager {

    constructor() {
        /** @type {Class[]} */
        this.classes = [];
    }

    /**
     * Adds class to CourseManager
     * @param {Class} c Class
     */
    addClass(c) {
        if (this.checkIfDuplicate(c)) {
            return false;
        }
        this.classes.push(c);
    }

    /**
     *
     * @param c
     */
    checkIfDuplicate(c) {
        if (c instanceof Class) {
            this.classes.forEach(v => {
                if (Number(v.classNumber) === Number(c.classNumber)) {
                    return true;
                }
            })
        } else {
            this.classes.forEach(v => {
                if (Number(v.classNumber) === Number(c)) {
                    return true;
                }
            })
        }
        return false;
    }
}