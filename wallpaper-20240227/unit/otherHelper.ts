/** @description: 其它方法 */
const otherHelper = {
	/** 跳转到首页 */
	goIndex: (): Promise<any> => {
		return uni.switchTab({
			url: '/pages/index/index'
		});
	}
};

export default otherHelper;
