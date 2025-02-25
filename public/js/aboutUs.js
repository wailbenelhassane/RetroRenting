import {fetchJSON, includeHTML} from "./main.js";
import { loadHeaderContent } from "./header.js";
import { getReviews } from './reviews.js';
import { initTeamCarousel } from './team-carousel.js';
import {loadTextSections} from "./textSection.js";

document.addEventListener("DOMContentLoaded", async () => {
  await includeHTML();
  await fetchJSON();
  await loadHeaderContent();
  await initTeamCarousel();
  await getReviews();
  await loadTextSections();
});