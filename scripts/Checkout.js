import { DataStore } from "./DataStore.js";
import { Cart } from "./Cart.js";

export class Checkout {
  static CHECKOUT_MODAL_ATTRIBUTE = "data-checkout-modal";
  static CHECKOUT_MODAL_SELECTOR = `[${Checkout.CHECKOUT_MODAL_ATTRIBUTE}]`;

  static checkoutModalElement;

  static initializeCheckout() {
    Checkout.checkoutModalElement = document.querySelector(
      Checkout.CHECKOUT_MODAL_SELECTOR
    );
    document
      .querySelector("[data-checkout-confirm]")
      .addEventListener("click", () => {
        document.querySelectorAll("form [required]").forEach((e) => {
          e.classList.add("required");
        });
      });
    document
      .querySelector("[data-checkout-modal]")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        Checkout.checkOut();
      });
  }

  static openCheckoutModal() {
    Checkout.checkoutModalElement.classList.remove("-translate-x-full");
  }

  static closeCheckoutModal() {
    Checkout.checkoutModalElement.classList.add("-translate-x-full");
  }

  static async checkOut() {
    let order = {};
    order.order = Cart.order;
    order.name = document.querySelector("[data-checkout-name]").value;
    order.phone = document.querySelector("[data-checkout-phone]").value;
    order.address = document.querySelector("[data-checkout-address]").value;
    order.state = document.querySelector("[data-checkout-state]").value;
    order.zip = document.querySelector("[data-checkout-zip]").value;
    order.ccn = document.querySelector("[data-checkout-cc-n]").value;
    order.cce = document.querySelector("[data-checkout-cc-e]").value;
    order.ccc = document.querySelector("[data-checkout-cc-c]").value;
    let orders = await DataStore.get("orders");
    orders.push(order);
    DataStore.pull();
    DataStore.set("orders", orders);
    DataStore.push();
    Checkout.closeCheckoutModal();
  }
}
