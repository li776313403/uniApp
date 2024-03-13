import { defineStore } from 'pinia';
import { ClassifyI, UserInfoI, WallI } from '../interface/wallpaper';

/** 设备信息 */
interface DataI {
	/** 壁纸大分类 */
	classify: Array<ClassifyI>;
	/** 分类中壁纸列表（分类详情） */
	wall: Array<WallI>;
	/** 个人信息 */
	userInfo: UserInfoI | null;
}

// 使用 defineStore 并通过泛型参数传递 State 接口
export const useDataStore = defineStore('dataStore', {
	state: (): DataI => {
		return {
			classify: [],
			wall: [],
			userInfo: {
				IP: '0.0.0.0',
				downloadSize: 0,
				scoreSize: 0,
				address: {
					country: '',
					province: '',
					city: ''
				}
			}
		};
	},
	actions: {
		/** 写入壁纸大分类 */
		setClassifyData(data: Array<ClassifyI> | null) {
			this.classify = data || [];
		},
		/** 写入分类中壁纸列表（分类详情） */
		setWallData(data: Array<WallI> | null) {
			this.wall = data || [];
		},
		/** 写入个人信息 */
		setUserInfo(data: UserInfoI | null) {
			this.userInfo = data || {
				IP: '0.0.0.0',
				downloadSize: 0,
				scoreSize: 0,
				address: {
					country: '',
					province: '',
					city: ''
				}
			};
		}
	}
});
