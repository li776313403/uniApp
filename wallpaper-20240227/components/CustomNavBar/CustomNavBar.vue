<template>
	<view class="layout">
		<view class="navbar">
			<view class="statusBar" :style="{ height: statusBarHeightComputed + 'px' }"></view>
			<view class="titleBar" :style="{ height: titleHeightComputed + 'px' }">
				<view class="title">标题</view>
				<view class="search">
					<uni-icons class="icon" type="search" size="18"></uni-icons>
					<text class="text">搜索</text>
				</view>
			</view>
		</view>

		<view class="fill" :style="{ height: headHeightConputed + 'px' }"></view>
	</view>
</template>

<script lang="ts" setup>
// /////////////////////////////////////////////import/////////////////////////////////////////////
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
// //////////////////////////////////////////////init//////////////////////////////////////////////
// //////////////////////////////////////////////refs//////////////////////////////////////////////
/** 设备信息 */
const systemInfoRef = ref<any>({});
/** 状态栏高度 */
const statusBarHeightComputed = computed(() => systemInfoRef.value.statusBarHeight);
/** 小程序自带按钮样式 */
const titleBarInfoRef = ref<any>({});
/** 小程序按钮距离顶部高度 */
const titleBarTopComputed = computed(() => titleBarInfoRef.value.top);
/** 小程序按钮高度 */
const titleBarHeightComputed = computed(() => titleBarInfoRef.value.height);
/** 标题栏高度 */
const titleHeightComputed = computed(() => (titleBarTopComputed.value - statusBarHeightComputed.value) * 2 + titleBarHeightComputed.value);
/** 导航高度 */
const headHeightConputed = computed(() => statusBarHeightComputed.value + titleHeightComputed.value);
// //////////////////////////////////////////////life//////////////////////////////////////////////
onLoad(() => {
	(uni.getSystemInfoAsync() as any).then((res: any) => {
		systemInfoRef.value = res;
	});
	titleBarInfoRef.value = uni.getMenuButtonBoundingClientRect();
});
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
