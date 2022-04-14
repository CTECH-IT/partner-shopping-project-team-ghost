export class DataStore {
  static DB_URL = "http://saturn.rochesterschools.org:8080/json";
  static DB_KEY = "ghost-energy";
  static DEFAULT_ENTRY = {
    emailAddress: DataStore.DB_KEY,
    orders: [],
    discounts: []
  };

  static $ = window.jQuery;
  static DB = DataStore.pull();

  static pull() {
    let content;
    DataStore.$.get(
      DataStore.DB_URL + "?emailAddress=" + DataStore.DB_KEY,
      (res) => {
        content = res;
      }
    );
    if (content) content = content.map((e) => JSON.parse(e));
    return content || DataStore.DEFAULT_ENTRY;
  }

  static push(newDB) {
    DataStore.$.post(
      DataStore.DB_URL,
      newDB.map((e) => JSON.parse(e)) || DataStore.DB.map((e) => JSON.parse(e)),
      (res) => console.log(res)
    );
  }

  static get(key) {
    return DataStore.DB[key];
  }

  static set(key, val) {
    DataStore.DB[key] = val;
  }
}
