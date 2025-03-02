export async function initTeamCarousel() {
    let currentIndex = 0;
    const intervalTime = 3000;
    let autoSlide;

    const response = await fetch("/RetroRenting/public/data-json/teamCarousel.json");
    const data = await response.json();

    const carouselContainer = document.querySelector(".team-carousel");

    if (data && data.teamImages) {
        carouselContainer.innerHTML = "";

        data.teamImages.forEach((image, index) => {
            const teamImageElement = document.createElement("div");
            teamImageElement.classList.add("team-image");
            if (index === 1) teamImageElement.classList.add("active");

            teamImageElement.innerHTML = `
                <img src="${image.src}" alt="${image.alt}">
            `;

            carouselContainer.appendChild(teamImageElement);
        });
    } else {
        console.error("No se pudieron cargar las imágenes del carrusel.");
    }

    const items = document.querySelectorAll(".team-image");

    function showSlide(index) {
        items.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
    }

    function moveSlide(step) {
        currentIndex += step;
        if (currentIndex >= items.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = items.length - 1;
        }
        showSlide(currentIndex);
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            moveSlide(1);
        }, intervalTime);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    showSlide(currentIndex);
    startAutoSlide();

    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            stopAutoSlide();
        });

        carouselContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
}
