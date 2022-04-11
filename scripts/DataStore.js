export class DataStore {
  static DB_URL = "http://saturn.rochesterschools.org:8080/json";
  static DB_KEY = "ghost-energy";
  static DEFAULT_ENTRY = {
    emailAddress: this.DB_KEY,
    data: {
      orders: [],
      discounts: []
    }
  };

  static $ = window.jQuery;
  static DB;

  static pull() {
    let content;
    this.$.get(this.DB_URL + "?emailAddress=" + this.DB_KEY, (res) => {
      content = res;
    });
    return content || this.DEFAULT_ENTRY;
  }

  static push() {
    this.$.post(this.DB_URL, this.DB);
  }

  static get(key) {
    return this.DB.data[key];
  }

  static set(key, val) {
    this.DB.data[key] = val;
  }
}
