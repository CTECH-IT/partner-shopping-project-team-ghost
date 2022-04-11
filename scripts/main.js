import { DataStore } from "./DataStore.js";

DataStore.pull();
console.log(DataStore.get("orders"));
