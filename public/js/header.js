import {fetchJSON} from "./main.js";
import {getUserLogin} from "./services/authService.js";

export async function loadHeaderContent() {
    const headerData = await fetchJSON("../public/data-json/header.json");

    if (headerData) {
        if (headerData.logo) {
            const logoImg = document.querySelector('.logo-image');
            if (logoImg) {
                logoImg.src = headerData.logo.src;
                logoImg.alt = headerData.logo.alt;
            }
        }


        if (headerData.mainMenu) {
            const navMenu = document.querySelector('.navigation-menu');
            if (navMenu) {
                navMenu.innerHTML = '';
                headerData.mainMenu.forEach(item =>{
                    const li = document.createElement('li');
                    li.className = 'navigation-item';
                    li.innerHTML = `<a href="${item.url}">${item.title}</a>`;
                    navMenu.appendChild(li);
                });
            }
        }

        if (headerData.authLinks) {
            const authContainer = document.querySelector('.auth-links');
            if (authContainer) {
                authContainer.innerHTML = '';
               headerData.authLinks.forEach((item, index) => {
                    const link = document.createElement('a');
                    link.className = "auth-link";
                    link.href = item.url;
                    link.textContent = item.title;
                    authContainer.appendChild(link);


                    if (index < headerData.authLinks.length - 1) {
                        const span = document.createElement('span');
                        span.textContent = '/';
                        span.className = 'auth-link';
                        authContainer.appendChild(span);
                    }
                });
            }
        }

        if (headerData.mainMenu || headerData.authLinks) {
            const mobileMenu = document.querySelector('.mobile-navigation-menu');
            if (mobileMenu) {
                mobileMenu.innerHTML = '';
                if (headerData.authLinks) {
                    const authMobileLi = document.createElement('li');
                    authMobileLi.className = 'mobile-navigation-item auth-mobile';

                    headerData.authLinks.forEach((item, index) => {
                        const link = document.createElement('a');
                        link.href = item.url;
                        link.textContent = item.title;
                        authMobileLi.appendChild(link);

                        if (index < headerData.authLinks.length - 1) {
                            const span = document.createElement('span');
                            span.textContent = '/';
                            authMobileLi.appendChild(span);
                        }
                    });

                    mobileMenu.appendChild(authMobileLi);
                }

                if (headerData.mainMenu) {
                    headerData.mainMenu.forEach(item => {
                        const li = document.createElement('li');
                        li.className = 'mobile-navigation-item';
                        li.innerHTML = `<a href="${item.url}">${item.title}</a>`;
                        mobileMenu.appendChild(li);
                    });
                }
            }
        }

        displayLoginSignUpOptions();
        setupMobileNavigation();
    } else {
        console.error("No navigation data found.");
    }
}

function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        const mobileLinks = document.querySelectorAll('.mobile-navigation-item a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    } else {
        console.warn("Mobile navigation elements not found in the DOM.");
    }
}

function displayLoginSignUpOptions(){
    let user = getUserLogin();
    if (user !== null) {
        user = user.user;
        let authLinks = document.getElementsByClassName("auth-link");
        Array.from(authLinks).forEach(link => {link.style.display = 'none';});
        let welcomeMessage = document.createElement('p');
        welcomeMessage.textContent = `Welcome ${user.username}`;
        welcomeMessage.style.color = 'white';
        welcomeMessage.style.fontFamily = 'Roboto, sans-serif';
        welcomeMessage.style.fontSize = '1.2rem';

        let logoutButton = document.createElement('button');
        logoutButton.textContent = 'Logout';
        logoutButton.style.backgroundColor = '#ff4d4d';
        logoutButton.style.color = 'white';
        logoutButton.style.border = 'none';
        logoutButton.style.padding = '8px 12px';
        logoutButton.style.cursor = 'pointer';
        logoutButton.style.fontSize = '1rem';
        logoutButton.style.borderRadius = '5px';
        logoutButton.style.marginLeft = '10px';

        logoutButton.addEventListener('click', () => {
            localStorage.removeItem("currentUser");
            window.location.reload();
        });

        let authLinksContainer = document.getElementsByClassName("auth-links")[0];
        if (authLinksContainer) {
            authLinksContainer.appendChild(welcomeMessage);
            authLinksContainer.appendChild(logoutButton);
        } else {
            console.warn("Elemento con clase 'auth-links' no encontrado.");
        }
    }
}