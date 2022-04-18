import { DataStore } from "./DataStore.js";
import { Selection } from "./Selection.js";
import { Cart } from "./Cart.js";
import { Checkout } from "./Checkout.js";

window.DataStore = DataStore;
window.Selection = Selection;
Cart.initializeCart();
Checkout.initializeCheckout();
Selection.initializeFlavors();
