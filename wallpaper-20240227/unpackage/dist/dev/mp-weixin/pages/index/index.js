"use strict";
const common_vendor = require("../../common/vendor.js");
const api_wallpaper = require("../../api/wallpaper.js");
const stores_dataStore = require("../../stores/dataStore.js");
require("../../unit/request.js");
require("../../unit/basicData.js");
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
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const dataStore = stores_dataStore.useDataStore();
    const dataRef = common_vendor.ref({
      /** banner数据 */
      banner: [],
      /** 壁纸资讯公告数据 */
      wallNews: [],
      /** 每日推介数据 */
      dailyPromotion: []
    });
    const classifyComputed = common_vendor.computed({
      get: () => dataStore.classify,
      set: (val) => dataStore.setClassifyData(val)
    });
    const getBanner = () => {
      api_wallpaper.getHomeBanner().then((res) => {
        if (res.errCode === 0) {
          dataRef.value.banner = res.data.sort((p) => p.sort);
        } else {
          common_vendor.index.showToast({
            title: "获取banner数据失败",
            icon: "error"
          });
          console.error("获取banner数据失败", res.errMsg);
        }
      }).catch((ex) => {
        common_vendor.index.showToast({
          title: "获取banner数据失败",
          icon: "error"
        });
        console.error("获取banner数据失败", ex);
      });
    };
    const getWallNews = () => {
      const params = {
        select: true,
        pageNum: 1,
        pageSize: 3
      };
      api_wallpaper.getWallNews(params).then((res) => {
        if (res.errCode === 0) {
          dataRef.value.wallNews = res.data;
        } else {
          common_vendor.index.showToast({
            title: "获取壁纸资讯公告数据失败",
            icon: "error"
          });
          console.error("获取壁纸资讯公告数据失败", res.errMsg);
        }
      }).catch((ex) => {
        common_vendor.index.showToast({
          title: "获取壁纸资讯公告数据失败",
          icon: "error"
        });
        console.error("获取壁纸资讯公告数据失败", ex);
      });
    };
    const getDailyPromotion = () => {
      api_wallpaper.getDailyPromotion().then((res) => {
        if (res.errCode === 0) {
          dataRef.value.dailyPromotion = res.data;
        } else {
          common_vendor.index.showToast({
            title: "获取每日推介数据失败",
            icon: "error"
          });
          console.error("获取每日推介数据失败", res.errMsg);
        }
      }).catch((ex) => {
        common_vendor.index.showToast({
          title: "获取每日推介数据失败",
          icon: "error"
        });
        console.error("获取每日推介数据失败", ex);
      });
    };
    const getClassify = () => {
      const params = {
        select: true,
        pageNum: 1,
        pageSize: 3
      };
      api_wallpaper.getClassify(params).then((res) => {
        if (res.errCode === 0) {
          classifyComputed.value = res.data.sort((p) => p.sort);
        } else {
          common_vendor.index.showToast({
            title: "获取壁纸大分类数据失败",
            icon: "error"
          });
          console.error("获取壁纸大分类数据失败", res.errMsg);
        }
      }).catch((ex) => {
        common_vendor.index.showToast({
          title: "获取壁纸大分类数据失败",
          icon: "error"
        });
        console.error("获取壁纸大分类数据失败", ex);
      });
    };
    const previewClick = () => {
      common_vendor.index.navigateTo({
        url: "/pages/preview/preview"
      });
    };
    common_vendor.onLoad(() => {
      getBanner();
      getWallNews();
      getDailyPromotion();
      getClassify();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(dataRef.value.banner, (item, k0, i0) => {
          return {
            a: item.picurl,
            b: item._id
          };
        }),
        b: common_vendor.p({
          type: "sound-filled",
          size: "20"
        }),
        c: common_vendor.f(dataRef.value.wallNews, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item._id
          };
        }),
        d: common_vendor.p({
          type: "right",
          size: "20"
        }),
        e: common_vendor.p({
          type: "calendar",
          size: "20"
        }),
        f: common_vendor.p({
          date: Date.now(),
          format: "dd日"
        }),
        g: common_vendor.f(dataRef.value.dailyPromotion, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: item._id,
            c: common_vendor.o(previewClick, item._id)
          };
        }),
        h: common_vendor.f(classifyComputed.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "1cf27b2a-7-" + i0,
            c: common_vendor.p({
              classIfy: item
            })
          };
        }),
        i: common_vendor.p({
          isMore: true
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/code/demo/uniApp/wallpaper-20240227/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
