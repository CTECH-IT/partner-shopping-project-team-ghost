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
    if (content) {
      content = DataStore.parseEachToJSON(content);
    }
    return content || DataStore.DEFAULT_ENTRY;
  }

  static push(newDB) {
    if (newDB) {
      newDB = DataStore.parseEachToString(newDB);
    } else {
      newDB = DataStore.parseEachToString(DataStore.DB);
    }
    DataStore.$.post(DataStore.DB_URL, newDB, (res) => console.log(res));
  }

  static get(key) {
    return DataStore.DB[key];
  }

  static set(key, val) {
    DataStore.DB[key] = val;
  }

  static parseEachToString(json) {
    let newJSON = { emailAddress: DataStore.DB_KEY };
    Object.keys(json).forEach((k) => {
      if (k != "emailAddress") newJSON[k] = JSON.stringify(json[k]);
    });
    return newJSON;
  }

  static parseEachToJSON(json) {
    let newJSON = { emailAddress: DataStore.DB_KEY };
    Object.keys(json).forEach((k) => {
      if (k != "emailAddress") newJSON[k] = JSON.parse(json[k]);
    });
    return newJSON;
  }
}
