<template>
	<view class="classLayout pageBg">
		<CustomNavBar>分类</CustomNavBar>
		<view class="classify">
			<ThemeItem v-for="item in classifyComputed" :key="item._id" :classIfy="item"></ThemeItem>
		</view>
	</view>
</template>

<script lang="ts" setup>
// //////////////////////////////////////////////////import//////////////////////////////////////////////////
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import basicData from '../../unit/basicData';
import { useDataStore } from '@/stores/dataStore';
import { computed } from 'vue';
// ///////////////////////////////////////////////////init///////////////////////////////////////////////////
/** 数据存储 */
const dataStore = useDataStore();
// ///////////////////////////////////////////////////refs///////////////////////////////////////////////////
/** 壁纸大分类数据 */
const classifyComputed = computed(() => dataStore.classify);
// ///////////////////////////////////////////////////life///////////////////////////////////////////////////
onShareAppMessage(() => {
	return {
		title: basicData.title,
		path: '/pages/classify/classify'
	};
});
// #ifdef MP-WEIXIN
onShareTimeline(() => {
	return {
		title: basicData.title
	};
});
</script>

<style lang="scss" scoped>
.classLayout {
	.classify {
		display: grid;
		padding: 30rpx;
		grid-template-columns: repeat(3, 1fr);
		gap: 15rpx;
	}
}
</style>
