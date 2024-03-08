<template>
	<view class="themeItem">
		<navigator class="box" :url="`/pages/classList/classList?classId=${classIfyRef._id}&className=${classIfyRef.name}`" v-if="!isMoreRef">
			<image class="pic" :src="classIfyRef.picurl" mode="aspectFill"></image>
			<view class="mask">{{ classIfyRef.name }}</view>
			<view class="tab">{{ updateTimeComputed }}</view>
		</navigator>

		<navigator v-if="isMoreRef" class="box more" open-type="switchTab" url="/pages/classify/classify">
			<image class="pic" src="../../common/images/wallpaper/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
	</view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import dateTimeHelper from '../../unit/dateHelper';
import { ClassifyI } from '@/interface/wallpaper';
// ///////////////////////////////////////////////////init///////////////////////////////////////////////////
/** 组件传入参数*/
const props = defineProps<{
	/** 是否显示更多按钮 */
	isMore?: boolean;
	/** 壁纸大分类信息 */
	classIfy?: ClassifyI;
}>();
// ///////////////////////////////////////////////////ref///////////////////////////////////////////////////
/** 是否显示更多按钮 */
const isMoreRef = ref(props.isMore || false);
/** 壁纸大分类信息 */
const classIfyRef = ref(props.classIfy || { _id: '', name: '', sort: 0, picurl: '', select: false, updateTime: 0 });
/** 分类更新时间格式化 */
const updateTimeComputed = computed(() => `+ ${dateTimeHelper.formatTime(classIfyRef.value.updateTime)}更新`);
</script>

<style lang="scss" scoped>
.themeItem {
	.box {
		height: 340rpx;
		border-radius: $uni-border-radius-lg;
		overflow: hidden;
		position: relative;

		.pic {
			width: 100%;
			height: 100%;
		}

		.mask {
			width: 100%;
			height: 70rpx;
			position: absolute;
			bottom: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.1);
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			backdrop-filter: blur(10rpx);
			font-weight: 600;
			font-size: 30rpx;
		}

		.tab {
			position: absolute;
			left: 0;
			top: 0;
			background: rgba(250, 129, 90, 0.7);
			color: #fff;
			font-size: 22rpx;
			backdrop-filter: blur(10rpx);
			padding: 6rpx 15rpx;
			border-radius: 0 0 $uni-border-radius-lg 0;
		}
	}

	.box.more {
		.mask {
			width: 100%;
			height: 100%;
			flex-direction: column;
		}

		.text {
			font-size: 28rpx;
		}
	}
}
</style>
