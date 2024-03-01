/** 壁纸详情 */
interface DetailWallI {
	/** 唯一id */
	_id: string;
	/** 壁纸描述 */
	description: string;
	/** 壁纸所属分类ID */
	classid: string;
	/** 缩略小图；大图不返回，只需将后缀_small.webp替换成.jpg即可 */
	smallPicurl: string;
	/** 标签组 */
	tabs: Array<string>;
	/** 评分 */
	score: number;
	/** 发布者昵称 */
	nickname: string;
}

export { DetailWallI };