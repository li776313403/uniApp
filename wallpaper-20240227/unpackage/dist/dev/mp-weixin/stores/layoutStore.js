"use strict";
const common_vendor = require("../common/vendor.js");
const useLayoutStore = common_vendor.defineStore("layoutStore", {
  state: () => {
    return { statusBarHeight: 0, menuButtonHeight: 0, headHeight: 0, dy_TitleLeftIconDistance: 0 };
  },
  actions: {
    /** 写入状态栏高度 */
    setStatusBarHeight(data) {
      this.statusBarHeight = data;
    },
    /** 写入小程序下菜单按钮高度 */
    setMenuButtonHeight(data) {
      this.menuButtonHeight = data;
    },
    /** 写入状态栏和小程序按钮的高度 */
    setHeadHeight(data) {
      this.headHeight = data;
    },
    /** 写入抖音小程序头部左侧logo左侧边距 */
    setDy_TitleLeftIconDistance(data) {
      this.dy_TitleLeftIconDistance = data;
    }
  }
});
exports.useLayoutStore = useLayoutStore;
