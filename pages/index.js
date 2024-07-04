import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//Consts + Settings

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
const profileEditCloseModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-enter");
const profileDescriptionInput = document.querySelector(
  "#profile-description-enter"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardLinkInput = addCardForm.querySelector(".modal__input_type_link");
const previewImageModal = document.querySelector(".modal__preview");
const modalImage = previewImageModal.querySelector(".modal__image-preview");
const modalTitle = document.querySelector(".modal__image-title");
const modalImageCloseButton = previewImageModal.querySelector(
  "#modal__image-close-button"
);

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//Validator Codes
const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, addCardForm);
addFormValidator.enableValidation();

//Functions

//close//
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscapeKey);
  modal.removeEventListener("mousedown", closeModalOnClick);
}

//edit profile + add new card + enlarge image//
function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscapeKey);
  modal.addEventListener("mousedown", closeModalOnClick);
}

//escape key to close //
function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const currentPopup = document.querySelector(".modal_opened");
    closePopup(currentPopup);
  }
}

//click anywhere to close//
function closeModalOnClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function handleProfileEditForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  addCardForm.reset();
  closePopup(addCardModal);
  addFormValidator.disableButton();
}

//New Card Data

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData, cardListEl) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

function handleImageClick(cardData) {
  previewImageEl.src = cardData.link;
  previewImageEl.alt = cardData.name;
  previewImageTextEl.textContent = cardData.name;
  openModal(previewImageModal);
}

modalImageCloseButton.addEventListener("click", () => {
  closePopup(previewImageModal);
});

//Event Listeners

profileEditForm.addEventListener("submit", handleProfileEditForm);
addCardForm.addEventListener("submit", handleAddFormSubmit);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
  editFormValidator.disableButton();
});

profileEditCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

modalImageCloseButton.addEventListener("click", () =>
  closePopup(previewImageModal)
);

//Render

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
