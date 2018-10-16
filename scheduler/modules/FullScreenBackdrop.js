import $ from "jquery";




let FullScreenBackdrop = {
    init: () => {

    },

    createBackdrop: (z = 10, appendTo = "body") => {
        let elem = $(document.createElement("div"));

        elem.addClass("fs-backdrop");
        elem.css("z-index", z);

        $(appendTo).append(elem);

        

        return elem[0];
    },

    removeBackdrop: () => {
        let bd = $("div.fs-backdrop");
        bd.off();
        bd.fadeOut(200);
        setTimeout(() => {
            bd.remove();
        }, 200);
    },

    listeners: {
        click: (e) => {},
        hover: (e) => {}
    }
};

module.exports = FullScreenBackdrop;

