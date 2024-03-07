"use strict";
const numberHelper = {
  /**
   * @description: 分页序号递增
   * @param {number} index 当前索引
   * @param {object} form 分页信息
   * @return {*} 递增索引
   */
  indexMethod: (index, form) => {
    return (form.pageIndex - 1) * form.pageSize + index + 1;
  },
  zeroFill: (num) => {
    if (parseInt(num.toString(), 10) < 10) {
      return `0${num}`;
    } else {
      return num.toString();
    }
  }
};
exports.numberHelper = numberHelper;
