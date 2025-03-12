import {includeHTML, fetchJSON, setImage, setMultipleImages} from "./main.js";

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
            errors.push(["Wrong username format, correct format: minimum 5 characters"])
        }

        if (!validatePassword(password.value)){
            errors.push(["Wrong password format, correct format: minimum 8 characters!"]);
        }

        showErrors(errors);

        if (errors.length > 0) {
            return;
        }

        processLogin({username : username.value, password : password.value});
    });
}

function validateUsername(username) {
    return username.length >= 5;
}

function validatePassword(password){
    return password.length >= 8;
}

function showErrors(errorList) {
    let existingErrorContainer = document.getElementById("error-container");
    if (existingErrorContainer) {
        existingErrorContainer.remove();
    }

    if (errorList.length === 0) return;

    let errorContainer = document.createElement("div");
    errorContainer.id = "error-container";
    errorContainer.style.color = "red";
    errorContainer.style.fontSize = "14px";
    errorContainer.style.fontFamily = "Roboto, sans serif";
    errorContainer.style.marginTop = "15px";
    errorContainer.style.padding = "10px";
    errorContainer.style.border = "1px solid red";
    errorContainer.style.borderRadius = "5px";

    let errorListElement = document.createElement("ul");
    errorListElement.style.paddingLeft = "20px";

    errorList.forEach(error => {
        let listItem = document.createElement("li");
        listItem.textContent = error;
        errorListElement.appendChild(listItem);
    });

    errorContainer.appendChild(errorListElement);

    let form = document.getElementById("login-form");
    form.appendChild(errorContainer);
}

function processLogin(user) {
    let localStorageUser = getLocalStorageUser();
    console.log(localStorageUser);
    if (!processLoginUsername(user, localStorageUser) || !processLoginPassword(user, localStorageUser)) {
        showErrors(["User not found or password incorrect."]);
        return;
    }

    console.log("Sesión iniciada");
}

function processLoginUsername(user, localStorageUser) {
    console.log(user.username);
    console.log(localStorageUser.username);
    return user.username === localStorageUser.username;
}

function processLoginPassword(user, localStorageUser){
    console.log(user.password);
    console.log(localStorageUser.password);
    return user.password === localStorageUser.password;
}

function getLocalStorageUser() {
    let user = localStorage.getItem("registeredUser");
    return user ? JSON.parse(user) : null;
}