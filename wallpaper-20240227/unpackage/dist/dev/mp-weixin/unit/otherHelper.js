"use strict";
const common_vendor = require("../common/vendor.js");
const otherHelper = {
  /** 跳转到首页 */
  goIndex: () => {
    return common_vendor.index.switchTab({
      url: "/pages/index/index"
    });
  }
};
exports.otherHelper = otherHelper;
