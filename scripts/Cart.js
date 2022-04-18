export class Cart {
  static CART_MODAL_ATTRIBUTE = "data-cart-modal";
  static CART_MODAL_SELECTOR = `[${Cart.CART_MODAL_ATTRIBUTE}]`;

  static cartModalElement;

  static order = {
    blueraz: 0,
    cherrybomb: 0,
    limesplosion: 0
  };

  static initializeCart() {
    Cart.cartModalElement = document.querySelector(Cart.CART_MODAL_SELECTOR);
  }

  static openCartModal() {
    Cart.cartModalElement.classList.remove("-translate-x-full");
  }
}
