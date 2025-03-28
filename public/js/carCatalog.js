import {fetchJSON, setImage} from "./main.js";

export async function initCarCatalog() {
    const carImageSelector = ".car-image";
    const mobileCatalogLink = document.querySelector(".mobile-catalog-link");
    const desktopMenuItems = document.querySelectorAll(".car-catalog-menu-item");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    const carData = await fetchJSON("../public/data-json/catalogCars.json");
    if (!carData || !carData.images) return;

    const getCarImage = (decade) => {
        const cars = Object.values(carData.images[decade]);
        return cars[0];
    };

    const decades = ["70", "80", "90"];
    let currentDecadeIndex = 0;

    const images = {
        "70": getCarImage("70"),
        "80": getCarImage("80"),
        "90": getCarImage("90"),
    };


    setImage(carImageSelector, { src: images["70"], altText: "Car image from 70s" });


    const updateMobileView = (decade) => {
        setImage(carImageSelector, { src: images[decade], altText: `Car image from ${decade}s` });
        mobileCatalogLink.textContent = `${decade}'s Catalog`;
        mobileCatalogLink.href = `/RetroRenting/views/catalog.html#${decade}`;
    };


    desktopMenuItems.forEach((item) => {
        item.addEventListener("mouseenter", function () {
            const decade = this.innerText.match(/(\d{2})/)[0];
            setImage(carImageSelector, { src: images[decade], altText: `Car image from ${decade}s` });
        });
    });


    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            currentDecadeIndex = (currentDecadeIndex - 1 + decades.length) % decades.length;
            const decade = decades[currentDecadeIndex];
            updateMobileView(decade);
        });

        nextBtn.addEventListener("click", () => {
            currentDecadeIndex = (currentDecadeIndex + 1) % decades.length;
            const decade = decades[currentDecadeIndex];
            updateMobileView(decade);
        });
    }


    const carImageContainer = document.querySelector(".car-catalog-image");
    if (carImageContainer) {
        carImageContainer.addEventListener("click", (event) => {

            if (event.target.classList.contains('prev-btn') || event.target.classList.contains('next-btn')) {
                return;
            }

            if (window.innerWidth <= 768) {
                currentDecadeIndex = (currentDecadeIndex + 1) % decades.length;
                const decade = decades[currentDecadeIndex];
                updateMobileView(decade);
            }
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            updateMobileView(decades[currentDecadeIndex]);
        }
    });


    if (window.innerWidth <= 768) {
        updateMobileView(decades[currentDecadeIndex]);
    }
}

document.addEventListener("DOMContentLoaded", initCarCatalog);