<template>
	<view class="previewLayout" v-if="wallIndexRef !== -1">
		<swiper circular="true" :current="wallIndexRef" @change="wallChange">
			<swiper-item v-for="(item, index) in wallListComputed" :key="item._id">
				<image v-if="wallReadedRef.includes(index)" :src="item.picurl" mode="aspectFill" @click="imageClick"></image>
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
					<uni-icons :type="previeWallComputed.userScore ? 'star-filled' : 'star'" size="28"></uni-icons>
					<view class="text">{{ showScoreComputed }}</view>
				</view>

				<view class="box" @click="downloadClick">
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
							<text selectable="true" class="value">{{ previeWallComputed._id }}</text>
						</view>

						<view class="row">
							<view class="label">分类：</view>
							<text selectable="true" class="value">{{ classNameComputed }}</text>
						</view>

						<view class="row">
							<view class="label">发布者：</view>
							<text selectable="true" class="value">{{ previeWallComputed.nickname }}</text>
						</view>

						<view class="row">
							<view class="label">评分：</view>
							<view class="value roteBox">
								<uni-rate class="rate" :value="showScoreComputed" readonly allow-half :touchable="false" />
								<text class="rateText">{{ showScoreComputed }}</text>
							</view>
						</view>

						<view class="row">
							<view class="label">摘要：</view>
							<text selectable="true" class="value">{{ previeWallComputed.description }}</text>
						</view>

						<view class="row">
							<view class="label">标签：</view>
							<view class="value tabs">
								<view class="tab" v-for="item in previeWallComputed.tabs" :key="item">{{ item }}</view>
							</view>
						</view>

						<view class="copyright">
							声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护您的权益。
						</view>

						<!-- <view class="safe-area-inset-bottom"></view> -->
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<!-- 评分信息面板 -->
		<uni-popup ref="ratePanlRef" type="center" :is-mask-click="false" @change="scorePanleChange">
			<view class="ratePanl">
				<view class="popHeader">
					<view class="left"></view>
					<view class="title">壁纸评分</view>
					<view class="close" @click="closeRateClick">
						<uni-icons type="closeempty" size="18"></uni-icons>
					</view>
				</view>

				<view class="content">
					<uni-rate v-model="scoreRef" allow-half touchable :readonly="previeWallComputed.userScore" />
					<text class="text">{{ scoreRef }}分</text>
				</view>

				<view class="footer">
					<button @click="rateSubmitClick" type="default" size="mini" plain :disabled="scoreRef === 0 || previeWallComputed.userScore">
						{{ previeWallComputed.userScore ? '已评分' : '提交评分' }}
					</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script lang="ts" setup>
