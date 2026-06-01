import { getInventory } from "../api/inventory";
import { getElement } from "../shared/helpers/dom";
import type { RentItem } from "../types/inventory";
import InventoryCard from "./InventoryCard";
import Pagination from "./Pagination";
import PlaceholderCard from "./PlaceholderCard";

class Inventory {
  readonly selectors = {
    rentSection: "[data-js-rent-section]",
    rentList: "[data-js-rent-list]",
    template: "#rent-list-template",
  };

  readonly rentList;
  readonly template;

  constructor() {
    const rentSection = getElement(document, this.selectors.rentSection);

    this.rentList = getElement(rentSection, this.selectors.rentList);
    this.template = getElement<HTMLTemplateElement>(
      rentSection,
      this.selectors.template,
    );

    this.render();
  }

  async render() {
    this.showSkeletonLoader();
    try {
      const inventory = await getInventory();
      this.removeSkeletonLoader();
      const pagination = new Pagination(inventory, (items, maxItems) =>
        this.renderItems(items, maxItems),
      );

      pagination.init();
    } catch (error) {
      this.removeSkeletonLoader();
      this.handleError(error);
    }
  }

  private renderItems(items: RentItem[], maxItems: number) {
    const onTransitionEnd = () => {
      this.rentList.removeEventListener("transitionend", onTransitionEnd);
      this.clearRentList();
      const card = new InventoryCard(this.template);

      items.forEach((item) => {
        this.rentList.append(card.create(item));
      });

      const placeholderCount = maxItems - items.length;
      const placeholder = new PlaceholderCard();

      Array.from({ length: placeholderCount }).forEach(() => {
        this.rentList.append(placeholder.create());
      });

      requestAnimationFrame(() => {
        this.rentList.style.opacity = "1";
      });
    };

    this.rentList.addEventListener("transitionend", onTransitionEnd);
    this.rentList.style.opacity = "0";
  }

  private clearRentList() {
    this.rentList.replaceChildren();
  }

  private showSkeletonLoader() {
    this.clearRentList();

    // Показываем 6 скелетон-карточек
    for (let i = 0; i < 6; i++) {
      const skeletonItem = document.createElement("li");
      skeletonItem.className = "skeleton-card";
      skeletonItem.innerHTML = `
      <div class="rent-item-top">
        <div class="skeleton-category"></div>
        <div class="skeleton-badge"></div>
      </div>
      <div class="skeleton-title"></div>
      <div class="skeleton-price"></div>
      <div class="skeleton-image-wrapper">
        <div class="skeleton-image"></div>
      </div>
      <div class="skeleton-button"></div>
    `;
      this.rentList.append(skeletonItem);
    }
  }

  private removeSkeletonLoader() {
    const skeletons = this.rentList.querySelectorAll(".skeleton-card");
    skeletons.forEach((skeleton) => skeleton.remove());
  }

  private handleError(error: unknown) {
    if (error instanceof Error) {
      this.showError(error.message);
    } else {
      this.showError("Произошла неизвестная ошибка");
    }
  }

  private showError(message: string) {
    const errorItem = document.createElement("li");
    errorItem.className = "error-message";
    errorItem.textContent = `${message}. Попробуйте обновить страницу позже.`;

    this.rentList.replaceChildren(errorItem);
  }
}

export default Inventory;
