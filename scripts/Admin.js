import { DataStore } from "./DataStore.js";

run();

async function run() {
  window.DataStore = DataStore;
  let orders = await DataStore.get("orders");
  let newCard = await getNewCard();
  orders.forEach((e, i) => {
    let orderCard = document.createElement("div");
    orderCard.setAttribute("data-card", i);
    orderCard.innerHTML = newCard;
    document.querySelector("[data-admin-orders]").appendChild(orderCard);
  });
  document.querySelectorAll("[data-card]").forEach((e, i) => {
    let order = orders[i];
    e.querySelector("[data-card-name]").innerText = order.name;
    e.querySelector("[data-card-phone]").innerText = order.phone;
    e.querySelector("[data-card-address]").innerText = order.address;
    e.querySelector("[data-card-blueraz]").innerText = order.order.blueraz;
    e.querySelector("[data-card-cherrybomb]").innerText =
      order.order.cherrybomb;
    e.querySelector("[data-card-limesplosion]").innerText =
      order.order.limesplosion;
    e.querySelectorAll("[data-card-delete]").forEach((button) => {
      button.addEventListener("click", async (event) => {
        e.remove();
        let newOrders = await DataStore.get("orders");
        newOrders.splice(i, 1);
        DataStore.set("orders", newOrders);
        DataStore.push();
      });
    });
  });
}

async function getNewCard() {
  return await (await fetch("../ordercard.html")).text();
}
