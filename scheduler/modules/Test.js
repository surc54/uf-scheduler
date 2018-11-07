/**
 * Run tests in here.
 * Just to make main javascript files not messy.
 */
//
import { Modal, FooterType, ContentType, FooterButton} from "./ModalModule";
import { Class, Meeting } from "../../modules/Class";
import SampleDataRetriever from "../../modules/SampleDataRetriever";
import UFDataRetriever from "../../modules/UFDataRetriever";

function modalTesting() {
    let m = new Modal("Modal Test", {backdropClickCloses: false});

    // m.setCloseButton(true); // works
    // m.setBackdropCloses(true); // works


    m.setContent({
        type: ContentType.CUSTOM,
        data: "Sample content."
    });

    m.setFooter({
        type: FooterType.BUTTONS,
        data: [
            new FooterButton({
                template: "primary",
                content: "Add to list"
            }),
            new FooterButton({
                template: "primary",
                content: "Cancel",
                onclick: (e, modal) => {
                    e.preventDefault();
                    modal.close();
                }
            }),
        ]
    });

    m.showHeader(true);


    m.show();

    setTimeout(() => {
        // m.setContent({
        //     type: "html",
        //     data: `<strong>Testing123</strong>`
        // });
        m.setContent({
            type: ContentType.SELECTOR,
            data: `section.header > h1`
        });

        m.setFooter({
            type: FooterType.SELECTOR,
            data: "nutnutnut"
        });

        m.setTitle("New Title");

        

       //m.updateModal();
    }, 2000);
}

function dataTesting() {

    // console.log("---TESTING UF---");
    // let searchPromise = UFDataRetriever.search({
    //     semesterCode: 2191,
    //     courseCode: "COP3503"
    // });

    let searchPromise = UFDataRetriever.sampleData();

    searchPromise.then(data => {
        let classes = UFDataRetriever.parseData(data);
        console.log(classes);
    }).catch(err => {
        console.error("An error occurred while searching for classes.");
        console.log(err);
    });
}

export default function init() {
    console.log("Initializing Test File");
    // modalTesting();
    // dataTesting();
}