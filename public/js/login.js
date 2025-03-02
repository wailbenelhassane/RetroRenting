import {includeHTML, fetchJSON, setImage, setMultipleImages} from "./main.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();

    const loginData = await fetchJSON("../public/data-json/loginContent.json");
    if (loginData) {
        setMultipleImages(loginData);
    } else {
        console.error("No login data found.")
    }
});