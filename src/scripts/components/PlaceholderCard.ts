class PlaceholderCard {
  create() {
    const placeholderElement = document.createElement("article");

    placeholderElement.classList.add("rent-item", "rent-item--placeholder");

    placeholderElement.setAttribute("aria-hidden", "true");

    placeholderElement.innerHTML = `
        <div class="rent-item-top">
            <span class="placeholder-line placeholder-badge"></span>
            <span class="placeholder-line placeholder-status"></span>
            </div>

            <div class="placeholder-line placeholder-title">Инструмент пока недоступен</div>

            <div class="placeholder-line placeholder-price"></div>

            <div class="rent-item-image-wrapper">
            <div class="placeholder-image"></div>
        </div>

        <div class="placeholder-line placeholder-button"></div>`;

    return placeholderElement;
  }
}

export default PlaceholderCard;
