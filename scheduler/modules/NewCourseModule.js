/**
 * This module handles everything with adding a new course, such as
 *   - Show new course modal
 *   - Start and show search results from user
 *   - Update course list on the sidebar
 *   - Update schedule table
 */

import { Modal, FooterButton, FooterType, ContentType } from "./ModalModule";


let NewCourseModule = {

    init: () => {
        NewCourseModule.showSearchModal();
    },

    showSearchModal() {
        let searchModal = new Modal("Search", {
            backdropClickCloses: true,
            closeButton: true,
            showHeader: true
        });

        searchModal.setContent({
            type: ContentType.SELECTOR,
            data: "#s_modal_search",
            removeClasses: "s_modal_hide"
        });

        searchModal.setFooter({
            type: FooterType.BUTTONS,
            data: [
                new FooterButton({
                    content: "Search",
                    template: "default",
                    onclick: (event) => {
                        event.preventDefault();
                        window.alert("This feature is not implemented.");
                    }
                }),
                new FooterButton({
                    content: "Cancel",
                    template: "default",
                    onclick: (event, modal) => {
                        event.preventDefault();
                        modal.close();
                    }
                })
            ]
        });

        searchModal.show();
    }
    
};

export default NewCourseModule;