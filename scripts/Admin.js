import { DataStore } from "./DataStore.js";

run();

async function run() {
  window.DataStore = DataStore;
  let orders = await DataStore.get("orders");
  orders.forEach((order) => {
    let element = window.$("[data-admin-orders]").load("../ordercard.html");
  });
  document.querySelectorAll("[data-card]").forEach((e, i) => {
    e.querySelector("[data-card-name]").innerText = order.name;
    e.querySelector("[data-card-phone]").innerText = order.phone;
    e.querySelector("[data-card-address]").innerText = order.address;
    e.querySelector("[data-card-blueraz]").innerText = order.order.blueraz;
    e.querySelector("[data-card-cherrybomb]").innerText =
      order.order.cherrybomb;
    e.querySelector("[data-card-limesplosion]").innerText =
      order.order.limesplosion;
  });
}
