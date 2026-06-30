import { API_URL } from "../shared/config/config";
import { categoryLabels, statusLabels } from "../shared/constants/inventory";
import { getElement } from "../shared/helpers/dom";
import type { RentItem } from "../types/inventory";

class InventoryCard {
  readonly selectors = {
    card: "[data-js-rent-item]",
    categoryBadge: "[data-js-rent-item-category]",
    statusBadge: "[data-js-status-badge]",
    title: "[data-js-rent-item-title]",
    price: "[data-js-rent-item-price]",
    image: "[data-js-rent-item-image]",
    link: "[data-js-rent-item-link]",
  };

  readonly template: HTMLTemplateElement;

  constructor(template: HTMLTemplateElement) {
    this.template = template;
  }

  create(item: RentItem) {
    const clone = this.template.content.cloneNode(true) as DocumentFragment;

    const card = getElement(clone, this.selectors.card);

    const categoryBadge = getElement(card, this.selectors.categoryBadge);
    categoryBadge.textContent = categoryLabels[item.category];

    const title = getElement(card, this.selectors.title);
    title.textContent = item.name;

    const price = getElement(card, this.selectors.price);
    price.textContent = `${item.daily_price} ₽/сутки`;

    const statusBadge = getElement(card, this.selectors.statusBadge);
    statusBadge.textContent = statusLabels[item.status];

    const itemImage = getElement<HTMLImageElement>(card, this.selectors.image);

    const itemLink = getElement<HTMLAnchorElement>(card, this.selectors.link);
    itemLink.textContent = "Забронировать";

    if (item.status === "rented") {
      card.classList.add("item-busy");

      itemLink.textContent = "Недоступен";
      itemLink.removeAttribute("href");
      itemLink.setAttribute("aria-disabled", "true");
    }

    // itemImage.src = item.image_url || "";
    itemImage.src = item.image_url ? `${API_URL}${item.image_url}` : "";
    itemImage.alt = item.name;

    return clone;
  }
}

export default InventoryCard;
