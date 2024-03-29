import Request from '@/unit/request';
import { ResultI } from '@/interface/public';
import {
	HomeBannerI,
	WallNewsI,
	WallNewsSearchI,
	DailyPromotionI,
	ClassifyI,
	ClassifySearchI,
	WallI,
	WallSearchI,
	SetupScoreI,
	DownloadWallSearchI,
	UserInfoI,
	UserWallListSearchI,
	WallNewsDetailI,
	SearchWallSearchI,
	DetailWallI
} from '@/interface/wallpaper';

/** 获取首页海报列表 */
const getHomeBanner = () => {
	return Request.get<ResultI<Array<HomeBannerI>>>({ url: '/api/bizhi/homeBanner' });
};

/** 获取壁纸资讯公告列表 */
const getWallNews = (data: WallNewsSearchI) => {
	return Request.get<ResultI<Array<WallNewsI>>>({ url: '/api/bizhi/wallNewsList', data });
};

/** 获取随机9张壁纸 */
const getDailyPromotion = () => {
	return Request.get<ResultI<Array<DailyPromotionI>>>({ url: '/api/bizhi/randomWall' });
};

/** 获取壁纸大分类 */
const getClassify = (data: ClassifySearchI) => {
	return Request.get<ResultI<Array<ClassifyI>>>({ url: '/api/bizhi/classify', data });
};

/** 获取分类中壁纸列表（分类详情） */
const getWall = (data: WallSearchI) => {
	return Request.get<ResultI<Array<WallI>>>({ url: '/api/bizhi/wallList', data });
};

/** 为壁纸评分 */
const setupSocre = (data: SetupScoreI) => {
	return Request.get<ResultI<{ id: string }>>({ url: '/api/bizhi/setupScore', data });
};

/** 壁纸下载 */
const getDownloadWall = (data: DownloadWallSearchI) => {
	return Request.get<ResultI<{ id: string }>>({ url: '/api/bizhi/downloadWall', data });
};

/** 获取用户个人信息 */
const getUserInfo = () => {
	return Request.get<ResultI<UserInfoI>>({ url: '/api/bizhi/userInfo' });
};

/** 获取我的评分/下载列表 */
const getUserWallList = (data: UserWallListSearchI) => {
	return Request.get<ResultI<Array<WallI>>>({ url: '/api/bizhi/userWallList', data });
};

/** 获取壁纸资讯公告详情 */
const getWallNewsDetail = (data: { id: string }) => {
	return Request.get<ResultI<WallNewsDetailI>>({ url: '/api/bizhi/wallNewsDetail', data });
};

/** 搜索壁纸 */
const searchWall = (data: SearchWallSearchI) => {
	return Request.get<ResultI<Array<DetailWallI>>>({ url: '/api/bizhi/searchWall', data });
};

export { getHomeBanner, getWallNews, getDailyPromotion, getClassify, getWall, setupSocre, getDownloadWall, getUserInfo, getUserWallList, getWallNewsDetail, searchWall };
