import $ from "jquery";

export default class LoadingModule {
    constructor(elemSelector) {
        this.elemSelector = elemSelector;
        let e = $(elemSelector);
        if (e.length === 0) {
            console.error(`Invalid selector ${elemSelector} given to create LoadingModule`);
        }
    }

    /**
     * Show Loading Module
     * @param {Boolean} append
     */
    show(append = true) {
        if (!this.elem) {
            this.elem = createElement(this.elemSelector);
            if (!this.elem) {
                console.error("Something went wrong creating Loading Module.");
                return;
            }
        }
        if (append) $(this.elemSelector).append(this.elem);
        else $(this.elemSelector).html(this.elem);
    }
}

/**
 * Create element in LoadingModule.
 * Right now, it's just text, but in the future, it can be upgraded to some graphic.
 * @param {String} selector
 * @param {Object} [options]
 * @param {Object} [options.styles]
 * @param {String} [options.classes]
 * @param {id} [options.id]
 */
function createElement(selector, options = {}) {
    let elem = $(document.createElement("div"));
    elem.addClass("s_loading_module");
    if (options.styles) {
        elem.css(options.styles);
    }
    if (options.classes) {
        elem.addClass(options.classes);
    }
    if (options.id) {
        elem.attr("id", options.id);
    }

    let h2 = $(document.createElement("h2"));
    h2.html("Loading...");

    elem.html(h2);

    elem.css({
        textAlign: "center",
        marginTop: "20px",
    });


    return elem;
}