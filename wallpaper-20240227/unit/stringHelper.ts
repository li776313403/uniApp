/** @description: 字符串相关帮助类 */
const stringHelper = {
  /**
    * @description: 转换字符串，undefined,null等转化为""
    * @param {string} str 字符串
    * @return {*} 处理后的字符串
    */
  parseStrEmpty: (str: string): string => {
    if (!str || str === 'undefined' || str === 'null') {
      return '';
    }
    return str;
  },
  /**
   * @description: 返回项目路径
   * @param {string} p 地址
   * @return {*} 项目路径
   */
  getNormalPath: (p: string): string => {
    if (p.length === 0 || !p || p === 'undefined') {
      return p;
    }
    const res = p.replace('//', '/');
    if (res[res.length - 1] === '/') {
      return res.slice(0, res.length - 1);
    }
    return res;
  },
  /**
   * @description: 获取唯一字符串
   * @return {*} 字符串
   */
  createUniqueString: (): string => {
    const timestamp = Number(new Date());
    const randomNum = parseInt(((1 + Math.random()) * 65536).toString(), 10);
    return Number(randomNum + timestamp).toString(32);
  },
  /**
   * @description: 首字母大写
   * @param {string} str 字符串
   * @return {*} 转换后的字符串
   */
  titleCase: (str: string): string => str.replace(str[0], str[0].toUpperCase())
};

export default stringHelper;