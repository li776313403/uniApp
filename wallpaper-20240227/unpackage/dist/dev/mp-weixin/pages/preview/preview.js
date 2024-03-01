"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_dateformat2 + _easycom_uni_icons2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_uni_icons + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "preview",
  setup(__props) {
    const shwoInfoRef = common_vendor.ref(true);
    const dateNowRef = common_vendor.ref(Date.now());
    const timer = {
      date: null
    };
    const infoPanlRef = common_vendor.ref();
    const ratePanlRef = common_vendor.ref();
    const infoParamsRef = common_vendor.ref({
      _id: "",
      description: "",
      classid: "",
      smallPicurl: "",
      tabs: [],
      score: 0,
      nickname: ""
    });
    const startDatetime = () => {
      dateNowRef.value = Date.now();
      timer.date = setInterval(() => {
        dateNowRef.value = Date.now();
      }, 1e3);
    };
    const stopDatetime = () => {
      timer.date && clearInterval(timer.date);
    };
    const imageClick = () => {
      shwoInfoRef.value = !shwoInfoRef.value;
    };
    const showInfoClick = () => {
      infoPanlRef.value.open();
    };
    const closeInfoPopupClick = () => {
      infoPanlRef.value.close();
    };
    const showRateClick = () => {
      ratePanlRef.value.open();
    };
    const closeRateClick = () => {
      ratePanlRef.value.close();
    };
    const rateSubmitClick = () => {
    };
    common_vendor.onShow(() => {
      startDatetime();
    });
    common_vendor.onHide(() => {
      stopDatetime();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(3, (item, index, i0) => {
          return {};
        }),
        b: common_assets._imports_0$2,
        c: common_vendor.o(imageClick),
        d: common_vendor.p({
          date: dateNowRef.value,
          format: "hh : mm"
        }),
        e: common_vendor.p({
          date: dateNowRef.value,
          format: "MM月dd日"
        }),
        f: common_vendor.p({
          type: "info",
          size: "28"
        }),
        g: common_vendor.o(showInfoClick),
        h: common_vendor.p({
          type: "star",
          size: "28"
        }),
        i: common_vendor.o(showRateClick),
        j: common_vendor.p({
          type: "download",
          size: "28"
        }),
        k: shwoInfoRef.value,
        l: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        m: common_vendor.o(closeInfoPopupClick),
        n: common_vendor.p({
          readonly: true,
          ["allow-half"]: true,
          touchable: false
        }),
        o: common_vendor.sr(infoPanlRef, "2dad6c07-5", {
          "k": "infoPanlRef"
        }),
        p: common_vendor.p({
          type: "bottom"
        }),
        q: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        r: common_vendor.o(closeRateClick),
        s: common_vendor.o(($event) => infoParamsRef.value.score = $event),
        t: common_vendor.p({
          ["allow-half"]: true,
          touchable: true,
          modelValue: infoParamsRef.value.score
        }),
        v: common_vendor.t(infoParamsRef.value.score),
        w: common_vendor.o(rateSubmitClick),
        x: infoParamsRef.value.score === 0,
        y: common_vendor.sr(ratePanlRef, "2dad6c07-8", {
          "k": "ratePanlRef"
        }),
        z: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/pages/preview/preview.vue"]]);
wx.createPage(MiniProgramPage);
