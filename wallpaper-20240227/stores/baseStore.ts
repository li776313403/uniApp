import { defineStore } from 'pinia';

/** 设备信息 */
interface SystemInfoI {
	/** 状态栏高度 */
	statusBarHeight: number;
}

// 定义 State 接口来描述 state 的结构
interface BaseStoreI {
	/** 设备信息 */
	systemInfo: SystemInfoI | null;
	/** 小程序下菜单按钮的布局位置信息 */
	menuButtonInfo: UniNamespace.GetMenuButtonBoundingClientRectRes | null;
}

// 使用 defineStore 并通过泛型参数传递 State 接口
export const useBaseStore = defineStore('baseStore', {
	state: (): BaseStoreI => {
		return { systemInfo: null, menuButtonInfo: null };
	},
	actions: {
		/** 写入设备信息 */
		setSystemInfo(data: SystemInfoI | null) {
			this.systemInfo = data;
		},
		/** 写入小程序下菜单按钮的布局位置信息 */
		setMenuButtonInfo(data: UniNamespace.GetMenuButtonBoundingClientRectRes | null) {
			this.menuButtonInfo = data;
		}
	}
});
