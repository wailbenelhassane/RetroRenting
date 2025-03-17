import {fetchJSON} from "./main.js";

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
                    link.href = item.url;
                    link.textContent = item.title;
                    authContainer.appendChild(link);


                    if (index < headerData.authLinks.length - 1) {
                        const span = document.createElement('span');
                        span.textContent = '/';
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