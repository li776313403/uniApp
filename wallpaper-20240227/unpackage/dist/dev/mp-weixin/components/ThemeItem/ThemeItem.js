"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const unit_dateHelper = require("../../unit/dateHelper.js");
require("../../unit/numberHelper.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "ThemeItem",
  props: {
    isMore: { type: Boolean },
    classIfy: {}
  },
  setup(__props) {
    const props = __props;
    const isMoreRef = common_vendor.ref(props.isMore || false);
    const classIfyRef = common_vendor.ref(props.classIfy || { _id: "", name: "", sort: 0, picurl: "", select: false, updateTime: 0 });
    const updateTimeComputed = common_vendor.computed(() => `+ ${unit_dateHelper.dateTimeHelper.formatTime(classIfyRef.value.updateTime)}更新`);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isMoreRef.value
      }, !isMoreRef.value ? {
        b: classIfyRef.value.picurl,
        c: common_vendor.t(classIfyRef.value.name),
        d: common_vendor.t(updateTimeComputed.value),
        e: `/pages/classList/classList?classId=${classIfyRef.value._id}&className=${classIfyRef.value.name}`
      } : {}, {
        f: isMoreRef.value
      }, isMoreRef.value ? {
        g: common_assets._imports_0,
        h: common_vendor.p({
          type: "more-filled",
          size: "34",
          color: "#fff"
        })
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-55c02e95"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/components/ThemeItem/ThemeItem.vue"]]);
wx.createComponent(Component);
