export default class FormValidator {
  constructor(settings, formEl) {
    this._formEl = formEl;
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputEls)) {
      this.disableButton();
      return;
    }
    this._enableButton();
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListeners() {
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}
