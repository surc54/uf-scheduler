/**
 * This module handles everything with adding a new course, such as
 *   - Show new course modal
 *   - Start and show search results from user
 *   - Update course list on the sidebar
 *   - Update schedule table
 */

import { Modal, FooterButton, FooterType, ContentType } from "./ModalModule";
import SampleDataRetriever from "../../modules/SampleDataRetriever";


let NewCourseModule = {

    init: () => {
        SampleDataRetriever.search({
            semesterCode: 32
        });
        console.log('eet');
    },

    /**
     * Shows search modal
     * @param {function(modal:Modal)} callback
     */
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
    }
    
};

export default NewCourseModule;