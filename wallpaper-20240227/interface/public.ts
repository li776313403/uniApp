/** 返回结构体 */
interface ResultI<T> {
	/** 0：成功 400：请求失败 */
	errCode: 0 | 400;
	/** 查询结果描述 */
	errMsg: string;
	/** 接口消耗时间 */
	timeCost: number;
	/** 返回数据 */
	data: T;
}

export { ResultI };
