<template>
	<view class="previewLayout">
		<swiper circular="true" :current="wallIndexRef" @change="wallChange">
			<swiper-item v-for="(item, index) in wallListComputed" :key="item._id">
				<image v-if="wallReadedRef.includes(index)" :src="item.smallPicurl.replace('_small.webp', '.jpg')" mode="aspectFill" @click="imageClick"></image>
			</swiper-item>
		</swiper>

		<view v-show="shwoInfoRef" class="mask">
			<view @click="backClick" class="goBack" :style="{ top: backIconTopComputed + 'px', lfet: dy_TitleLeftIconDistanceComputed + 'px' }">
				<uni-icons type="back" size="20"></uni-icons>
			</view>
			<view class="count">{{ wallIndexRef + 1 }} / {{ wallListComputed.length }}</view>
			<view class="time">
				<uni-dateformat :date="dateNowRef" format="hh : mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="dateNowRef" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="showInfoClick">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">信息</view>
				</view>

				<view class="box" @click="showRateClick">
					<uni-icons type="star" size="28"></uni-icons>
					<view class="text">5分</view>
				</view>

				<view class="box">
					<uni-icons type="download" size="28"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>

		<!-- 壁纸信息面板 -->
		<uni-popup ref="infoPanlRef" type="bottom">
			<view class="infoPopup">
				<view class="popHeader">
					<view class="left"></view>
					<view class="title">壁纸信息</view>
					<view class="close" @click="closeInfoPopupClick">
						<uni-icons type="closeempty" size="18"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y="true">
					<view class="content">
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text selectable="true" class="value">123123123213</text>
						</view>

						<view class="row">
							<view class="label">分类：</view>
							<text selectable="true" class="value">明星美女</text>
						</view>

						<view class="row">
							<view class="label">发布者：</view>
							<text selectable="true" class="value">李雯</text>
						</view>

						<view class="row">
							<view class="label">评分：</view>
							<view class="value roteBox">
								<uni-rate class="rate" readonly allow-half :touchable="false" />
								<text class="rateText">123</text>
							</view>
						</view>

						<view class="row">
							<view class="label">摘要：</view>
							<text selectable="true" class="value">123123123213</text>
						</view>

						<view class="row">
							<view class="label">标签：</view>
							<view class="value tabs">
								<view class="tab">标签</view>
							</view>
						</view>

						<view class="copyright">
							声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护您的权益。
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<!-- 评分信息面板 -->
		<uni-popup ref="ratePanlRef" type="center" :is-mask-click="false">
			<view class="ratePanl">
				<view class="popHeader">
					<view class="left"></view>
					<view class="title">壁纸评分</view>
					<view class="close" @click="closeRateClick">
						<uni-icons type="closeempty" size="18"></uni-icons>
					</view>
				</view>

				<view class="content">
					<uni-rate v-model="infoParamsRef.score" allow-half touchable />
					<text class="text">{{ infoParamsRef.score }}分</text>
				</view>

				<view class="footer">
					<button @click="rateSubmitClick" type="default" size="mini" plain :disabled="infoParamsRef.score === 0">确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script lang="ts" setup>
// //////////////////////////////////////////////////import//////////////////////////////////////////////////
import { computed, ref } from 'vue';
import { onLoad, onShow, onHide } from '@dcloudio/uni-app';
import { DetailWallI } from '../../interface/wallpaper';
import { useLayoutStore } from '@/stores/layoutStore';
import { useDataStore } from '@/stores/dataStore';
// /////////////////////////////////////////////////interface////////////////////////////////////////////////
/** 页面传参 */
interface QueryI {
	/** 壁纸编号 */
	wallId: string;
}
// ///////////////////////////////////////////////////init///////////////////////////////////////////////////
/** 布局内容store */
const layoutStore = useLayoutStore();
/** 数据存储 */
const dataStore = useDataStore();
// ///////////////////////////////////////////////////refs///////////////////////////////////////////////////
/** 是否显示信息面板 */
const shwoInfoRef = ref<boolean>(true);
/** 当前时间 */
const dateNowRef = ref<number>(Date.now());
/** 定时器集合 */
const timer = {
	date: null as NodeJS.Timeout | null
};
/** 信息展示窗体 */
const infoPanlRef = ref<any>();
/** 评分展示窗体 */
const ratePanlRef = ref<any>();
/** 壁纸信息 */
const infoParamsRef = ref<DetailWallI>({
	_id: '',
	description: '',
	classid: '',
	smallPicurl: '',
	tabs: [],
	score: 0,
	nickname: ''
});
/** 返回按钮高度 */
const backIconTopComputed = computed(() => layoutStore.statusBarHeight || 15);
/** 抖音按钮左边距设置 */
const dy_TitleLeftIconDistanceComputed = computed(() => layoutStore.dy_TitleLeftIconDistance);
/** 分类中壁纸列表（分类详情） */
const wallListComputed = computed(() => dataStore.wall);
/** 页面传参 */
const queryRef = ref<QueryI>({ wallId: '' });
/** 图片所在索引位置 */
const wallIndexRef = ref(0);
/** 已经预览的图片 */
const wallReadedRef = ref<Array<number>>([]);
// ///////////////////////////////////////////////////func///////////////////////////////////////////////////
/**
 * @description: 时间赋值
 * @author: liwen
 */
const startDatetime = (): void => {
	dateNowRef.value = Date.now();

	timer.date = setInterval(() => {
		dateNowRef.value = Date.now();
	}, 1000);
};
/**
 * @description: 停止定时器
 * @author: liwen
 */
