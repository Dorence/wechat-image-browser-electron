const storage = {
  /**
   * 保存数据到 Storage , 将数据转换为 JSON 字符串
   * @param {String} key 键
   * @param {*} value 值
   * @param {Number} expired expired time in minutes
   */
  set(key, value, expired) {
    if (!key) {
      throw 'storage 执行 set 方法，需要参数 key';
    }
    if (undefined === value) {
      throw 'storage 执行 set 方法，需要参数 value';
    }
    const val = JSON.stringify({
      data: value,
      expired: expired ? (Date.now() + 1000 * 60 * expired) : 0,
    });
    localStorage.setItem(key, val);
  },

  /**
   * 获取 Storage 中存储的数据，为空或者过期返回 null
   * @param {String} key key name
   */
  get(key) {
    if (!key) {
      throw 'storage 执行 get 方法，需要参数 key';
    }
    const str = localStorage.getItem(key);
    if (!str) {
      return null;
    }
    const value = JSON.parse(str);
    if (!value || !value.hasOwnProperty('expired')) {
      return null;
    }
    if (value.expired !== 0 && Date.now() >= value.expired) {
      localStorage.removeItem(key);
      return null;
    }
    return value.data || '';
  },

  /**
   * Remove data of given key in storage
   * @param {String} key key name
   */
  remove(key) {
    if (!key) {
      throw 'storage 执行 remove 方法，需要参数 key';
    }
    localStorage.removeItem(key);
  },

  /**
   * 清除 Storage 中全部数据
   */
  clear() {
    localStorage.clear();
  },
}

export default storage
