"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_segmented_control2 + _easycom_uni_icons2 + _easycom_uni_load_more2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_icons + _easycom_uni_load_more)();
}
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const request = new utils_request.HttpRequest("https://tea.qingnian8.com");
    let screenHeight = 0;
    const dataRef = common_vendor.ref([]);
    const showRightBtnsRef = common_vendor.ref(false);
    const segmentedControlRef = common_vendor.ref({
      items: ["全部", "猫", "狗"],
      values: ["all", "cat", "dog"],
      current: 0
    });
    const petTypeComputed = common_vendor.computed(() => segmentedControlRef.value.values[segmentedControlRef.value.current]);
    const getImages = async (type = 0) => {
      await request.get({
        url: "/tools/petShow",
        data: { size: 5, type: petTypeComputed.value },
        header: {
          "access-key": "690855"
        }
      }).then((res) => {
        let data;
        if (res.errCode === 0) {
          data = res.data.length > 0 ? res.data : [];
        } else {
          common_vendor.index.showToast({
            icon: "error",
            title: "接口加载失败"
          }).finally(() => {
            data = [];
            console.error("接口请求失败", res.errMsg);
          });
        }
        if (type === 0) {
          dataRef.value = data;
        } else {
          dataRef.value = dataRef.value.concat(data);
        }
      }).catch((ex) => {
        common_vendor.index.showToast({
          title: "接口请求失败",
          icon: "error"
        }).finally(() => {
          dataRef.value = [];
          console.error("接口请求失败", ex.errMsg);
        });
      });
    };
    const previewClick = (imageItem) => {
      common_vendor.index.previewImage({
        urls: dataRef.value.map((p) => p.url),
        current: imageItem.url
      });
    };
    const refreshClick = () => common_vendor.index.startPullDownRefresh();
    const backTopClick = () => common_vendor.index.pageScrollTo({ scrollTop: 0 });
    const getScreenHeight = () => {
      common_vendor.index.getSystemInfo({
        success: (res) => {
          screenHeight = res.screenHeight;
        }
      });
    };
    const segmentedControlClick = (e) => {
      segmentedControlRef.value.current = e.currentIndex;
      getImages();
    };
    common_vendor.onReady(() => {
      getImages();
      getScreenHeight();
    });
    common_vendor.onPullDownRefresh(() => {
      getImages().finally(() => common_vendor.index.stopPullDownRefresh());
    });
    common_vendor.onPageScroll((e) => {
      showRightBtnsRef.value = !(screenHeight > e.scrollTop);
    });
    common_vendor.onReachBottom(() => {
      getImages(1);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(segmentedControlClick),
        b: common_vendor.p({
          current: segmentedControlRef.value.current,
          values: segmentedControlRef.value.items,
          styleType: "button",
          activeColor: "#00aa00"
        }),
        c: common_vendor.f(dataRef.value, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.o(($event) => previewClick(item), item._id),
            c: common_vendor.t(`${index + 1}.${item.content}`),
            d: common_vendor.t(`${item.author}-${item.source}`),
            e: item._id
          };
        }),
        d: common_vendor.p({
          type: "refresh-filled",
          size: "40",
          color: "white"
        }),
        e: common_vendor.o(refreshClick),
        f: common_vendor.p({
          type: "arrow-up",
          size: "40",
          color: "white"
        }),
        g: common_vendor.o(backTopClick),
        h: showRightBtnsRef.value,
        i: common_vendor.p({
          status: "loading"
        })
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 1;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-53149db2"], ["__file", "D:/code/demo/uniApp/demo20240220/pages/classification/index.vue"]]);
wx.createPage(MiniProgramPage);
