import {includeHTML, fetchJSON, setImage, setMultipleImages} from "./main.js";

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

function validateForm(){
    document.getElementById("register-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let confirmPassword = document.getElementById("confirm-password");
        let name = document.getElementById("name");
        let surname = document.getElementById("surname");
        let username = document.getElementById("username");

        let errors = [];

        if (!validateName(name.value)) {
            errors.push([name, "Wrong name format, correct format: no numbers, has to start with a capital letter and minimum two character"]);
        }

        if (!validateName(surname.value)) {
            errors.push([surname, "Wrong name format, correct format: no numbers, has to start with a capital letter and minimum two character"]);
        }

        if (!validateUsername(username.value)) {
            errors.push([username, "Wrong username format, correct format: minimum 5 characters"])
        }

        if (!validateEmail(email.value)){
            errors.push([email, "Wrong email format, correct format: example@domain.com"]);
        }

        if (!validatePassword(password.value)){
            errors.push([password, "Wrong password format, correct format: minimum 8 characters"]);
        }

        if (!validatePasswordConfirm(password.value, confirmPassword.value)){
            errors.push([confirmPassword, "Passwords mismatch"]);
        }

        showErrors(errors);

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

function validateName(name) {
    let namePattern = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/;
    return namePattern.test(name);
}

function validateEmail(email) {
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function validatePassword(password){
    return password.length >= 8;
}

function validatePasswordConfirm(password, passwordConfirm){
    return passwordConfirm === password;
}

function validateUsername(username) {
    return username.length >= 5;
}

function showErrors(errorList) {
    let existingErrorContainer = document.getElementById("error-container");
    if (existingErrorContainer) {
        existingErrorContainer.remove();
    }

    if (errorList.length === 0) return;

    let errorContainer = document.createElement("div");
    errorContainer.id = "error-container";

    let errorListElement = document.createElement("ul");

    errorList.forEach(error => {
        let listItem = document.createElement("li");
        listItem.textContent = error[1];
        error[0].value = "";
        error[0].style.border = "2px solid red";
        errorListElement.appendChild(listItem);
    });

    errorContainer.appendChild(errorListElement);

    let form = document.getElementById("register-form");
    form.appendChild(errorContainer);
}

function processRegistration(user){
    localStorage.setItem("registeredUser", JSON.stringify({ user }));
    console.log(user);
    window.location.href = "../views/login.html";
}