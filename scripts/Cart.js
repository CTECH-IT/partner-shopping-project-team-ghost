import { Checkout } from "./Checkout.js";
export class Cart {
  static CART_MODAL_ATTRIBUTE = "data-cart-modal";
  static CART_CONTINUE_ATTRIBUTE = "data-cart-continue";
  static CART_MODAL_SELECTOR = `[${Cart.CART_MODAL_ATTRIBUTE}]`;
  static CART_CONTINUE_SELECTOR = `[${Cart.CART_CONTINUE_ATTRIBUTE}]`;

  static cartModalElement;
  static cartContinueElement;

  static order = {
    blueraz: 0,
    cherrybomb: 0,
    limesplosion: 0
  };

  static initializeCart() {
    Cart.cartModalElement = document.querySelector(Cart.CART_MODAL_SELECTOR);
    document.querySelector("[data-nav-cart]").addEventListener("click", () => {
      Cart.toggleCartModal();
      Checkout.closeCheckoutModal();
    });
    document.querySelectorAll("[data-cart-minus]").forEach((button) => {
      button.addEventListener("click", (e) => {
        let element = document.querySelector(
          `[data-cart-quantity="${e.target.getAttribute("data-cart-minus")}"]`
        );
        if (element.value > 0) element.value--;
      });
    });
    document.querySelectorAll("[data-cart-plus]").forEach((button) => {
      button.addEventListener("click", (e) => {
        document.querySelector(
          `[data-cart-quantity="${e.target.getAttribute("data-cart-plus")}"]`
        ).value++;
      });
    });
    Cart.cartContinueElement = document.querySelector(
      Cart.CART_CONTINUE_SELECTOR
    );
    Cart.cartContinueElement.addEventListener("click", (e) => {
      document.querySelectorAll("[data-cart-quantity]").forEach((e) => {
        Cart.order[e.getAttribute("data-cart-quantity")] = e.value;
      });
      if (
        Cart.order["blueraz"] > 0 ||
        Cart.order["cherrybomb"] > 0 ||
        Cart.order["limesplosion"] > 0
      ) {
        Cart.closeCartModal();
        Checkout.openCheckoutModal();
      } else {
        window.alert("No")
      }
    });
  }

  static openCartModal() {
    document.querySelectorAll("[data-cart-quantity]").forEach((e) => {
      e.value = Cart.order[e.getAttribute("data-cart-quantity")];
    });
    Cart.cartModalElement.classList.remove("-translate-x-full");
  }

  static closeCartModal() {
    Cart.cartModalElement.classList.add("-translate-x-full");
  }

  static toggleCartModal() {
    if (Cart.cartModalElement.classList.contains("-translate-x-full")) {
      Cart.openCartModal();
    } else {
      Cart.closeCartModal();
    }
  }
}
