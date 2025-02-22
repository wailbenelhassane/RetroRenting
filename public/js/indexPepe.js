import { includeHTML, fetchJSON, setImage} from "./main.js";

document.addEventListener("DOMContentLoaded", async () => {
    includeHTML();

    console.log("All done")

    const data = await fetchJSON("../public/data-json/indexContent.json");
    if (data && data.logoImage) {
        setImage(".logo-image", data.logoImage);
    }
});