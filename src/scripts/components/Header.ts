import { getElement } from "../shared/helpers/dom";

class Header {
  readonly selectors = {
    header: "[data-js-header]",
    headerMenu: "[data-js-header-menu]",
    burgerButton: "[data-js-header-burger-button]",
  };

  readonly stateClasses = {
    isActive: "is-active",
    isLock: "is-lock",
  };

  readonly headerElement;
  readonly headerMenuElement;
  readonly burgerButtonElement;

  constructor() {
    this.headerElement = getElement(document, this.selectors.header);

    this.headerMenuElement = getElement(
      this.headerElement,
      this.selectors.headerMenu,
    );

    this.burgerButtonElement = getElement(
      this.headerElement,
      this.selectors.burgerButton,
    );

    this.bindEvents();
  }

  onBurgerButtonClick = () => {
    this.burgerButtonElement.classList.toggle(this.stateClasses.isActive);

    if (
      this.burgerButtonElement.classList.contains(this.stateClasses.isActive)
    ) {
      this.burgerButtonElement.title = "Close menu";
    } else {
      this.burgerButtonElement.title = "Open menu";
    }

    this.headerMenuElement.classList.toggle(this.stateClasses.isActive);
    document.documentElement.classList.toggle(this.stateClasses.isLock);
  };

  bindEvents() {
    this.burgerButtonElement.addEventListener(
      "click",
      this.onBurgerButtonClick,
    );

    this.headerMenuElement.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const menuLink = target.closest("a");

      if (
        menuLink &&
        this.headerMenuElement.classList.contains(this.stateClasses.isActive)
      ) {
        this.onBurgerButtonClick();
      }
    });
  }
}

export default Header;
