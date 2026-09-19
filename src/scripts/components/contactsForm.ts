import { getElement } from "../shared/helpers/dom";

class ContactForm {
  readonly selectors = {
    form: "[data-js-contact-form]",
    submitBtn: "[data-js-submitButton]",
    message: "[data-js-form-message]",
  };

  readonly formElement;
  readonly submitButtonElement;
  readonly messageElement;

  constructor() {
    this.formElement = getElement(
      document,
      this.selectors.form,
    ) as HTMLFormElement;
    this.submitButtonElement = getElement(
      document,
      this.selectors.submitBtn,
    ) as HTMLButtonElement;
    this.messageElement = getElement(
      document,
      this.selectors.message,
    ) as HTMLParagraphElement;

    this.submit();
  }

  submit() {
    this.formElement.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!this.validate()) {
        return;
      }

      const formData = new FormData(this.formElement);
      formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

      const originalText = this.submitButtonElement.textContent;

      this.clearMessage();

      this.submitButtonElement.textContent = "Отправка...";
      this.submitButtonElement.disabled = true;

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          this.formElement.reset();
          this.showMessage(
            "Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.",
            "success",
          );
        } else {
          this.showMessage(
            "Не удалось отправить заявку. Попробуйте ещё раз.",
            "error",
          );

          console.error("Web3Forms:", result.message);
        }
      } catch (error) {
        this.showMessage(
          "Произошла ошибка при отправке. Попробуйте ещё раз.",
          "error",
        );

        console.error("Ошибка при отправке формы:", error);
      } finally {
        this.submitButtonElement.textContent = originalText;
        this.submitButtonElement.disabled = false;
      }
    });
  }

  validate() {
    const teaxtareaElement = this.formElement.elements.namedItem(
      "questions",
    ) as HTMLTextAreaElement;

    if (!teaxtareaElement.value.trim()) {
      this.showMessage("Опишите вашу проблему или вопрос", "error");
      return false;
    }
    return true;
  }

  showMessage(message: string, type: "success" | "error") {
    this.messageElement.textContent = message;
    this.messageElement.classList.add(`contacts-form-message--${type}`);
  }

  clearMessage() {
    this.messageElement.textContent = "";
    this.messageElement.classList.remove(
      "contacts-form-message--success",
      "contacts-form-message--error",
    );
  }
}

export default ContactForm;
