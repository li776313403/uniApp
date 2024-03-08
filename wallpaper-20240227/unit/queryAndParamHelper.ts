/** @description: 地址栏参数帮助类 */
const queryAndParamHelper = {
  /**
   * @description: 参数JSON对象转换url处理-解码
   * @param {any} params 参数
   * @return {*} 字符串
   */
  tansParams: (params: object): string => {
    let result = '';
    for (const propName of Object.keys(params)) {
      const value = params[propName];
      const part = encodeURIComponent(propName) + '=';
      if (value !== null && typeof value !== 'undefined') {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            if (value[key] !== null && typeof value[key] !== 'undefined') {
              const params = propName + '[' + key + ']';
              const subPart = encodeURIComponent(params) + '=';
              result += subPart + encodeURIComponent(value[key]) + '&';
            }
          }
        } else {
          result += part + encodeURIComponent(value) + '&';
        }
      }
    }
    return result;
  },
  /**
   * @description: 地址栏参数转换为对象
   * @param {string} url 地址
   * @return {*} 对象
   */
  param2Obj: <T>(url: string): T => {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
    const obj = {} as T;

    if (search) {
      const searchArr = search.split('&');
      searchArr.forEach((v) => {
        const index = v.indexOf('=');
        if (index !== -1) {
          const name = v.substring(0, index);
          obj[name] = v.substring(index + 1, v.length);
        }
      });
    }

    return obj;
  },
  /**
   * @description: 获取地址栏参数
   * @param {string} url 参数地址(可为空)
   * @return {*} json对象
   */
  getQueryObject: (url: string | null): Record<string, string> => {
    url = url == null ? window.location.href : url;
    const search = url.substring(url.lastIndexOf('?') + 1);
    const obj: Record<string, string> = {};
    const reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs, $1, $2) => {
      const name = decodeURIComponent($1);
      let val = decodeURIComponent($2);
      val = String(val);
      obj[name] = val;
      return rs;
    });
    return obj;
  }
};

export default queryAndParamHelper;
