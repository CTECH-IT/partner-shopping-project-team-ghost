import { Cart } from "./Cart.js";
import { Checkout } from "./Checkout.js";
import { DataStore } from "./DataStore.js";

export class Selection {
  static FLAVOR_IMAGE_ATTRIBUTE = "data-flavor-image";
  static FLAVOR_TITLE_ATTRIBUTE = "data-flavor-title";
  static FLAVOR_DESCRIPTION_ATTRIBUTE = "data-flavor-description";
  static FLAVOR_OPTION_ATTRIBUTE = "data-flavor-option";
  static BUTTON_ADD_ATTRIBUTE = "data-button-add";
  static FLAVOR_IMAGE_SELECTOR = `[${Selection.FLAVOR_IMAGE_ATTRIBUTE}]`;
  static FLAVOR_TITLE_SELECTOR = `[${Selection.FLAVOR_TITLE_ATTRIBUTE}]`;
  static FLAVOR_DESCRIPTION_SELECTOR = `[${Selection.FLAVOR_DESCRIPTION_ATTRIBUTE}]`;
  static FLAVOR_BUTTON_SELECTOR = `[${Selection.FLAVOR_OPTION_ATTRIBUTE}]`;
  static BUTTON_ADD_SELECTOR = `[${Selection.BUTTON_ADD_ATTRIBUTE}]`;
  static FLAVORS = {
    blueraz: {
      title: "Blue Raz",
      description:
        "Feel the fizzling power of 800 mg of caffeine in a small, sleek package. Made from all-natural blue raspberries!",
      colorClass: "bg-blue-300"
    },
    limesplosion: {
      title: "Limesplosion",
      description:
        "Feel the explosive power of 800 mg of caffeine in a small, sleek package. Made from all-natural explosive limes!",
      colorClass: "bg-green-300"
    },
    cherrybomb: {
      title: "Cherry Bomb",
      description:
        "Feel the combustive power of 800 mg of caffeine in a small, sleek package. Made from all-natural cherry bombs!",
      colorClass: "bg-red-300"
    }
  };

  static flavorImgElement;
  static flavorTitleElement;
  static flavorDescriptionElement;
  static buttonAddElement;

  static currentFlavor = "blueraz";

  static initializeFlavors() {
    let flavorButtons = document.querySelectorAll(
      Selection.FLAVOR_BUTTON_SELECTOR
    );
    flavorButtons.forEach((e) => {
      e.addEventListener("click", (e) => {
        let oldFlavor = Selection.currentFlavor;
        Selection.currentFlavor = e.target.getAttribute(
          Selection.FLAVOR_OPTION_ATTRIBUTE
        );
        Selection.updateFlavor(oldFlavor);
      });
    });
    Selection.flavorImgElement = document.querySelector(
      Selection.FLAVOR_IMAGE_SELECTOR
    );
    Selection.flavorTitleElement = document.querySelector(
      Selection.FLAVOR_TITLE_SELECTOR
    );
    Selection.flavorDescriptionElement = document.querySelector(
      Selection.FLAVOR_DESCRIPTION_SELECTOR
    );
    document
      .querySelector('[data-button-minus="order"]')
      .addEventListener("click", (e) => {
        let element = document.querySelector('[data-button-quantity="order"]');
        if (element.value > 1) element.value--;
      });
    document
      .querySelector('[data-button-plus="order"]')
      .addEventListener("click", (e) => {
        document.querySelector('[data-button-quantity="order"]').value++;
      });
    Selection.buttonAddElement = document.querySelector(
      Selection.BUTTON_ADD_SELECTOR
    );
    Selection.buttonAddElement.addEventListener("click", (e) => {
      Cart.order[Selection.currentFlavor] = parseInt(
        Cart.order[Selection.currentFlavor]
      );
      Cart.order[Selection.currentFlavor] += parseInt(
        document.querySelector('[data-button-quantity="order"]').value
      );
      Checkout.closeCheckoutModal();
      Cart.openCartModal();
    });
    Selection.updateFlavor();
  }

  static updateFlavor(oldFlavor) {
    let flavorData = Selection.FLAVORS[Selection.currentFlavor];

    Selection.flavorImgElement.style.setProperty(
      "background-image",
      `url(images/${Selection.currentFlavor}.png)`
    );
    if (oldFlavor) {
      Selection.flavorImgElement.parentElement.classList.remove(
        Selection.FLAVORS[oldFlavor].colorClass
      );
    }
    Selection.flavorImgElement.parentElement.classList.add(
      flavorData.colorClass
    );
    Selection.flavorTitleElement.innerText = flavorData.title;
    Selection.flavorDescriptionElement.innerText = flavorData.description;
  }
}
