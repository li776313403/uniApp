/** 萌宠大集合 */
interface PetCollectionI {
	/** 标识符 */
	_id: string;
	/** 图片地址 */
	url: string;
	/** 作者名称 */
	author: string;
	/** 萌宠类型 */
	type: string;
	/** 来源 */
	source: string;
	/** 主题内容 */
	content: string;
}

export {
	PetCollectionI
}