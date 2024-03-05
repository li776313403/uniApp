import Request from '@/unit/request';
import { ResultI } from '@/interface/public';
import { HomeBannerI, DetailWallI } from '@/interface/wallpaper';

/** 获取首页海报列表 */
const getHomeBanner = () => {
	return Request.get<ResultI<Array<HomeBannerI>>>({ url: '/api/bizhi/homeBanner' });
};

export { getHomeBanner };
