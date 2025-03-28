export async function getReviews() {
  const reviewsContainer = document.querySelector(".reviews");
  let currentIndex = 0;
  let reviewsData = [];
  let autoplayInterval;
  let isMobile = window.innerWidth <= 768;

  function getStars(rating) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }

  function updateCarousel() {
    if (isMobile) {
      const carouselTrack = document.querySelector(".carousel-track");
      if (carouselTrack) {
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % reviewsData.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + reviewsData.length) % reviewsData.length;
    updateCarousel();
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  function handleResize() {
    const wasNotMobile = !isMobile;
    isMobile = window.innerWidth <= 768;

    if (wasNotMobile !== !isMobile) {
      renderReviews();
    }
  }

  function renderReviews() {
    reviewsContainer.innerHTML = '';

    if (isMobile) {
      const carouselContainer = document.createElement("div");
      carouselContainer.classList.add("carousel-container");

      const carouselTrack = document.createElement("div");
      carouselTrack.classList.add("carousel-track");

      reviewsData.forEach((review) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img src="${review.image}" alt="Profile Picture" class="profile-pic">
          <h3>${review.name}</h3>
          <p>"${review.review}"</p>
          <div class="stars">${getStars(review.rating)}</div>
        `;

        carouselTrack.appendChild(card);
      });

      carouselContainer.appendChild(carouselTrack);
      reviewsContainer.appendChild(carouselContainer);

      startAutoplay();

      initTouchEvents(carouselTrack);
    } else {
      reviewsData.forEach(review => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img src="${review.image}" alt="Profile Picture" class="profile-pic">
          <h3>${review.name}</h3>
          <p>"${review.review}"</p>
          <div class="stars">${getStars(review.rating)}</div>
        `;

        reviewsContainer.appendChild(card);
      });

      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    updateCarousel();
  }

  function initTouchEvents(element) {
    let startX, moveX;

    element.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, {passive: true});

    element.addEventListener('touchmove', (e) => {
      moveX = e.touches[0].clientX;
    }, {passive: true});

    element.addEventListener('touchend', () => {
      if (!startX || !moveX) return;

      const difference = startX - moveX;
      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
          startAutoplay();
        }
      }
    });
  }

  fetch("../../RetroRenting/public/data-json/reviews.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then(data => {
        reviewsData = data;
        renderReviews();

        window.addEventListener('resize', handleResize);
      })
      .catch(error => {
        console.error("Error al obtener las reseñas:", error);
        reviewsContainer.innerHTML = "<p style='color: white;'>No se pudieron cargar las reseñas.</p>";
      });
}

document.addEventListener('DOMContentLoaded', getReviews);