"use strict";
const common_vendor = require("../common/vendor.js");
const useDataStore = common_vendor.defineStore("dataStore", {
  state: () => {
    return { classify: [], wall: [] };
  },
  actions: {
    /** 写入壁纸大分类 */
    setClassifyData(data) {
      this.classify = data || [];
    },
    /** 写入分类中壁纸列表（分类详情） */
    setWallData(data) {
      this.wall = data || [];
    }
  }
});
exports.useDataStore = useDataStore;
