import { DataStore } from "./DataStore.js";

let orders;
let newCard;

window.DataStore = DataStore;
initialize();

async function initialize() {
  DataStore.get("orders").then(async (res) => {
    orders = res;
    newCard = await getNewCard();
    update(true);
  }, async () => {
    let noInternet = await getNoInternet();
    document.querySelector("[data-admin-orders]").innerHTML = noInternet;
  })
}

async function getNewCard() {
  return await (await fetch("../ordercard.html")).text();
}

async function getNoInternet() {
  return await (await fetch("../nointernet.html")).text();
}

async function update(force) {
  let checkNew = await DataStore.get("orders");
  if (checkNew.length != orders.length || force) {
    console.log("New database changes, updating panel...");
    orders = checkNew;
    document.querySelector("[data-admin-orders]").innerHTML = "";
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
          updateSadness();
        });
      });
    });
    updateSadness();
  }
  setTimeout(() => update(), 100);
}

function updateSadness() {
  if (!document.querySelector("[data-card]")) {
    let sadness = document.createElement("span");
    sadness.innerText =
      "No orders yet. You must coerce more customers to fall for your sca-- I mean, buy your product.";
    document.querySelector("[data-admin-orders]").appendChild(sadness);
  }
}
