"use strict";
const common_vendor = require("../common/vendor.js");
const useBaseStore = common_vendor.defineStore("baseStore", {
  state: () => {
    return { systemInfo: null, menuButton: null };
  },
  actions: {
    set({ key, value }) {
      const self = this;
      if (Object.prototype.hasOwnProperty.call(self, key)) {
        self[key] = value;
      }
    }
  }
});
exports.useBaseStore = useBaseStore;
