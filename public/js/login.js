import {includeHTML, fetchJSON, setImage, setMultipleImages} from "./main.js";
import {validateUsername, validatePassword, showErrors} from "./utils/validationForm.js";

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

function processLogin(user, passwordInput) {
    const localStorageUser = getLocalStorageUser().user;
    if (!processLoginUsername(user, localStorageUser) || !processLoginPassword(user, localStorageUser)) {
        showErrors([passwordInput, "User not found or password incorrect."], "login-form");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify({ user }));
    window.location.href = document.referrer;
}

function processLoginUsername(user, localStorageUser) {
    return user.username === localStorageUser.username;
}

function processLoginPassword(user, localStorageUser){
    return user.password === localStorageUser.password;
}

function getLocalStorageUser() {
    let user = localStorage.getItem("registeredUser");
    return user ? JSON.parse(user) : null;
}