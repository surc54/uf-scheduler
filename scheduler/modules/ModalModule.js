/**
 * This module will create a simple modal.
 */
import {FullScreenBackdropModule} from "./FullScreenBackdropModule";
import $ from "jquery";

let sampleThis = {
    title: "Title",
    settings: {
        closeButton: true,
        backdropClickCloses: true,
        showTitleInHeader: true,
        zIndex: 15
    },
    content: "html",
    footer: "html"
};
/**
 * @readonly
 * @enum {string}
 */
export let ContentType = {
    CUSTOM: "custom",
    SELECTOR: "selector",
    NONE: "none"
};
/**
 * @readonly
 * @enum {string}
 */
export let FooterType = {
    CUSTOM: "custom",
    SELECTOR: "selector",
    BUTTONS: "buttons",
    NONE: "none"
};

export class FooterButton {
    /**
     * Create Footer Button
     * @param {Object} options
     * @param {string|string[]} [options.classes]
     * @param {string} [options.id]
     * @param {string} [options.template]
     * @param {function(e:Event, modal:Modal, id, classes, template, content)} [options.onclick]
     * @param {string} options.content
     */
    constructor(options) {
        this.classes = options.classes;
        this.id = options.id;
        this.template = options.template;
        this.content = options.content;
        this.onclick = options.onclick;
    }

    /**
     * Get classes for button
     * @returns {string|null}
     */
    getClasses() {
        if (Array.isArray(this.classes)) {
            return this.classes.join(" ");
        } else {
            return this.classes;
        }
    }

    /**
     * Get Id for button
     * @returns {string|null}
     */
    getId() {
        return this.id;
    }

    /**
     * Gets template for button
     * @returns {string}
     */
    getTemplate() {
        return this.template;
    }

    /**
     * Get content for button
     * @returns {string}
     */
    getContent() {
        return this.content;
    }

    getOnClickFunction() {
        return this.onclick;
    }
}

export class Modal {

    static headerTemplates(data) {
        return {
            title: `<h1>${ data.title || "" }</h1>`,
            closeButton: `<button class="material-icons">close</button>`
        };
    }

    /**
     *
     * @param {string} title
     * @param {number} zIndex
     * @param {Object} [options]
     * @param {boolean} [options.closeButton=true]
     * @param {boolean} [options.backdropClickCloses=true]
     * @param {boolean} [options.showHeader=true]
     * @param {number} [options.zIndex=15]
     */
    constructor(title, options = {closeButton: true, backdropClickCloses: true, showHeader: true, zIndex: 15}) {
        this.settings = {
            closeButton: options.closeButton === undefined ? true : options.closeButton,
            backdropClickCloses: options.backdropClickCloses === undefined ? true : options.backdropClickCloses,
            zIndex: options.zIndex === undefined ? 15 : options.zIndex,
            showHeader: options.showHeader === undefined ? true : options.showHeader
        };
        this.content = `No Content`;
        this.footer = "";
        this.title = title;
    }


    show() {
        //     <footer>
        //         <button class="s_btn">
        //             Add to List
        //         </button>
        //     </footer>
        // `;

        let divModal = document.createElement("div");
        divModal = $(divModal);
        divModal.addClass("modal");
        this.elem = divModal;

        this.updateModal();



        if (this.settings.backdropClickCloses) {
            FullScreenBackdropModule.listeners.click = (e, elem) => {
                if (e.target === elem[0]) {
                    e.preventDefault();
                    this.close();
                }
            };
        }
        this.backdrop = FullScreenBackdropModule.createBackdrop(this.settings.zIndex);
        this.backdrop = $(this.backdrop);

        this.backdrop.append(this.elem);
    }

    close() {
        this.elem.css({
            transition: "opacity 0.2s",
            opacity: 0
        });
        FullScreenBackdropModule.removeBackdrop();
    }


    /**
     * @example
     * {
     *      type: "html",
     *      data: "<h1>hello</h1>"
     * }
     * @example
     * {
     *      type: "selector",
     *      data: "#something",
     *      deleteAfterGrab: false
     * }
     * @param {Object} options Options for setting content
     * @param {ContentType} options.type Type of data that will be given in options
     * @param {string} [options.data] Data to be used
     * @param {boolean} [options.deleteAfterGrab] Whether or not to delete dom element after retrieving data using selector.
     * @param {string|string[]} [options.removeClasses] Classes that should be removed from element selected with "SELECTOR"
     */
    setContent(options = {type: ContentType.NONE}) {
        switch (options.type) {
            case ContentType.CUSTOM:
                this.content = options.data;
                break;
            case ContentType.SELECTOR:
                let e = $(options.data);
                let data;
                if (e.length === 0) {
                    console.error("Unknown selector given to setContent()");
                    data = "Unknown selector given.";
                } else {
                    if (options.removeClasses) {
                        let temp = $(e[0]).clone(true, true);
                        let classes;
                        if (Array.isArray(options.removeClasses)) {
                            classes = options.removeClasses.join(" ");
                        } else {
                            classes = options.removeClasses;
                        }
                        temp.removeClass(classes);
                        data = temp[0].outerHTML;
                    } else {
                        data = e[0].outerHTML;
                    }
                    if (options.deleteAfterGrab) {
                        e.remove();
                    }
                }
                this.content = data;
                break;
            case ContentType.NONE:
                this.content = null;
                break;
            default:
                console.error(`Unknown type "${ options.type.toString() }" received in setContent() [Modal]`);
                break;
        }
    }


