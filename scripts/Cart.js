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
    Cart.cartContinueElement = document.querySelector(
      Cart.CART_CONTINUE_SELECTOR
    );
    Cart.cartContinueElement.addEventListener("click", (e) => {
      Cart.closeCartModal();
      Checkout.openCheckoutModal();
    });
  }

  static openCartModal() {
    Cart.cartModalElement.classList.remove("-translate-x-full");
  }

  static closeCartModal() {
    Cart.cartModalElement.classList.add("-translate-x-full");
  }
}
