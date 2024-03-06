import Request from '@/unit/request';
import { ResultI } from '@/interface/public';
import { HomeBannerI, WallNewsI, WallNewsSearchI, DetailWallI, DailyPromotionI, ClassifyI, ClassifySearchI, WallI, WallSearchI } from '@/interface/wallpaper';

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

export { getHomeBanner, getWallNews, getDailyPromotion, getClassify, getWall };
