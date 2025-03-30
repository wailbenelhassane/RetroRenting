import {showErrors} from "../utils/validationForm.js";

export function processRegistration(user){
    let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const newUser = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        username: user.username,
        password: user.password,
    }

    users.push(newUser);

    localStorage.setItem("registeredUsers", JSON.stringify(users));
    window.location.href = "../views/login.html";
}

export async function processLogin(user, passwordInput) {
    const users = await getAllUsers();
    const matchedUser = users.find((u => u.username === user.username && u.password === user.password));
    if (!matchedUser) {
        showErrors([[[passwordInput], "User not found or password incorrect."]], "login-form");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(matchedUser));
    window.location.href = "../views/index.html";
}

export function getUserLogin(){
    let user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
}

async function getAllUsers(){
    const jsonUsers = await loadUsersFromJSON();
    const registeredUsers = getRegisteredUsers();
    return [...jsonUsers, ...registeredUsers];
}

function getRegisteredUsers() {
    const users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
}

async function loadUsersFromJSON() {
    try {
        const response = await fetch("../public/data-json/users.json");
        if (!response.ok) {
            throw new Error("Error loading users.json");
        }
        return await response.json();
    } catch (error) {
        console.error("Error loading users from JSON:", error);
        return [];
    }
}

export function logout() {
    localStorage.removeItem("currentUser");
    window.location.reload();
}