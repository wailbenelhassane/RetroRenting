import {fetchJSON, setMultipleImages} from "./main.js";

export async function loadHeaderContent() {
    const headerData = await fetchJSON("../public/data-json/headerContent.json");

    if (headerData) {
        setMultipleImages(headerData);
        setupMobileNavigation();
    } else {
        console.error("No header data found.");
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