    /**
     * Sets Footer
     * @param {Object} options
     * @param {FooterType} options.type
     * @param {string|Object|FooterButton[]|FooterButton} [options.data]
     * @param {boolean} [options.deleteAfterGrab] Whether or not to delete dom element after retrieving data using selector.
     * @param {string|string[]} [options.removeClasses] Classes that should be removed from element selected with "SELECTOR"
     */
    setFooter(options = {type: FooterType.NONE}) {
        switch (options.type) {
            case FooterType.CUSTOM:
                this.footer = options.data;
                break;
            case FooterType.BUTTONS:
                let finalData = [];
                /** @type {FooterButton[]} */
                let btns;
                if (!Array.isArray(options.data)) {
                    btns = [
                        options.data
                    ];
                } else {
                    btns = options.data;
                }
                for (let i = 0; i < btns.length; i++) {
                    let data = btns[i]; // FooterButton
                    let btn = $(document.createElement("button"));
                    // btn.addClass("s_btn");
                    if (data.getClasses()) {
                        btn.addClass(data.getClasses());
                    }
                    if (data.getId()) {
                        btn.attr("id", data.getId());
                    }
                    if (data.getTemplate() != null && data.getTemplate() !== undefined) {
                        btn.addClass("s_btn");
                        btn.addClass("s_btn_template_" + data.getTemplate());
                    }
                    btn.html(data.getContent());
                    if (data.getOnClickFunction()) {
                        btn.on("click", (e) => {
                            data.getOnClickFunction()(e, this, data.getId(), data.getClasses(), data.getTemplate(), data.getContent());
                        });
                    }
                    finalData.push(btn);
                }
                this.footer = finalData;
                break;
            case FooterType.SELECTOR:
                let e = $(options.data);
                let data;
                if (e.length === 0) {
                    console.error("Unknown selector given to setFooter()");
                    data = "Unknown selector given.";
                } else {
                    if (options.removeClasses) {
                        let temp = $(e[0]).clone(true, true);
                        let classes;
                        if (Array.isArray(options.removeClasses)) {
                            classes = options.removeClasses.join(" ");
                        } else {
                            classes = options.removeClasses;
                        }
                        temp.removeClass(classes);
                        data = temp[0].outerHTML;
                    } else {
                        data = e[0].outerHTML;
                    }
                    if (options.deleteAfterGrab) {
                        e.remove();
                    }
                }
                this.footer = data;
                break;
            case FooterType.NONE:
                this.footer = "";
                break;
            default:
                console.error(`Unknown type "${ options.type.toString() }" received in setFooter() [Modal]`);
                break;
        }
    }

    /**
     * Update modal content
     */
    updateModal() {
        if (!this.elem) return;
        let header = this.elem.find("header");
        let main = this.elem.find("main");
        let footer = this.elem.find("footer");

        if (header.length === 0) header = null;
        if (main.length === 0) main = null;
        if (footer.length === 0) footer = null;


        let headerTemplate = Modal.headerTemplates({
            title: this.title
        });

        if (this.settings.showHeader) {
            if (!header) {
                header = $(document.createElement("header"));
                if (main) {
                    main.before(header); // insert header after main
                } else if (footer) {
                    footer.before(header); // insert header before footer (main doesn't exist)
                } else {
                    this.elem.append(header); // no known elements in modal, just insert at end.
                }
            }
            header.html(`
                ${ headerTemplate.title }
                ${ this.settings.closeButton ? headerTemplate.closeButton : "" }
            `);
            header.find("button").on("click", (e) => {
                this.close();
            });
        } else {
            if (header) header.remove();
        }

        if (this.content) {
            if (!main) {
                main = $(document.createElement("main"));
                if (header) {
                    header.after(main); // insert main after header
                } else if (footer) {
                    footer.before(main); // insert main before footer
                } else {
                    this.elem.append(main); // no known elements in modal, just insert at end.
                }
            }
            main.html(this.content);
        } else {
            if (main) main.remove();
        }

        if (this.footer) {
            if (!footer) {
                footer = $(document.createElement("footer"));
                if (main) {
                    main.after(footer); // insert footer after main
                } else if (header) {
                    header.after(footer); // insert footer after header
                } else {
                    this.elem.append(footer); // no known elements in modal, just insert at end.
                }
            }
            if (Array.isArray(this.footer)) {
                // If this is an array, then the footer must be in type BUTTONS
                footer.html("");
                for (let i = 0; i < this.footer.length; i++) {
                    let btn = this.footer[i];

                    footer.append(btn);
                }
            } else {
                footer.html(this.footer);
            }
        } else {
            if (footer) footer.remove();
        }
    }

    /**
     * Sets visibility of close button
     * @param {boolean} bool
     */
    setCloseButton(bool) {
        this.settings.closeButton = bool;
    }

    /**
     * Decide if clicking backdrop closes modal
     * @param {boolean} bool
     */
    setBackdropCloses(bool) {
        this.settings.backdropClickCloses = bool;
    }

    /**
     * Sets visibility of header
     * @param {boolean} bool
     */
    showHeader(bool) {
        this.settings.showHeader = bool;
    }

    /**
     * Sets title of modal
     * @param {string} newTitle
     */
    setTitle(newTitle) {
        console.debug("Modal Title Change: " + this.title + " -> " + newTitle);
        this.title = newTitle;
    }

    getBackdrop() {
        return this.backdrop;
    }

    getElement() {
        return this.elem;
    }
}

