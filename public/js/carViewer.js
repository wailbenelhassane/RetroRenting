export async function loadCarViewer() {
    const secondaryImages = document.querySelectorAll('.secondary-img');
    const mainImage = document.getElementById('main-image');

    secondaryImages.forEach(image => {
        image.addEventListener('click', () => {
            const tempSrc = mainImage.src;
            mainImage.src = image.src;
            image.src = tempSrc;

            secondaryImages.forEach(img => img.parentElement.classList.remove('selected'));
            image.parentElement.classList.add('selected');
        });
    });


    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-img');
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;
    const slideCount = carouselSlides.length;


    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentIndex * 25}%)`;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
        });
    }


    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.getAttribute('data-index'));
            updateCarousel();
        });
    });


    function syncImages() {
        const isMobile = window.innerWidth <= 576;

        if (isMobile && mainImage && mainImage.src) {
            if (mainImage.src) {
                carouselImages[0].src = mainImage.src;
            }

            secondaryImages.forEach((img, index) => {
                if (img.src && carouselImages[index + 1]) {
                    carouselImages[index + 1].src = img.src;
                }
            });
        }
    }

    syncImages();
    window.addEventListener('resize', syncImages);
}

document.addEventListener('DOMContentLoaded', loadCarViewer);