"use strict";
const common_vendor = require("../common/vendor.js");
const useDataStore = common_vendor.defineStore("dataStore", {
  state: () => {
    return {
      classify: [],
      wall: [],
      userInfo: {
        IP: "0.0.0.0",
        downloadSize: 0,
        scoreSize: 0,
        address: {
          country: "",
          province: "",
          city: ""
        }
      }
    };
  },
  actions: {
    /** 写入壁纸大分类 */
    setClassifyData(data) {
      this.classify = data || [];
    },
    /** 写入分类中壁纸列表（分类详情） */
    setWallData(data) {
      this.wall = data || [];
    },
    /** 写入个人信息 */
    setUserInfo(data) {
      this.userInfo = data || {
        IP: "0.0.0.0",
        downloadSize: 0,
        scoreSize: 0,
        address: {
          country: "",
          province: "",
          city: ""
        }
      };
    }
  }
});
exports.useDataStore = useDataStore;
