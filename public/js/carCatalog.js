import {fetchJSON, setImage} from "./main.js";

export async function initCarCatalog() {
    const carImageSelector = ".car-image";
    const menuItems = document.querySelectorAll(".car-catalog-menu-item");
    const carData = await fetchJSON("../public/data-json/images.json");
    if (!carData || !carData.images) return;

    const getRandomCarImage = (decade) => {
        const cars = Object.values(carData.images[decade]);
        const randomCar = cars[Math.floor(Math.random() * cars.length)];
        return randomCar.principal;
    };

    const images = {
        "70": getRandomCarImage("70"),
        "80": getRandomCarImage("80"),
        "90": getRandomCarImage("90"),
    };

    setImage(carImageSelector, { src: images["70"], altText: "Car image from 70s" });

    menuItems.forEach((item) => {
        item.addEventListener("mouseenter", function () {
            const decade = this.innerText.match(/(\d{2})/)[0];
            setImage(carImageSelector, { src: images[decade], altText: `Car image from ${decade}s` });
        });

        item.addEventListener("mouseleave", function () {
            setImage(carImageSelector, { src: images["70"], altText: "Car image from 70s" });
        });
    });
}

document.addEventListener("DOMContentLoaded", initCarCatalog);
