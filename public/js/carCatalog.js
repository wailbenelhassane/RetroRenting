import {fetchJSON, setImage} from "./main.js";

export async function initCarCatalog() {
    const carImageSelector = ".car-image";
    const menuItems = document.querySelectorAll(".car-catalog-menu-item");
    const carData = await fetchJSON("../public/data-json/catalogCars.json");
    if (!carData || !carData.images) return;

    const getCarImage = (decade) => {
        const cars = Object.values(carData.images[decade]);
        return cars[0];
    };

    const images = {
        "70": getCarImage("70"),
        "80": getCarImage("80"),
        "90": getCarImage("90"),
    };

    setImage(carImageSelector, { src: images["70"], altText: "Car image from 70s" });

    menuItems.forEach((item) => {
        item.addEventListener("mouseenter", function () {
            const decade = this.innerText.match(/(\d{2})/)[0];
            setImage(carImageSelector, { src: images[decade], altText: `Car image from ${decade}s` });
        });

    });
}

document.addEventListener("DOMContentLoaded", initCarCatalog);
