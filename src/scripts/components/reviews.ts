import { createIcons, icons } from "lucide";
import { REVIEWS } from "../shared/constants/reviews";
import { getElement } from "../shared/helpers/dom";

class Reviews {
  readonly listElement;
  readonly selectors = {
    list: "[data-js-reviews-list]",
  };

  constructor() {
    this.listElement = getElement(
      document,
      this.selectors.list,
    ) as HTMLUListElement;

    this.render();
  }

  render() {
    this.listElement.innerHTML = REVIEWS.map(
      ({ author, text, rating, date }) => `
        <li class="reviews-item">
          <div class="reviews-item-icon">
            <i data-lucide="quote" width="32" height="32"></i>
          </div>

          <p class="review-text">
            ${text}
          </p>

          <div class="review-item-bottom">
            <div class="review-user-info">
              <p>${author}</p>
              <p>${date}</p>
            </div>

            <div class="rewiev-rating">
              ${this.renderStars(rating)}
            </div>
          </div>
        </li>
      `,
    ).join("");

    createIcons({ icons });
  }

  renderStars(rating: number) {
    return Array.from(
      { length: 5 },
      (_, index) => `
        <i
          data-lucide="star"
          class="star ${index < rating ? "star-active" : ""}"
          width="16"
          height="16"
        ></i>
      `,
    ).join("");
  }
}

export default Reviews;
