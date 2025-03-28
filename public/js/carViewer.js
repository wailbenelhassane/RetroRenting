export async function loadCarViewer() {
    await Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => {
        img.onload = img.onerror = resolve;
    })));

    const secondaryImages = document.querySelectorAll('.secondary-img');
    const mainImage = document.getElementById('main-image');

    if (secondaryImages.length > 0 && mainImage) {
        secondaryImages.forEach(image => {
            image.addEventListener('click', () => {
                const tempSrc = mainImage.src;
                mainImage.src = image.src;
                image.src = tempSrc;

                secondaryImages.forEach(img => img.parentElement.classList.remove('selected'));
                image.parentElement.classList.add('selected');

                syncImages();
            });
        });

        if (secondaryImages[0] && secondaryImages[0].parentElement) {
            secondaryImages[0].parentElement.classList.add('selected');
        }
    }

    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-img');
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;
    const slideCount = carouselSlides.length;

    function updateCarousel() {
        if (!carouselTrack) return;

        carouselTrack.style.transform = `translateX(-${currentIndex * 25}%)`;

        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }
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

    if (dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.getAttribute('data-index'));
                updateCarousel();
            });
        });
    }

    function syncImages() {
        if (mainImage && mainImage.src && carouselImages.length > 0) {
            carouselImages[0].src = mainImage.src;

            secondaryImages.forEach((img, index) => {
                if (img.src && carouselImages[index + 1]) {
                    carouselImages[index + 1].src = img.src;
                }
            });
        }

        if (carouselTrack) {
            carouselTrack.offsetHeight;
        }
    }

    syncImages();
    updateCarousel();

    window.addEventListener('resize', syncImages);
}

document.addEventListener('DOMContentLoaded', () => {
    loadCarViewer().catch(err => console.error('Error loading car viewer:', err));
});

window.addEventListener('load', () => {
    loadCarViewer().catch(err => console.error('Error loading car viewer:', err));
});