<script lang="ts" setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { useBaseStore } from '@/stores/baseStore';

const ubs = useBaseStore();

onLaunch(() => {
	/** 写入设备信息 */
	(uni.getSystemInfoAsync() as any).then((res: any) => {
		ubs.set({ key: 'systemInfo', value: res });
	});
	
	/** 写入小程序下该菜单按钮的布局位置信息 */
	ubs.set({ key: 'menuButton', value: uni.getMenuButtonBoundingClientRect() });
	
	console.log(uni.getMenuButtonBoundingClientRect());
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
