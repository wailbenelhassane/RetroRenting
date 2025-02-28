export async function changeImage() {
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
}

document.addEventListener('DOMContentLoaded', changeImage);

