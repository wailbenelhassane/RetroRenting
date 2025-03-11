import {includeHTML, fetchJSON, setImage, setMultipleImages} from "./main.js";

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML();

    const registerData = await fetchJSON("../public/data-json/registerContent.json");
    if (registerData) {
        setMultipleImages(registerData);
    } else {
        console.error("No register data found.")
    }

    validateForm();
});

function validateForm(){
    document.getElementById("register-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let confirmPassword = document.getElementById("confirm-password");
        let name = document.getElementById("name");
        let surname = document.getElementById("surname");

        if (!validateName(name)) {

        }

        if (!validateEmail(email.value)){
            console.log("Email is wrong!");
            wrongField(email, "Wrong email format, correct format: example@domain.com");
        }

        if (!validatePassword(password.value)){
            console.log("Password is wrong!");
            wrongField(password, "Wrong password format, correct format: minimum 8 characters!");
        }
        if (!validatePasswordConfirm(password.value, confirmPassword.value)){
            console.log("Confirm Password is wrong!");
            wrongField(confirmPassword, "Passwords mismatch!");
        }
    });
}

function validateName(name) {
    let namePattern = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/;
    return namePattern.test(name);
}

function validateSurname(surname) {
    let surnamePattern = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/;
    return surnamePattern.test(surname);
}

function validateEmail(email) {
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function validatePassword(password){
    let passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password);
}

function validatePasswordConfirm(password, passwordConfirm){
    return passwordConfirm.equals(password);
}

function wrongField(input, message) {
    let errorText = input.nextElementSibling;
    if (errorText && errorText.classList.contains("error-message")) {
        errorText.remove();
    }

    let errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "12px";
    errorMessage.style.marginTop = "5px";
    errorMessage.textContent = message;

    input.parentNode.insertBefore(errorMessage, input.nextSibling);
}