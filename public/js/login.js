import {includeHTML, fetchJSON, setMultipleImages} from "./main.js";
import {validateUsername, validatePassword, showErrors} from "./utils/validationForm.js";
import {processLogin} from "./services/authService.js";

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

        let password = document.getElementById("password");
        let username = document.getElementById("username");

        let errors = [];

        if (!validateUsername(username.value)) {
            errors.push([username, "Wrong username format, correct format: minimum 5 characters"])
        }

        if (!validatePassword(password.value)){
            errors.push([password, "Wrong password format, correct format: minimum 8 characters!"]);
        }

        showErrors(errors, "login-form");

        if (errors.length > 0) {
            return;
        }

        processLogin({username : username.value, password : password.value}, password);
    });
}