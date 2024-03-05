<template>
	<view class="classListLayout">
		<view @click="backClick" class="goBack" :style="{ top: backIconTopComputed + 'px', lfet: dy_TitleLeftIconDistanceComputed + 'px' }">
			<uni-icons type="back" size="20"></uni-icons>
		</view>
		<view class="content">
			<navigator url="/pages/preview/preview" class="item" v-for="item in 10">
				<image src="../../common/images/wallpaper/preview1.jpg" mode="aspectFill"></image>
			</navigator>
		</view>
	</view>
</template>

<script lang="ts" setup>
// //////////////////////////////////////////////////import//////////////////////////////////////////////////
import { computed } from 'vue';
import { useLayoutStore } from '@/stores/layoutStore';
// ///////////////////////////////////////////////////init///////////////////////////////////////////////////
const layoutStore = useLayoutStore();
// ///////////////////////////////////////////////////refs///////////////////////////////////////////////////
/** 返回按钮高度 */
const backIconTopComputed = computed(() => layoutStore.statusBarHeight || 15);
/** 抖音按钮左边距设置 */
const dy_TitleLeftIconDistanceComputed = computed(() => layoutStore.dy_TitleLeftIconDistance);
// //////////////////////////////////////////////////events//////////////////////////////////////////////////
/** 返回上个界面 */
const backClick = (): void => {
	uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.classListLayout {
	position: relative;
	
	.content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5rpx;
		padding: 5rpx;

		.item {
			height: 440rpx;
			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
	.goBack {
		position: fixed;
		width: 38px;
		height: 38px;
		background-color: rgba(0, 0, 0, 0.5);
		left: 30rpx;
		margin-left: 0;
		border-radius: 100px;
		top: 0;
		backdrop-filter: blur(10rpx);
		border: 1rpx solid rgba(255, 255, 255, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		
		:deep() {
			.uni-icons {
				color: $uni-text-color-inverse !important;
			}
		}
	}
}
</style>
