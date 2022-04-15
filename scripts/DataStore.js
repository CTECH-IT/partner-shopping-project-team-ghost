export class DataStore {
  static DB_URL = "http://saturn.rochesterschools.org:8080/json";
  static DB_KEY = "ghost-energy";
  static DEFAULT_ENTRY = {
    emailAddress: DataStore.DB_KEY,
    orders: [],
    discounts: [],
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
    if (content) {
      content = DataStore.parseEachToJSON(content);
    }
    return content || DataStore.DEFAULT_ENTRY;
  }

  static push(newDB) {
    DataStore.$.post(
      DataStore.DB_URL,
      DataStore.parseEachToString(newDB) || DataStore.parseEachToString(DataStore.DB),
      (res) => console.log(res)
    );
  }

  static get(key) {
    return DataStore.DB[key];
  }

  static set(key, val) {
    DataStore.DB[key] = val;
  }

  static parseEachToString(json) {
    json.keys.forEach((k) => {
      json[k] = JSON.stringify(json[k]);
    });
    return json;
  }

  static parseEachToJSON(json) {
    json.keys.forEach((k) => {
      json[k] = JSON.parse(json[k]);
    });
    return json;
  }
}
