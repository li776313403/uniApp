<template>
	<view class="homeLayout pageBg">
		<CustomNavBar>推介</CustomNavBar>

		<view class="bannerClass">
			<swiper :indicator-dots="true" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" :autoplay="true" :interval="3000" :duration="1000" circular="true">
				<swiper-item v-for="item in dataRef.banner" :key="item._id">
					<image :src="item.picurl" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="noticeClass">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="textClass">公告</text>
			</view>
			<view class="center">
				<swiper vertical="true" :indicator-dots="true" :autoplay="true" :interval="1500" :duration="300" circular="true">
					<swiper-item v-for="item in dataRef.wallNews" :key="item._id">{{ item.title }}</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="20"></uni-icons>
			</view>
		</view>

		<view class="secondaryTitle">
			<CommonTitle>
				<template #name>每日推介</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="20"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
						</view>
					</view>
				</template>
			</CommonTitle>
			<view class="content">
				<scroll-view scroll-x="true">
					<view class="box" v-for="item in dataRef.dailyPromotion" :key="item._id" @click="previewClick">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="theme">
			<CommonTitle>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="" class="more">More+</navigator>
				</template>
			</CommonTitle>

			<view class="content">
				<ThemeItem v-for="item in classifyComputed" :key="item._id" :classIfy="item"></ThemeItem>
				<ThemeItem :isMore="true"></ThemeItem>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
// //////////////////////////////////////////////////import//////////////////////////////////////////////////
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import * as api from '@/api/wallpaper';
import { HomeBannerI, WallNewsI, WallNewsSearchI, DailyPromotionI, ClassifySearchI } from '@/interface/wallpaper';
import { computed, ref } from 'vue';
import { useDataStore } from '@/stores/dataStore';
import basicData from '../../unit/basicData';
// ///////////////////////////////////////////////////init///////////////////////////////////////////////////
/** 数据存储 */
const dataStore = useDataStore();
// ///////////////////////////////////////////////////refs///////////////////////////////////////////////////
/** 页面展示数据集合 */
const dataRef = ref({
	/** banner数据 */
	banner: [] as Array<HomeBannerI>,
	/** 壁纸资讯公告数据 */
	wallNews: [] as Array<WallNewsI>,
	/** 每日推介数据 */
	dailyPromotion: [] as Array<DailyPromotionI>
});
/** 壁纸大分类数据 */
const classifyComputed = computed({
	get: () => dataStore.classify,
	set: (val) => dataStore.setClassifyData(val)
});
// ///////////////////////////////////////////////////func///////////////////////////////////////////////////
/** 获取banner数据 */
const getBanner = () => {
	api.getHomeBanner()
		.then((res) => {
			if (res.errCode === 0) {
				dataRef.value.banner = res.data.sort((p) => p.sort);
			} else {
				uni.showToast({
					title: '获取banner数据失败',
					icon: 'error'
				});
				console.error('获取banner数据失败', res.errMsg);
			}
		})
		.catch((ex) => {
			uni.showToast({
				title: '获取banner数据失败',
				icon: 'error'
			});
			console.error('获取banner数据失败', ex);
		});
};
/** 获取壁纸资讯公告数据 */
const getWallNews = () => {
	const params: WallNewsSearchI = {
		select: true,
		pageNum: 1,
		pageSize: 3
	};

	api.getWallNews(params)
		.then((res) => {
			if (res.errCode === 0) {
				dataRef.value.wallNews = res.data;
			} else {
				uni.showToast({
					title: '获取壁纸资讯公告数据失败',
					icon: 'error'
				});
				console.error('获取壁纸资讯公告数据失败', res.errMsg);
			}
		})
		.catch((ex) => {
			uni.showToast({
				title: '获取壁纸资讯公告数据失败',
				icon: 'error'
			});
			console.error('获取壁纸资讯公告数据失败', ex);
		});
};
/** 获取每日推介数据 */
const getDailyPromotion = () => {
	api.getDailyPromotion()
		.then((res) => {
			if (res.errCode === 0) {
				dataRef.value.dailyPromotion = res.data;
			} else {
				uni.showToast({
					title: '获取每日推介数据失败',
					icon: 'error'
				});
				console.error('获取每日推介数据失败', res.errMsg);
			}
		})
		.catch((ex) => {
			uni.showToast({
				title: '获取每日推介数据失败',
				icon: 'error'
			});
			console.error('获取每日推介数据失败', ex);
		});
};
/** 获取壁纸大分类数据 */
const getClassify = () => {
	const params: ClassifySearchI = {
		select: true,
		pageNum: 1,
		pageSize: 3
	};

	api.getClassify(params)
		.then((res) => {
			if (res.errCode === 0) {
				classifyComputed.value = res.data.sort((p) => p.sort);
			} else {
				uni.showToast({
					title: '获取壁纸大分类数据失败',
					icon: 'error'
				});
				console.error('获取壁纸大分类数据失败', res.errMsg);
			}
		})
		.catch((ex) => {
			uni.showToast({
				title: '获取壁纸大分类数据失败',
				icon: 'error'
			});
			console.error('获取壁纸大分类数据失败', ex);
		});
};
// //////////////////////////////////////////////////events//////////////////////////////////////////////////
/** 点击进入预览界面 */
const previewClick = (): void => {
	uni.navigateTo({
		url: '/pages/preview/preview'
	});
};
// ///////////////////////////////////////////////////life///////////////////////////////////////////////////
onLoad(() => {
	getBanner();
	getWallNews();
	getDailyPromotion();
	getClassify();
});

onShareAppMessage(() => {
	return {
		title: basicData.title,
		path: '/pages/index/index'
	};
});
// #ifdef MP-WEIXIN
onShareTimeline(() => {
	return {
		title: basicData.title
	};
});
// #endif
</script>

<style lang="scss" scoped>
.homeLayout {
	.bannerClass {
		width: 750rpx;
		padding: 30rpx 0;

		swiper {
			width: 100%;
			height: 340rpx;

			&-item {
				width: 100%;
				height: 100%;
				padding: 0 30rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: $uni-border-radius-lg;
				}
			}
		}
	}

	.noticeClass {
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: $uni-text-color-lightGray;
		margin: 0 auto;
		border-radius: $uni-border-radius-lg;
		display: flex;

		.left {
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			:deep() {
				.uni-icons {
					color: $brand-theme-color !important;
				}
			}

			.textClass {
				color: $brand-theme-color;
				font-size: 28rpx;
				font-weight: 600;
			}
		}

		.center {
			flex: 1;
			align-items: center;
			justify-content: center;

			swiper {
				height: 100%;

				&-item {
					height: 100%;
					font-size: 30rpx;
					color: $text-font-color-2;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}

		.right {
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			:deep() {
				.uni-icons {
					color: $text-font-color-3 !important;
				}
			}
		}
	}

	.secondaryTitle {
		padding-top: 50rpx;

		.content {
			width: 720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;

			scroll-view {
				white-space: nowrap;

				.box {
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: $uni-border-radius-lg;
					}
				}

				.box:last-child {
					right: 30rpx;
				}
			}
		}

		.date {
			color: $brand-theme-color;
			display: flex;
			align-items: center;

			:deep() {
				.uni-icons {
					color: $brand-theme-color !important;
				}
			}

			.text {
				margin-left: 5rpx;
			}
		}
	}

	.theme {
		padding: 50rpx 0;

		.more {
			font-size: 32rpx;
			color: $uni-text-color-disable;
		}

		.content {
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3, 1fr);
		}
	}
}
</style>
