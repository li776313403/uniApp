<template>
	<view class="layout">
		<view class="navbar">
			<view class="statusBar" :style="{ height: statusBarHeightComputed + 'px' }"></view>
			<view class="titleBar" :style="{ height: menuButtonHeightComputed + 'px', marginLeft: dy_TitleLeftIconDistanceConputed + 'px' }">
				<view class="title">
					<slot></slot>
				</view>
				<navigator url="/pages/search/search" class="search">
					<uni-icons class="icon" type="search" size="18"></uni-icons>
					<text class="text">搜索</text>
				</navigator>
			</view>
		</view>

		<view class="fill" :style="{ height: headHeightConputed + 'px' }"></view>
	</view>
</template>

<script lang="ts" setup>
// /////////////////////////////////////////////import/////////////////////////////////////////////
import { computed } from 'vue';
import { useLayoutStore } from '@/stores/layoutStore';
// //////////////////////////////////////////////init//////////////////////////////////////////////
const uls = useLayoutStore();
defineProps({
	
});
// //////////////////////////////////////////////refs//////////////////////////////////////////////
/** 标题栏高度 */
const statusBarHeightComputed = computed(() => uls.statusBarHeight);
/** 小程序菜单高度 */
const menuButtonHeightComputed = computed(() => uls.menuButtonHeight);
/** 头部高度 */
const headHeightConputed = computed(() => uls.headHeight);
/** 抖音小程序头部左侧logo左侧边距 */
const dy_TitleLeftIconDistanceConputed = computed(() => uls.dy_TitleLeftIconDistance);
// //////////////////////////////////////////////life//////////////////////////////////////////////
</script>

<style lang="scss" scoped>
.layout {
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #fff 400rpx), linear-gradient(to right, #beecd8 20%, #f4e2d8);

		.statusBar {
		}
		.titleBar {
			display: flex;
			align-items: center;
			padding: 0 30rpx;

			.title {
				font-size: 22px;
				font-weight: 700;
				color: $text-font-color-1;
			}
			.search {
				width: 220rpx;
				height: 50rpx;
				border-radius: 60rpx;
				background-color: rgba(255, 255, 255, 0.4);
				border: solid 1px $uni-text-color-inverse;
				margin-left: 30rpx;
				color: $uni-text-color-grey;
				font-size: 28rpx;
				display: flex;
				align-items: center;

				.icon {
					margin-left: 5rpx;

					:deep() {
						.uni-icons {
							color: $uni-text-color-grey !important;
						}
					}
				}

				.text {
					padding-left: 10rpx;
				}
			}
		}
	}

	.fill {
	}
}
</style>
