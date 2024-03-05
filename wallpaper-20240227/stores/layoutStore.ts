import { defineStore } from 'pinia';

/** 布局信息 */
interface LayoutI {
	/** 状态栏高度 */
	statusBarHeight: number;
	/** 小程序下菜单按钮高度 */
	menuButtonHeight: number;
	/** 状态栏和小程序按钮的高度 */
	headHeight: number;
	/** 抖音小程序头部左侧logo左侧边距 */
	dy_TitleLeftIconDistance: number;
}

// 使用 defineStore 并通过泛型参数传递 State 接口
export const useLayoutStore = defineStore('layoutStore', {
	state: (): LayoutI => {
		return { statusBarHeight: 0, menuButtonHeight: 0, headHeight: 0, dy_TitleLeftIconDistance: 0 };
	},
	actions: {
		/** 写入状态栏高度 */
		setStatusBarHeight(data: number) {
			this.statusBarHeight = data;
		},
		/** 写入小程序下菜单按钮高度 */
		setMenuButtonHeight(data: number) {
			this.menuButtonHeight = data;
		},
		/** 写入状态栏和小程序按钮的高度 */
		setHeadHeight(data: number) {
			this.headHeight = data;
		},
		/** 写入抖音小程序头部左侧logo左侧边距 */
		setDy_TitleLeftIconDistance(data: number) {
			this.dy_TitleLeftIconDistance = data;
		}
	}
});
