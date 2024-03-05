"use strict";
const common_vendor = require("../common/vendor.js");
const unit_basicData = require("./basicData.js");
class Request {
  /**
   * 发起GET请求
   * @param options 请求参数
   * @returns Promise<Response>
   */
  static get(options) {
    return this.request({ ...options, method: "GET" });
  }
  /**
   * 发起POST请求
   * @param options 请求参数
   * @returns Promise<Response>
   */
  static post(options) {
    return this.request({ ...options, method: "POST" });
  }
  /**
   * 发起网络请求
   * @param options 请求参数
   * @returns Promise<Response>
   */
  static request(options) {
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: unit_basicData.basicData.network.baseApi + options.url,
        data: options.data,
        method: options.method,
        header: {
          "content-type": "application/json",
          "access-key": "189871"
        },
        dataType: options.dataType,
        responseType: options.responseType,
        success: (response) => {
          resolve(response.data);
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  }
}
exports.Request = Request;
