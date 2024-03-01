"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_CustomNavBar2 = common_vendor.resolveComponent("CustomNavBar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_CommonTitle2 = common_vendor.resolveComponent("CommonTitle");
  const _easycom_ThemeItem2 = common_vendor.resolveComponent("ThemeItem");
  (_easycom_CustomNavBar2 + _easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_CommonTitle2 + _easycom_ThemeItem2)();
}
const _easycom_CustomNavBar = () => "../../components/CustomNavBar/CustomNavBar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_CommonTitle = () => "../../components/CommonTitle/CommonTitle.js";
const _easycom_ThemeItem = () => "../../components/ThemeItem/ThemeItem.js";
if (!Math) {
  (_easycom_CustomNavBar + _easycom_uni_icons + _easycom_uni_dateformat + _easycom_CommonTitle + _easycom_ThemeItem)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_assets._imports_0,
    b: common_assets._imports_1,
    c: common_assets._imports_2,
    d: common_vendor.p({
      type: "sound-filled",
      size: "20"
    }),
    e: common_vendor.p({
      type: "right",
      size: "20"
    }),
    f: common_vendor.p({
      type: "calendar",
      size: "20"
    }),
    g: common_vendor.p({
      date: Date.now(),
      format: "dd日"
    }),
    h: common_vendor.f(8, (item, k0, i0) => {
      return {};
    }),
    i: common_assets._imports_0$1,
    j: common_vendor.f(8, (item, k0, i0) => {
      return {
        a: "1cf27b2a-7-" + i0
      };
    }),
    k: common_vendor.p({
      isMore: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
