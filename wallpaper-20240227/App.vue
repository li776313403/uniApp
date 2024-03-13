<script lang="ts" setup>
// //////////////////////////////////////////////////import//////////////////////////////////////////////////
// 这个页面不能引入interface,只能在当前页面定义
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { useBaseStore } from '@/stores/baseStore';
import { useLayoutStore } from '@/stores/layoutStore';
import { useDataStore } from '@/stores/dataStore';
import basicData from '@/unit/basicData';
import * as api from '@/api/wallpaper';
// /////////////////////////////////////////////////interface/////////////////////////////////////////////////
/** 抖音/头条 */
interface TtI {
	/** 获取自定义导航栏下不可改变的元素（比如左上角 logo/返回位置+ 右上角反馈+more+close）的位置信息。坐标信息以屏幕左上角为原点。 */
	getCustomButtonBoundingClientRect?: () => {
		/** 左上角 logo/返回的位置信息 */
		leftIcon: {
			width: number;
			height: number;
			top: number;
			right: number;
			bottom: number;
			left: number;
		};
		/** 右上角反馈+more+close 的位置信息 */
		capsule: {
			width: number;
			height: number;
			top: number;
			right: number;
			bottom: number;
			left: number;
		};
	};
}
// ///////////////////////////////////////////////////init///////////////////////////////////////////////////
const ubs = useBaseStore();
const uls = useLayoutStore();
/** 数据存储 */
const dataStore = useDataStore();
// ///////////////////////////////////////////////////func///////////////////////////////////////////////////
/** 获取设备信息 */
const getDeviceInfo = async ():Promise<void>=>{
	const tt: TtI = {};
	
	if (uni.getSystemInfoAsync) {
		// 写入设备信息
		const systemInfo: any = await (uni.getSystemInfoAsync() as any);
		ubs.setSystemInfo(systemInfo);
	
		uls.setStatusBarHeight(systemInfo.statusBarHeight);
	}
	
	if (uni.getMenuButtonBoundingClientRect) {
		// 写入小程序下该菜单按钮的布局位置信息
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	
		const menuTop = menuButtonInfo.top;
		const menuHeight = menuButtonInfo.height;
		const menuButtonHeight = (menuTop - uls.statusBarHeight) * 2 + menuHeight;
		ubs.setMenuButtonInfo(menuButtonInfo);
	
		uls.setMenuButtonHeight(menuButtonHeight);
	} else {
		uls.setMenuButtonHeight(basicData.layout.menuHeight);
	}
	
	uls.setHeadHeight(uls.menuButtonHeight + uls.statusBarHeight);
	
	// ////////////////////////////////////////////////////抖音////////////////////////////////////////////////////
	// #ifdef MP-TOUTIAO
	if (tt && tt.getCustomButtonBoundingClientRect) {
		const {
			leftIcon: { left, width }
		} = tt.getCustomButtonBoundingClientRect();
		uls.setDy_TitleLeftIconDistance(left + parseInt(width.toString()));
	}
	// #endif
};
/** 获取个人信息 */
const getUserInfo = () => {
	api.getUserInfo()
		.then((res) => {
			if (res.errCode === 0) {
				dataStore.setUserInfo(res.data);
			} else {
				uni.showToast({
					title: '获取个人信息失败',
					icon: 'error'
				});
			}
		})
		.catch(() => {
			uni.showToast({
				title: '获取个人信息失败',
				icon: 'error'
			});
		});
};
// ///////////////////////////////////////////////////life///////////////////////////////////////////////////
onLaunch(() => {
	getDeviceInfo();
	getUserInfo();
});
onShow(() => {
	console.log('App Show');
});
onHide(() => {
	console.log('App Hide');
});
</script>

<style lang="scss">
@import 'common/style/commont-style.scss';
</style>
