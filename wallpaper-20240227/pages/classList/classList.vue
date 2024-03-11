<template>
	<view class="classListLayout">
		<view v-if="wallListComputed.length === 0 && isDataRef" class="loadingLayout" :style="{ marginTop: backIconTopComputed + 'px' }">
			<uni-load-more status="loading"></uni-load-more>
		</view>

		<view @click="backClick" class="goBack" :style="{ top: backIconTopComputed + 'px', lfet: dy_TitleLeftIconDistanceComputed + 'px' }">
			<uni-icons type="back" size="20"></uni-icons>
		</view>

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
	/** 分类名称 */
	className: string;
	/** 壁纸ID */
	wallId: string;
}
// ///////////////////////////////////////////////////init///////////////////////////////////////////////////
/** 布局内容store */
const layoutStore = useLayoutStore();
/** 数据存储 */
const dataStore = useDataStore();
// ///////////////////////////////////////////////////refs///////////////////////////////////////////////////
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
const queryRef = ref<QueryI>({ classId: '', className: '', wallId: '' });
/** 页面代入参数string格式 */
const queryStringRef = computed(() => {
	return queryAndParamHelper.tansParams(queryRef.value);
});
/** 交界口请求参数 */
const paramsRef = ref<WallSearchI>({
	classid: '',
	pageNum: 1,
	pageSize: 12
});
// ///////////////////////////////////////////////////func///////////////////////////////////////////////////
/** 获取分类中壁纸列表（分类详情） */
const getWall = () => {
	uni.showLoading({
		title: '数据加载中...'
	});
	api.getWall(paramsRef.value)
		.then((res) => {
			if (res.errCode === 0) {
				wallListComputed.value = wallListComputed.value.concat(res.data);
				isDataRef.value = paramsRef.value.pageSize === res.data.length;

				if (queryRef.value.wallId) {
					if (isDataRef.value) {
						if (wallListComputed.value.some((p) => p._id === queryRef.value.wallId)) {
							uni.hideLoading();

							uni.navigateTo({
								url: '/pages/preview/preview?' + queryStringRef.value
							});
						} else {
							appendData();
						}
					} else {
						uni.showToast({
							icon:'fail',
							title:'未找到当前壁纸'
						})
					}
				}
			} else {
				uni.showToast({
					title: '获取情数据失败',
					icon: 'error'
				});
				console.error('获取数据失败', res.errMsg);
			}
		})
		.catch((ex) => {
			uni.showToast({
				title: '获取数据失败',
				icon: 'error'
			});
			console.error('获取数据失败', ex);
		})
		.finally(() => {
			uni.hideLoading();
		});
};
/** 刷新壁纸数据 */
const appendData = (): void => {
	paramsRef.value.pageNum++;
	getWall();
};
// //////////////////////////////////////////////////events//////////////////////////////////////////////////
const previewClick = (data: WallI) => {
	queryRef.value.wallId = data._id;
	uni.navigateTo({
		url: '/pages/preview/preview?' + queryStringRef.value
	}).then(() => {
		queryRef.value.wallId = '';
	});
};
/** 返回上个界面 */
const backClick = (): void => {
	uni.navigateBack().catch(() => {
		uni.switchTab({
			url: '/pages/index/index'
		});
	});
};
// ///////////////////////////////////////////////////life///////////////////////////////////////////////////
onLoad((query: QueryI) => {
	query.className = decodeURIComponent(query.className);
	queryRef.value = query;

	paramsRef.value.classid = queryRef.value.classId;

	uni.setNavigationBarTitle({
		title: queryRef.value.className || '分类列表'
	});

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
		title: basicData.title + '-' + queryRef.value.className,
		path: '/pages/classList/classList?' + queryStringRef.value
	};
});
// #ifdef MP-WEIXIN
onShareTimeline(() => {
	return {
		title: basicData.title + '-' + queryRef.value.className,
		path: '/pages/classList/classList?' + queryStringRef.value
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
