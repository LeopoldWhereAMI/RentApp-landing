import { getElement } from "../shared/helpers/dom";
import type { RentItem } from "../types/inventory";

class Pagination {
  private currentPage: number = 1;
  readonly maxItems: number;
  readonly totalItems: RentItem[] = [];
  readonly onPageChange: (items: RentItem[], maxItems: number) => void;

  readonly selectors = {
    pagination: "[data-js-pagination-container]",
    prevButton: "[data-js-pagination-prev-button]",
    nextButton: "[data-js-pagination-next-button]",
    currentPageElement: "[data-js-cuurent-page]",
    totalPagesElement: "[data-js-total-pages]",
  };

  readonly paginationContainer;
  readonly prevButton;
  readonly nextButton;
  readonly currentPageElement;
  readonly totalPagesElement;

  constructor(
    items: RentItem[],
    onPageChange: (items: RentItem[], maxItems: number) => void,
    maxItems = 6,
  ) {
    this.totalItems = items;
    this.onPageChange = onPageChange;
    this.maxItems = maxItems;

    this.paginationContainer = getElement(document, this.selectors.pagination);

    this.prevButton = getElement<HTMLButtonElement>(
      this.paginationContainer,
      this.selectors.prevButton,
    );

    this.nextButton = getElement<HTMLButtonElement>(
      this.paginationContainer,
      this.selectors.nextButton,
    );

    this.currentPageElement = getElement(
      this.paginationContainer,
      this.selectors.currentPageElement,
    );

    this.totalPagesElement = getElement(
      this.paginationContainer,
      this.selectors.totalPagesElement,
    );

    this.bindEvents();
  }

  init() {
    this.show();
    this.update();
  }

  private bindEvents() {
    this.prevButton.addEventListener("click", () => {
      this.prevPage();
    });

    this.nextButton.addEventListener("click", () => {
      this.nextPage();
    });
  }

  show() {
    this.paginationContainer.classList.remove("visually-hidden");
  }

  hide() {
    this.paginationContainer.classList.add("visually-hidden");
  }

  private update() {
    const start = (this.currentPage - 1) * this.maxItems;
    const end = start + this.maxItems;
    const paginatedItems = this.totalItems.slice(start, end);

    this.onPageChange(paginatedItems, this.maxItems);
    this.updatePaginationInfo();
    this.updateButtons();
  }

  private get totalPages() {
    return Math.ceil(this.totalItems.length / this.maxItems);
  }

  private updatePaginationInfo() {
    this.currentPageElement.textContent = this.currentPage.toString();
    this.totalPagesElement.textContent = this.totalPages.toString();
  }

  private updateButtons() {
    this.prevButton.disabled = this.currentPage === 1;
    this.nextButton.disabled = this.currentPage === this.totalPages;
  }

  private prevPage() {
    if (this.currentPage === 1) return;

    this.currentPage--;
    this.update();
  }

  private nextPage() {
    if (this.currentPage >= this.totalPages) return;

    this.currentPage++;
    this.update();
  }
}

export default Pagination;
