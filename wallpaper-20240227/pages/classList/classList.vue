<template>
	<view class="classListLayout">
		<view v-if="wallListComputed.length === 0 && isDataRef" class="loadingLayout" :style="{ marginTop: backIconTopComputed + 'px' }">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<!-- #ifndef MP-TOUTIAO -->
		<view @click="backClick" class="goBack" :style="{ top: backIconTopComputed + 'px', lfet: dy_TitleLeftIconDistanceComputed + 'px' }">
			<uni-icons type="back" size="20"></uni-icons>
		</view>
		<!-- #endif -->
		<view class="content">
			<view @click="previewClick(item)" v-for="item in wallListComputed" :key="item._id" class="item">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</view>
		</view>

		<view class="loadingLayout" v-if="wallListComputed.length > 0 || !isDataRef">
			<uni-load-more :status="isDataRef ? 'loading' : 'noMore'"></uni-load-more>
		</view>

		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script lang="ts" setup>
// //////////////////////////////////////////////////import//////////////////////////////////////////////////
import { onLoad, onReachBottom, onPullDownRefresh, onUnload, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { ref, computed } from 'vue';
import { useLayoutStore } from '@/stores/layoutStore';
import { useDataStore } from '@/stores/dataStore';
import * as api from '@/api/wallpaper';
import { WallI, WallSearchI } from '@/interface/wallpaper';
import basicData from '../../unit/basicData';
import queryAndParamHelper from '../../unit/queryAndParamHelper';
// /////////////////////////////////////////////////interface////////////////////////////////////////////////
/** 页面代入参数 */
interface QueryI {
	/** 分类ID */
	classId: string;
	/** 壁纸ID */
	wallId: string;
	/** score我的评分，download我的下载 */
	type: 'score' | 'download' | null;
}
// ///////////////////////////////////////////////////init///////////////////////////////////////////////////
/** 布局内容store */
const layoutStore = useLayoutStore();
/** 数据存储 */
const dataStore = useDataStore();
// ///////////////////////////////////////////////////refs///////////////////////////////////////////////////
/** 壁纸大分类数据 */
const classifyComputed = computed(() => dataStore.classify);
/** 数据存储 */
const wallListComputed = computed({
	get: () => dataStore.wall,
	set: (val) => dataStore.setWallData(val)
});
/** 是否存在数据 */
const isDataRef = ref(true);
/** 返回按钮高度 */
const backIconTopComputed = computed(() => layoutStore.statusBarHeight || 15);
/** 抖音按钮左边距设置 */
const dy_TitleLeftIconDistanceComputed = computed(() => layoutStore.dy_TitleLeftIconDistance);
/** 页面代入参数 */
const queryRef = ref<QueryI>({ classId: '', wallId: '', type: null });
/** 页面代入参数string格式 */
const queryStringRef = computed(() => {
	return queryAndParamHelper.tansParams(queryRef.value);
});
/** 获取分类中壁纸请求参数 */
const paramsRef = ref<WallSearchI>({
	classid: '',
	pageNum: 1,
	pageSize: 12
});
/** 壁纸分类名称 */
const classNameComputed = computed(() => {
	let title = '';

	if (queryRef.value.type) {
		const list = classifyComputed.value.filter((p) => p._id === queryRef.value.classId);
		title = list.length > 0 ? list[0].name : '未知分类';
	} else {
		title = queryRef.value.type === 'download' ? '我的下载' : '我的评分';
	}

	return title;
});
// ///////////////////////////////////////////////////func///////////////////////////////////////////////////
/** 获取壁纸数据，根据转入的页面 */
const getData = () => {
	uni.showLoading({
		title: '壁纸数据加载中...',
		mask: true
	});

	const params = JSON.parse(JSON.stringify(paramsRef.value));

	if (queryRef.value.type) {
		delete params.classid;
		params.type = queryRef.value.type;
		return api.getUserWallList(params);
	} else {
		return api.getWall(params);
	}
};
/** 获取分类中壁纸列表（分类详情） */
const getWall = () => {
	getData()
		.then((res) => {
			if (res.errCode === 0) {
				const ids = wallListComputed.value.map((p) => p._id);
				const newData = res.data.filter((p) => !ids.includes(p._id));
				wallListComputed.value = wallListComputed.value.concat(newData);

				isDataRef.value = paramsRef.value.pageSize === res.data.length;

				if (queryRef.value.wallId) {
					if (isDataRef.value) {
						if (wallListComputed.value.some((p) => p._id === queryRef.value.wallId)) {
							uni.navigateTo({
								url: '/pages/preview/preview?' + queryStringRef.value
							}).finally(() => {
								uni.hideLoading();
							});
						} else {
							appendData();
						}
					} else {
						uni.showToast({
							icon: 'fail',
							title: '未找到指定壁纸'
						}).finally(() => {
							uni.hideLoading();
						});
					}
				}
			} else {
				uni.showToast({
					title: '获取壁纸数据失败',
					icon: 'error'
				});
			}
		})
		.catch(() => {
			uni.showToast({
				title: '获取壁纸数据失败',
				icon: 'error'
			});
		})
		.finally(() => {
			!queryRef.value.wallId && uni.hideLoading();
		});
};
/** 刷新壁纸数据 */
const appendData = () => {
	paramsRef.value.pageNum++;
	getWall();
};
// //////////////////////////////////////////////////events//////////////////////////////////////////////////
/** 进入预览界面 */
const previewClick = (data: WallI) => {
	queryRef.value.wallId = data._id;
	uni.navigateTo({
		url: '/pages/preview/preview?' + queryStringRef.value
	}).then(() => {
		queryRef.value.wallId = '';
	});
};
/** 返回上个界面 */
const backClick = () => {
	uni.navigateBack().catch(() => {
		uni.switchTab({
			url: '/pages/index/index'
		});
	});
};
// ///////////////////////////////////////////////////life///////////////////////////////////////////////////
onLoad((query: QueryI) => {
	query.classId && (paramsRef.value.classid = query.classId);
	queryRef.value = query;
	uni.setNavigationBarTitle({ title: classNameComputed.value });

	getWall();
});

onUnload(() => {
	dataStore.setWallData(null);
});

onReachBottom(() => {
	if (isDataRef.value) {
		appendData();
	}
});

onPullDownRefresh(() => {
	paramsRef.value.pageNum = 1;
	getWall();
});

onShareAppMessage(() => {
	return {
		title: basicData.title + '-' + classNameComputed.value,
		path: '/pages/classList/classList?' + queryStringRef.value
	};
});
// #ifdef MP-WEIXIN
onShareTimeline(() => {
	return {
		title: basicData.title + '-' + classNameComputed.value,
		query: queryStringRef.value
	};
});
// #endif
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
