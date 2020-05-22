const DB = localStorage;

export default {
  DB,
  get(id) {
    const item = this.DB.getItem(id);

    if (item) {
      return JSON.parse(item);
    }
  },
  put(id, value) {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }

    this.DB.setItem(id, value);
  },
  delete(id) {
    this.DB.removeItem(id);
  }
}
