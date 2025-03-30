import {showErrors} from "../utils/validationForm.js";

export function processRegistration(user){
    localStorage.setItem("registeredUser", JSON.stringify({ user }));
    window.location.href = "../views/login.html";
}

export function processLogin(user, passwordInput) {
    const localStorageUser = getLocalStorageUser().user;
    if (!processLoginUsername(user, localStorageUser) || !processLoginPassword(user, localStorageUser)) {
        showErrors([passwordInput, "User not found or password incorrect."], "login-form");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify({ user }));
    window.location.href = "../views/index.html";
}

export function processLoginUsername(user, localStorageUser) {
    return user.username === localStorageUser.username;
}

export function processLoginPassword(user, localStorageUser){
    return user.password === localStorageUser.password;
}

export function getLocalStorageUser() {
    let user = localStorage.getItem("registeredUser");
    return user ? JSON.parse(user) : null;
}

export function getUserLogin(){
    let user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
}

export function logout() {
    localStorage.removeItem("currentUser");
    window.location.reload();
}