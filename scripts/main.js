import { DataStore } from "./DataStore.js";
import { Selection } from "./Selection.js";
import { Cart } from "./Cart.js";

window.DataStore = DataStore;
window.Selection = Selection;
Cart.initializeCart();
Selection.initializeFlavors();
