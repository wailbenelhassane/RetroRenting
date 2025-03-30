import { includeHTML, fetchJSON, setMultipleImages } from "./main.js";
import { cleanAllInputs, showErrors, validateAllFieldsForm } from "./utils/validationForm.js";
import { processLogin } from "./services/authService.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadImages();
    validateForm();
});

async function loadImages(){
    const loginData = await fetchJSON("../public/data-json/loginContent.json");
    if (loginData) {
        setMultipleImages(loginData);
    } else {
        console.error("No login data found.")
    }
}

function validateForm(){
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        cleanAllInputs("login-form");

        const errors = validateAllFieldsForm();

        showErrors(errors, "login-form");

        if (errors.length > 0) {
            return;
        }

        let password = document.getElementById("password");
        let username = document.getElementById("username");

        processLogin({username : username.value, password : password.value}, password);
    });
}