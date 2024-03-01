import { defineStore } from 'pinia';

/** 布局信息 */
interface LayoutI {
	/** 状态栏高度 */
	statusBarHeight: number;
	/** 状态栏高度 */
	menuButton: number;
	/** 状态栏高度 */
	readonly headHeight: number;
}

// 使用 defineStore 并通过泛型参数传递 State 接口
export const useLayoutStore = defineStore('layoutStore', {
	state: (): LayoutI => {
		return { statusBarHeight: 0, menuButton: 0, headHeight: 0 };
	},
	actions: {
		set({ key, value }: { key: string; value: object }) {
			const self = this;
			if (Object.prototype.hasOwnProperty.call(self, key) && key !== 'headHeight') {
				self[key] = value;
			}
		}
	}
});
