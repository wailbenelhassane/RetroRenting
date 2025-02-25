import { includeHTML } from "./main.js";
import { loadHeaderContent } from "./header.js";
import { getReviews } from './reviews.js';

document.addEventListener("DOMContentLoaded", async () => {
  await includeHTML();
  await loadHeaderContent();
  await getReviews();
});