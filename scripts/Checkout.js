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
    Checkout.checkoutModalElement.addEventListener("click", (e) => {
      Checkout.checkOut();
    });
  }

  static openCheckoutModal() {
    Checkout.checkoutModalElement.classList.remove("-translate-x-full");
  }

  static closeCheckoutModal() {
    Checkout.checkoutModalElement.classList.add("-translate-x-full");
  }

  static checkOut() {
    let order = {};
    order.order = Cart.order;
    order.name = document.querySelector("data-checkout-name");
    order.phone = document.querySelector("data-checkout-phone");
    order.address = document.querySelector("data-checkout-address");
    order.state = document.querySelector("data-checkout-state");
    order.zip = document.querySelector("data-checkout-zip");
    order.ccn = document.querySelector("data-checkout-cc-n");
    order.cce = document.querySelector("data-checkout-cc-e");
    order.ccc = document.querySelector("data-checkout-cc-c");
    let orders = DataStore.get("orders");
    orders.push(order);
    DataStore.set("orders", orders);
    DataStore.push();
    Checkout.closeCheckoutModal();
  }
}
