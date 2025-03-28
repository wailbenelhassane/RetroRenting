import {includeHTML, fetchJSON, setMultipleImages} from "./main.js";
import {validateName, validateUsername, validateEmail, validatePassword, validatePasswordConfirm, showErrors} from "./utils/validationForm.js";
import {processRegistration} from "./services/authService.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();
    await loadImages();
    validateForm();
});

async function loadImages() {
    const registerData = await fetchJSON("../public/data-json/registerContent.json");
    if (registerData) {
        setMultipleImages(registerData);
    } else {
        console.error("No register data found.")
    }
}

function validateForm() {
    document.getElementById("register-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let confirmPassword = document.getElementById("confirm-password");
        let name = document.getElementById("name");
        let surname = document.getElementById("surname");
        let username = document.getElementById("username");

        let errors = [];

        if (!validateName(name.value)) {
            errors.push([name, "Wrong name format, correct format: no numbers, has to start with a capital letter and minimum two characters."]);
        }

        if (!validateName(surname.value)) {
            errors.push([surname, "Wrong name format, correct format: no numbers, has to start with a capital letter and minimum two characters."]);
        }

        if (!validateUsername(username.value)) {
            errors.push([username, "Wrong username format, correct format: minimum 5 characters."])
        }

        if (!validateEmail(email.value)) {
            errors.push([email, "Wrong email format, correct format: example@domain.com."]);
        }

        if (!validatePassword(password.value)) {
            errors.push([password, "Wrong password format, correct format: minimum 8 characters and minimum one capital letter."]);
        }

        if (!validatePasswordConfirm(password.value, confirmPassword.value)) {
            errors.push([confirmPassword, "Passwords mismatch"]);
        }

        showErrors(errors, "register-form");

        if (errors.length > 0) {
            return;
        }

        processRegistration({
            name: name.value.trim(),
            surname: surname.value.trim(),
            username: username.value.trim(),
            email: email.value.trim(),
            password: password.value.trim()
        });
        document.getElementById("register-form").reset();
    });
}