const stopDatetime = (): void => {
	timer.date && clearInterval(timer.date);
};
/** 获取当前图片索引的前后两张图片的索引(包含当前索引) */
const getWillAroundIndex = (index: number) => {
	let indexs = [];

	if (index === 0) {
		indexs = [wallListComputed.value.length - 1, index, index + 1];
	} else if (index === wallListComputed.value.length - 1) {
		indexs = [index - 1, index, 0];
	} else {
		indexs = [index - 1, index, index + 1];
	}

	return indexs;
};
// //////////////////////////////////////////////////events//////////////////////////////////////////////////
/**
 * @description: 点击图片，切换信息面板展示状态
 * @author: liwen
 */
const imageClick = (): void => {
	shwoInfoRef.value = !shwoInfoRef.value;
};
/**
 * @description: 点击弹出图片信息
 * @author: liwen
 */
const showInfoClick = (): void => {
	infoPanlRef.value.open();
};
/** 弹出图片信息面板关闭 */
const closeInfoPopupClick = (): void => {
	infoPanlRef.value.close();
};
/** 弹出评分面板 */
const showRateClick = (): void => {
	ratePanlRef.value.open();
};
/** 关闭评分面板 */
const closeRateClick = (): void => {
	ratePanlRef.value.close();
};
/** 提交评分 */
const rateSubmitClick = (): void => {};
/** 返回上个界面 */
const backClick = (): void => {
	uni.navigateBack();
};
/** 壁纸切换触发 */
const wallChange = (event: { detail: { current: number } }): void => {
	wallIndexRef.value = event.detail.current;

	const indexs = getWillAroundIndex(wallIndexRef.value);
	const pindexs = indexs.filter((p) => !wallReadedRef.value.includes(p));

	pindexs.length > 0 && (wallReadedRef.value = wallReadedRef.value.concat(pindexs));
};
// ///////////////////////////////////////////////////life///////////////////////////////////////////////////
onLoad((query: QueryI) => {
	queryRef.value = query;
	wallIndexRef.value = wallListComputed.value.findIndex((p) => p._id === queryRef.value.wallId);
	wallReadedRef.value = wallReadedRef.value.concat(getWillAroundIndex(wallIndexRef.value));
});

onShow(() => {
	startDatetime();
});

onHide(() => {
	stopDatetime();
});
</script>

<style lang="scss" scoped>
.previewLayout {
	width: 100%;
	height: 100vh;
	position: relative;

	.popHeader {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.title {
			color: $text-font-color-2;
			font-size: 26rpx;
		}
		.close {
			padding: 6rpx;

			:deep() {
				.uni-icons {
					color: $uni-text-color-grey !important;
				}
			}
		}
	}

	swiper {
		width: 100%;
		height: 100%;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.mask {
		& > view {
			position: absolute;
			left: 0;
			right: 0;
			color: $uni-text-color-inverse;
			background-color: rgba(0, 0, 0, 0.3);
			border-radius: 40rpx;
			margin: auto;
			width: fit-content;
			padding: 8rpx 28rpx;
			backdrop-filter: blur(10rpx);
		}

		.goBack {
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

		.count {
			top: 10vh;
			font-size: 28rpx;
		}

		.time {
			top: calc(10vh + 80rpx);
			font-size: 140rpx;
			font-weight: 100;
			line-height: 1em;
			text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
		}

		.date {
			top: calc(10vh + 260rpx);
			font-size: 34rpx;
			text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
		}

		.footer {
			bottom: 10vh;
			width: 65vw;
			height: 120rpx;
			background-color: rgba(255, 255, 255, 0.8);
			border-radius: 120rpx;
			color: $text-font-color-1;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
			backdrop-filter: blur(20rpx);

			.box {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.text {
					font-size: 26rpx;
					color: $text-font-color-2;
					padding: 2rpx 12rpx;
				}
			}
		}
	}

	.infoPopup {
		background-color: $uni-text-color-inverse;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;

		scroll-view {
			max-height: 40vh;

			.content {
				.row {
					display: flex;
					padding: 16rpx 0;
					font-size: 32rpx;
					line-height: 1.7em;

					.label {
						color: $text-font-color-3;
						width: 140rpx;
						text-align: right;
						font-size: 30rpx;
					}
					.vlaue {
						flex: 1;
						width: 0;
					}

					.roteBox {
						display: flex;
						align-items: center;

						.rateText {
							font-size: 26rpx;
							color: $text-font-color-3;
							padding-left: 10rpx;
						}
					}

					.tabs {
						display: flex;
						align-items: center;
						flex-wrap: wrap;

						.tab {
							border: 1px solid $brand-theme-color;
							color: $brand-theme-color;
							font-size: 22rpx;
							padding: 10rpx 30rpx;
							border-radius: 40rpx;
							line-height: 1em;
							margin: 0 10rpx 10rpx 0;
						}
					}
				}

				.copyright {
					font-size: 28rpx;
					padding: 20rpx;
					background: #f6f6f6;
					color: #666;
					border-radius: 10rpx;
					margin: 20rpx 0;
					line-height: 1.6em;
				}
			}
		}
	}

	.ratePanl {
		background-color: $uni-text-color-inverse;
		padding: 30rpx;
		width: 70vw;
		border-radius: 30rpx;
		overflow: hidden;

		.content {
			padding: 30rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;

			.text {
				color: $uni-color-warning;
				padding-left: 10rpx;
				width: 80rpx;
				line-height: 1em;
				text-align: right;
			}
		}

		.footer {
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
