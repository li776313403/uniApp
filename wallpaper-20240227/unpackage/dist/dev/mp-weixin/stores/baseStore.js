"use strict";
const common_vendor = require("../common/vendor.js");
const useBaseStore = common_vendor.defineStore("baseStore", {
  state: () => {
    return { systemInfo: null, menuButtonInfo: null };
  },
  actions: {
    /** 写入设备信息 */
    setSystemInfo(data) {
      this.systemInfo = data;
    },
    /** 写入小程序下菜单按钮的布局位置信息 */
    setMenuButtonInfo(data) {
      this.menuButtonInfo = data;
    }
  }
});
exports.useBaseStore = useBaseStore;
