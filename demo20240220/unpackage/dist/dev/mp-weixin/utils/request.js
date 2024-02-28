"use strict";
const common_vendor = require("../common/vendor.js");
class HttpRequest {
  constructor(base_url = "") {
    /** 基础访问路径 */
    this.baseURL = "";
    this.baseURL = base_url;
  }
  get(params) {
    params.method = "GET";
    return this.request(params);
  }
  post(params) {
    params.method = "POST";
    return this.request(params);
  }
  put(params) {
    params.method = "PUT";
    return this.request(params);
  }
  delete(params) {
    params.method = "DELETE";
    return this.request(params);
  }
  request(params) {
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: this.baseURL + params.url,
        method: params.method || "GET",
        data: params.data || {},
        timeout: params.timeout || 10 * 1e3,
        header: {
          "content-type": "application/json",
          ...params.header || {}
        },
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        },
        fail: (err) => {
          reject(err);
        },
        complete: params.complete
      });
    });
  }
}
exports.HttpRequest = HttpRequest;
