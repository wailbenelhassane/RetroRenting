let currentIndex = 0;
let items = document.querySelectorAll(".team-image");
const intervalTime = 3000;
let autoSlide;

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


showSlide(currentIndex);
startAutoSlide();

document.querySelector('.team-carousel-container').addEventListener('mouseenter', () => {
    clearInterval(autoSlide);

});

document.querySelector('.team-carousel-container').addEventListener('mouseleave', () => {
    startAutoSlide();
});