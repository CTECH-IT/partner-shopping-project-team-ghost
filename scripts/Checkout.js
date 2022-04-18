import { DataStore } from "./DataStore.js";

export class Checkout {
  static CHECKOUT_MODAL_ATTRIBUTE = "data-checkout-modal";
  static CHECKOUT_MODAL_SELECTOR = `[${Checkout.CHECKOUT_MODAL_ATTRIBUTE}]`;

  static checkoutModalElement;

  static initializeCheckout() {
    Checkout.checkoutModalElement = document.querySelector(
      Checkout.CHECKOUT_MODAL_SELECTOR
    );
    Checkout.checkoutModalElement.addEventListener((e) => {
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
    order.cc.n = document.querySelector("data-checkout-cc-n");
    order.cc.e = document.querySelector("data-checkout-cc-e");
    order.cc.c = document.querySelector("data-checkout-cc-c");
    DataStore.set("orders", DataStore.get("orders").push(order));
    DataStore.push();
    Checkout.closeCheckoutModal();
  }
}
