/** 海报 */
interface HomeBannerI {
	/** 唯一id */
	_id: string;
	/** 跳转链接地址 */
	url: string;
	/** 排序字段 */
	sort: number;
	/** 缩略图 */
	picurl: string;
	/** 跳转方式，默认：self，外站：miniProgram */
	target: string;
	/** 外部小程序的app-id */
	appid: string;
}

/** 壁纸资讯公告 */
interface WallNewsI {
	/** 唯一id */
	_id: string;
	/** 阅读次数 */
	view_count: number;
	/** 发布时间，13位时间戳 */
	publish_date: string;
	/** 资讯标题 */
	title: string;
	/** 发布人 */
	author: string;
	/** 是否为推荐资讯 */
	select: boolean;
}

/** 壁纸资讯公告列表查询条件 */
interface WallNewsSearchI {
	/** 是否为推荐资讯 */
	select: boolean;
	/** 第几页 */
	pageNum: number;
	/** 一页多少条 */
	pageSize: number;
}

/** 壁纸大分类 */
interface ClassifyI {
	/** 唯一id */
	_id: string;
	/** 分类名称 */
	name: string;
	/** 排序字段 */
	sort: number;
	/** 缩略图 */
	picurl: string;
	/** 是否为推荐 */
	select: boolean;
	/** 该分类内最后更新时间 */
	updateTime: number;
}

/** 壁纸大分类搜索条件 */
interface ClassifySearchI {
	/** 推荐分类，用于首页展示，如果传入了true，pageNum和pageSize将会失效 */
	select: boolean;
	/** 第几页 */
	pageNum: number;
	/** 一页多少条 */
	pageSize: number;
}

/** 分类中壁纸列表（分类详情） */
interface WallI {
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
	/** 用户评分 */
	userScore?: number;
	/** 发布者昵称 */
	nickname: string;
}

/** 分类中壁纸列表（分类详情）搜索条件 */
interface WallSearchI {
	/** 分类ID */
	classid: string;
	/** 第几页 */
	pageNum: number;
	/** 一页多少条ID */
	pageSize: number;
}

/** 随机9张壁纸 */
interface DailyPromotionI {
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
	score: string;
	/** 发布者昵称 */
	nickname: string;
}

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

/** 为壁纸评分 */
interface SetupScoreI {
	/** 分类ID */
	classid: string;
	/** 壁纸ID */
	wallId: string;
	/** 用户评分 */
	userScore: number;
}

/** 壁纸下载 */
interface DownloadWallSearchI {
	/** 分类ID */
	classid: string;
	/** 壁纸ID */
	wallId: string;
}

/** 归属地对象 */
interface AddressI {
	/** 国家 */
	country: string;
	/** 省份 */
	province: string;
	/** 城市 */
	city: string;
}

/** 用户个人信息 */
interface UserInfoI {
	/** 当前用户的IP地址 */
	IP: string;
	/** 下载次数 */
	downloadSize: number;
	/** 评分过多少次 */
	scoreSize: number;
	/** 归属地对象 */
	address: AddressI;
}

/** 我的评分/下载列表 */
interface UserWallListI {
	/** 唯一id */
	_id: string;
	/** 壁纸描述 */
	description: string;
	/** 壁纸所属分类ID */
	classid: string;
	/** 分类名称 */
	classname: string;
	/** 略小图；大图不返回，只需将后缀_small.webp替换成.jpg即可 */
	smallPicurl: string;
	/** 标签组 */
	tabs: Array<string>;
	/** 评分 */
	score: string;
	/** 发布者昵称 */
	nickname: string;
}

/** 我的评分/下载列表搜索 */
interface UserWallListSearchI {
	/** score我的评分，download我的下载 */
	type: 'score' | 'download';
	/** 第几页 */
	pageNum?: number;
	/** 一页多少条 */
	pageSize?: number;
}

export {
	HomeBannerI,
	WallNewsI,
	WallNewsSearchI,
	ClassifyI,
	ClassifySearchI,
	DailyPromotionI,
	DetailWallI,
	WallI,
	WallSearchI,
	SetupScoreI,
	DownloadWallSearchI,
	AddressI,
	UserInfoI,
	UserWallListI,
	UserWallListSearchI
};
