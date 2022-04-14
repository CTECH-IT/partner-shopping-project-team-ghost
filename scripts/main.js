import { DataStore } from "./DataStore.js";

window.DataStore = DataStore;
console.log(DataStore.get("orders"));
