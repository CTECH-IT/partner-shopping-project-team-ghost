export class DataStore {
  static #DB_URL = "http://saturn.rochesterschools.org:8080/json";
  static #$ = window.jQuery;

  static set(key, val) {
    this.#$.post(this.#DB_URL, val);
  }
}