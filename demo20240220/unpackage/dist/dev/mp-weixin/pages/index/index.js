"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const messageRef = common_vendor.ref(null);
    const messageText = common_vendor.ref("");
    common_vendor.onReachBottom(() => {
      messageText.value = "到底了";
      messageRef.value && messageRef.value.open();
    });
    const showModal = () => {
      common_vendor.index.showModal({
        title: "是否跳转到分类？",
        content: "",
        placeholderText: "请输入分类名称",
        editable: true,
        success(res) {
          if (res.confirm) {
            if (res.content) {
              common_vendor.index.switchTab({
                url: "/pages/classification/index"
              });
            }
          }
        }
      });
    };
    const showActionSheet = () => {
      common_vendor.index.showActionSheet({
        itemList: ["分类1", "分类2", "分类3"],
        title: "请选择分类",
        itemColor: "#4cd964",
        alertText: "选择后会进行跳转",
        success(res) {
          common_vendor.index.showToast({
            title: "跳转到分类" + res.tapIndex,
            icon: "success",
            success() {
              common_vendor.index.switchTab({
                url: "/pages/classification/index"
              });
            }
          });
        }
      });
    };
    const setNavigationBarTitle = () => {
      common_vendor.index.setNavigationBarTitle({
        title: "动态标题"
      });
      common_vendor.index.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#18bc37",
        animation: {
          duration: 3e3,
          timingFunc: "easeOut"
        }
      });
      common_vendor.index.showNavigationBarLoading();
      setTimeout(() => common_vendor.index.hideNavigationBarLoading(), 3e3);
    };
    const setTabBarBadge = () => {
      common_vendor.index.setTabBarBadge({
        index: 0,
        text: "1"
      });
    };
    const removeTabBarBadge = () => {
      common_vendor.index.removeTabBarBadge({
        index: 0
      });
    };
    const showTabBarRedDot = () => {
      common_vendor.index.showTabBarRedDot({
        index: 0
      });
    };
    const hideTabBarRedDot = () => {
      common_vendor.index.hideTabBarRedDot({
        index: 0
      });
    };
    common_vendor.onShow(() => {
      common_vendor.index.showToast({
        title: "进入首页",
        icon: "success"
      });
    });
    common_vendor.onHide(() => {
      common_vendor.index.showToast({
        title: "离开首页",
        icon: "error"
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(showModal),
        b: common_vendor.o(showActionSheet),
        c: common_vendor.o(setNavigationBarTitle),
        d: common_vendor.o(setTabBarBadge),
        e: common_vendor.o(removeTabBarBadge),
        f: common_vendor.o(showTabBarRedDot),
        g: common_vendor.o(hideTabBarRedDot),
        h: common_vendor.p({
          type: "warning",
          message: messageText.value,
          duration: 2e3
        }),
        i: common_vendor.sr(messageRef, "1cf27b2a-0", {
          "k": "messageRef"
        }),
        j: common_vendor.p({
          type: "message"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/code/demo/uniApp/demo20240220/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
