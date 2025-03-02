import {fetchJSON, setMultipleImages} from "./main.js";

export async function loadHeaderContent() {
    const headerData = await fetchJSON("../public/data-json/headerContent.json");

    if (headerData) {
        setMultipleImages(headerData)
    } else {
        console.error("No header data found.");
    }
}
