import { includeHTML, fetchJSON, setMultipleImages } from "./main.js";
import { showErrors, cleanAllInputs, validateAllFieldsForm } from "./utils/validationForm.js";
import { processRegistration } from "./services/authService.js";

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

        cleanAllInputs("register-form");

        const errors = validateAllFieldsForm();

        showErrors(errors, "register-form");


        if (errors.length > 0) {
            return;
        }

        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let name = document.getElementById("name");
        let surname = document.getElementById("surname");
        let username = document.getElementById("username");

        if (!email || !password || !name || !surname || !username) {
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