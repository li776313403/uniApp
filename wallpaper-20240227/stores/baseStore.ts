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
	/** 小程序下该菜单按钮的布局位置信息 */
	menuButton: UniNamespace.GetMenuButtonBoundingClientRectRes | null;
}

// 使用 defineStore 并通过泛型参数传递 State 接口
export const useBaseStore = defineStore('baseStore', {
	state: (): BaseStoreI => {
		return { systemInfo: null, menuButton: null };
	},
	actions: {
		set({ key, value }: { key: string; value: object }) {
			const self = this as any;
			if (Object.prototype.hasOwnProperty.call(self, key)) {
				self[key] = value;
			}
		}
	}
});