// //////////////////////////////////////////////////import//////////////////////////////////////////////////
import { computed, ref } from 'vue';
import { onLoad, onShow, onHide, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { useLayoutStore } from '@/stores/layoutStore';
import { useDataStore } from '@/stores/dataStore';
import * as api from '@/api/wallpaper';
import { ClassifySearchI, SetupScoreI, WallI, WallSearchI } from '../../interface/wallpaper';
import basicData from '../../unit/basicData';
import queryAndParamHelper from '../../unit/queryAndParamHelper';
import otherHelper from '../../unit/otherHelper';

// /////////////////////////////////////////////////interface////////////////////////////////////////////////
/** 页面传参 */
interface QueryI {
	/** 分类ID */
	classId: string;
	/** 分类名称 */
	className: string;
	/** 壁纸ID */
	wallId: string;
}
/** 壁纸详情-扩展 */
interface NewWallI extends WallI {
	/** 原图 */
	picurl: string;
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
/** 返回按钮高度 */
const backIconTopComputed = computed(() => layoutStore.statusBarHeight || 15);
/** 抖音按钮左边距设置 */
const dy_TitleLeftIconDistanceComputed = computed(() => layoutStore.dy_TitleLeftIconDistance);
/** 壁纸大分类数据 */
const classifyComputed = computed({
	get: () => dataStore.classify,
	set: (val) => dataStore.setClassifyData(val)
});
/** 分类中壁纸列表（分类详情） */
const wallListComputed = computed({
	get: () =>
		(dataStore.wall as Array<NewWallI>).map((p) => {
			p.picurl = p.smallPicurl.replace('_small.webp', '.jpg');
			return p;
		}),
	set: (val) => dataStore.setWallData(val)
});
/** 页面传参 */
const queryRef = ref<QueryI>({ wallId: '', classId: '', className: '' });
/** 页面代入参数string格式 */
const queryStringRef = computed(() => queryAndParamHelper.tansParams(queryRef.value));
/** 图片所在索引位置 */
const wallIndexRef = ref(-1);
/** 已经预览的图片 */
const wallReadedRef = ref<Array<number>>([]);
/** 当前预览的图片 */
const previeWallComputed = computed(() => wallListComputed.value[wallIndexRef.value]);
/** 修改的壁纸评论分数 */
const scoreRef = ref(0);
/** 显示壁纸评论分数 */
const showScoreComputed = computed(() => {
	return previeWallComputed.value.userScore ? previeWallComputed.value.userScore : previeWallComputed.value.score;
});
/** 壁纸分类名称 */
const classNameComputed = computed(() => queryRef.value.className || '未知分类');
/** 获取分类中壁纸请求参数 */
const wallParamsRef = ref<WallSearchI>({
	classid: '',
	pageNum: 1,
	pageSize: 12
});
// ///////////////////////////////////////////////////func///////////////////////////////////////////////////
/** @description: 时间赋值 */
const startDatetime = (): void => {
	dateNowRef.value = Date.now();

	timer.date = setInterval(() => {
		dateNowRef.value = Date.now();
	}, 1000);
};
/** 停止定时器 */
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
/** 是否可以下载壁纸 */
const isDowloadWall = () => {
	return api.getDownloadWall({ classid: previeWallComputed.value.classid, wallId: previeWallComputed.value._id });
};
// //////////////////////////////////////////////////events//////////////////////////////////////////////////
/** 点击图片，切换信息面板展示状态 */
const imageClick = (): void => {
	shwoInfoRef.value = !shwoInfoRef.value;
};
/** 点击弹出图片信息 */
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
const rateSubmitClick = (): void => {
	uni.showLoading({
		title: '提交评分中...'
	});

	const data: SetupScoreI = {
		classid: previeWallComputed.value.classid,
		wallId: previeWallComputed.value._id,
		userScore: scoreRef.value
	};
	api.setupSocre(data)
		.then((res) => {
			if (res.errCode === 0) {
				uni.showToast({
					title: '评分成功',
					icon: 'success'
				}).finally(() => {
					const list = JSON.parse(JSON.stringify(wallListComputed.value)) as Array<WallI>;
					const data = JSON.parse(JSON.stringify(previeWallComputed.value)) as WallI;
					data.score = scoreRef.value;
					list[wallIndexRef.value] = data;
					dataStore.setWallData(list);

					closeRateClick();
				});
			} else {
				uni.showToast({
					title: '评分失败',
					icon: 'error'
				});
				console.error('评分失败', res.errMsg);
			}
		})
		.catch((ex) => {
			uni.showToast({
				title: '评分失败',
				icon: 'error'
			});
			console.error('评分失败', ex);
		})
		.finally(() => {
			uni.hideLoading();
		});
};
/** 返回上个界面 */
const backClick = (): void => {
	uni.navigateBack().catch(() => {
		queryRef.value.wallId = '';
		uni.redirectTo({
			url: '/pages/classList/classList?' + queryStringRef.value
		});
	});
};
/** 壁纸切换触发 */
const wallChange = (event: { detail: { current: number } }): void => {
	wallIndexRef.value = event.detail.current;

	const indexs = getWillAroundIndex(wallIndexRef.value);
	const pindexs = indexs.filter((p) => !wallReadedRef.value.includes(p));

	pindexs.length > 0 && (wallReadedRef.value = wallReadedRef.value.concat(pindexs));
};
/** 评分面板弹出时赋值 */
const scorePanleChange = (e: { show: boolean }): void => {
	scoreRef.value = e.show ? showScoreComputed.value : 0;
};
/** 下载图片 */
const downloadClick = async (): Promise<void> => {
	// #ifdef H5
	window.open(previeWallComputed.value.picurl);
	// #endif
	// #ifndef H5
	try {
		uni.showLoading({
			title: '下载中...',
			mask: true
		});

		const isDowloadRes = await isDowloadWall();
		if (isDowloadRes.errCode === 0) {
			const imageInfo = await uni.getImageInfo({
				src: previeWallComputed.value.picurl
			});

			await uni.saveImageToPhotosAlbum({
				filePath: imageInfo.path
			});

			uni.showToast({
				icon: 'success',
				title: '壁纸已保存到相册'
			}).finally(() => {
				uni.hideLoading();
			});
		} else {
			uni.hideLoading();

			uni.showToast({
				icon: 'none',
				title: isDowloadRes.errMsg
			});
		}
	} catch (ex) {
		uni.hideLoading();

		const exx = ex as unknown as { errMsg: string };
		if (exx.errMsg) {
			if (exx.errMsg.includes('saveImageToPhotosAlbum:fail auth deny')) {
				const authInfo = await uni.showModal({
					title: '提示',
					content: '需要授权保存到相册'
				});

				if (authInfo.confirm) {
					uni.openSetting({
						success: (res) => {
							if (res.authSetting['scope.writePhotosAlbum']) {
								uni.showToast({
									icon: 'success',
									title: '保存相册授权成功'
								});
							} else {
								uni.showToast({
									icon: 'none',
									title: '保存相册授权失败'
								});
							}
						}
					});
				} else if (authInfo.cancel) {
					uni.showToast({
						title: '授权已取消'
					});
				}
			} else if (exx.errMsg.includes('saveImageToPhotosAlbum:fail cancel')) {
				uni.showToast({
					icon: 'none',
					title: '已取消保存'
				});
			}
		}
	}
	// #endif
};
/** 获取壁纸大分类数据 */
const getClassify = () => {
	uni.showLoading({
		title: '数据加载中...'
	});
	
	const params: ClassifySearchI = {
		select: false,
		pageNum: 1,
		pageSize: 100
	};

	api.getClassify(params)
		.then((res) => {
			if (res.errCode === 0) {
				classifyComputed.value = res.data.sort((p) => p.sort);
				if (classifyComputed.value.filter((p) => p._id === queryRef.value.classId)) {
					getWall();
				} else {
					uni.showToast({
						title: '获取壁纸分类数据失败,即将跳转到首页',
						icon: 'none'
					}).then(() => {
						otherHelper.goIndex();
					});
				}
			} else {
				uni.showToast({
					title: '获取壁纸分类数据失败,即将跳转到首页',
					icon: 'none'
				}).then(() => {
					otherHelper.goIndex();
				});
			}
		})
		.catch(() => {
			uni.showToast({
				title: '获取壁纸分类数据失败,即将跳转到首页',
				icon: 'none'
			}).then(() => {
				otherHelper.goIndex();
			});
		})
		.finally(() => {
			uni.hideLoading();
		});
};
/** 获取分类中壁纸列表（分类详情） */
const getWall = () => {
	uni.showLoading({
		title: '数据加载中...'
	});
	wallParamsRef.value.classid = queryRef.value.classId;
	api.getWall(wallParamsRef.value)
		.then((res) => {
			if (res.errCode === 0) {
				const ids = wallListComputed.value.map((p) => p._id);
				const newData = res.data.filter((p) => !ids.includes(p._id));
				wallListComputed.value = wallListComputed.value.concat(newData as any);
				const isData = wallParamsRef.value.pageSize === res.data.length;

				if (queryRef.value.wallId) {
					if (isData) {
						if (wallListComputed.value.some((p) => p._id === queryRef.value.wallId)) {
							wallIndexRef.value = wallListComputed.value.findIndex((p) => p._id === queryRef.value.wallId);
							wallReadedRef.value = wallReadedRef.value.concat(getWillAroundIndex(wallIndexRef.value));
						} else {
							wallParamsRef.value.pageNum++;
							getWall();
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: '未找到当前壁纸,即将跳转到首页'
						}).then(() => {
							otherHelper.goIndex();
						});
					}
				}
			} else {
				uni.showToast({
					title: '未找到当前壁纸,即将跳转到首页',
					icon: 'none'
				}).then(() => {
					otherHelper.goIndex();
				});
			}
		})
		.catch(() => {
			uni.showToast({
				title: '未找到当前壁纸,即将跳转到首页',
				icon: 'none'
			}).then(() => {
				otherHelper.goIndex();
			});
		})
		.finally(() => {
			uni.hideLoading();
		});
};
// ///////////////////////////////////////////////////life///////////////////////////////////////////////////
onLoad((query: QueryI) => {
	query.className = decodeURIComponent(query.className);
	queryRef.value = query;

	if (wallListComputed.value.length > 0) {
		wallIndexRef.value = wallListComputed.value.findIndex((p) => p._id === queryRef.value.wallId);
		wallReadedRef.value = wallReadedRef.value.concat(getWillAroundIndex(wallIndexRef.value));
	} else {
		getClassify();
	}
});

onShow(() => {
	startDatetime();
});

onHide(() => {
	stopDatetime();
});

onShareAppMessage(() => {
	return {
		title: `${basicData.title}-${queryRef.value.className}-${previeWallComputed.value._id}`,
		path: '/pages/preview/preview?' + queryStringRef.value
	};
});
// #ifdef MP-WEIXIN
onShareTimeline(() => {
	return {
		title: `${basicData.title}-${queryRef.value.className}-${previeWallComputed.value._id}`,
		path: queryStringRef.value
	};
});
// #endif
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
