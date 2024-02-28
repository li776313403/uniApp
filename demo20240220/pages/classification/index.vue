<template>
	<view class="segmentedControClass">
		<uni-segmented-control :current="segmentedControlRef.current" :values="segmentedControlRef.items"
			@clickItem="segmentedControlClick" styleType="button" activeColor="#00aa00"></uni-segmented-control>
	</view>

	<view class="imagePanl" v-for="(item,index) in dataRef" :key="item._id">
		<image :src="item.url" mode="widthFix" lazy-load="true" @click="previewClick(item)"> </image>

		<view class="imagePanl2">
			<view class="imageContent">
				{{ `${(index + 1)}.${item.content}`}}
			</view>
			<view class="imageAuthor">
				一{{`${item.author}-${item.source}`}}
			</view>
		</view>
	</view>

	<view class="floatTool" v-show="showRightBtnsRef">
		<view @click="refreshClick">
			<uni-icons type="refresh-filled" size="40" color="white"></uni-icons>
		</view>
		<view @click="backTopClick">
			<uni-icons type="arrow-up" size="40" color="white"></uni-icons>
		</view>
	</view>

	<view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<script lang="ts" setup>
	//////////////////////////////////////////////////import//////////////////////////////////////////////////
	import { ref, computed } from 'vue';
	import { onReady, onPullDownRefresh, onReachBottom, onPageScroll } from '@dcloudio/uni-app';
	import HttpRequest from '../../utils/request';
	import { PetCollectionI } from '../../entity/tools.js';
	import { ResultI } from '../../entity/public.js'
	///////////////////////////////////////////////////init///////////////////////////////////////////////////
	const request = new HttpRequest('https://tea.qingnian8.com');
	let screenHeight = 0;
	///////////////////////////////////////////////////refs///////////////////////////////////////////////////
	/** 图片数据 */
	const dataRef = ref<Array<PetCollectionI>>([]);
	/** 隐藏悬浮按钮是否展示，默认首屏不展示 */
	const showRightBtnsRef = ref<boolean>(false);
	/** 宠物信息分段器 */
	const segmentedControlRef = ref({
		items: ['全部', '猫', '狗'],
		values: ['all', 'cat', 'dog'],
		current: 0
	});
	/** 宠物选中类型 */
	const petTypeComputed = computed<string>(() => segmentedControlRef.value.values[segmentedControlRef.value.current]);
	///////////////////////////////////////////////////func///////////////////////////////////////////////////
	/** 获取图片数据 0刷新 1追加 */
	const getImages = async (type : number = 0) => {
		await request.get<ResultI<Array<PetCollectionI>>>({
			url: '/tools/petShow',
			data: { size: 5, type: petTypeComputed.value },
			header: {
				'access-key': '690855'
			}
		}).then((res) => {
			let data : PetCollectionI[];

			if (res.errCode === 0) {
				data = res.data.length > 0 ? res.data : [];
			} else {
				uni.showToast({
					icon: 'error',
					title: '接口加载失败'
				}).finally(() => {
					data = [];
					console.error('接口请求失败', res.errMsg);
				})
			}

			if (type === 0) {
				dataRef.value = data;
			} else {
				dataRef.value = dataRef.value.concat(data);
			}
		}).catch((ex) => {
			uni.showToast({
				title: '接口请求失败',
				icon: 'error',
			}).finally(() => {
				dataRef.value = [];
				console.error('接口请求失败', ex.errMsg);
			})
		});
	};
	//////////////////////////////////////////////////events//////////////////////////////////////////////////
	/** 图片预览 */
	const previewClick = (imageItem : PetCollectionI) => {
		uni.previewImage({
			urls: dataRef.value.map(p => p.url),
			current: imageItem.url,
		})
	};
	/** 点击刷新 */
	const refreshClick = () => uni.startPullDownRefresh();
	/** 点击回到顶部 */
	const backTopClick = () => uni.pageScrollTo({ scrollTop: 0 });
	/** 获取屏幕高度 */
	const getScreenHeight = () => {
		uni.getSystemInfo({
			success: (res) => {
				screenHeight = res.screenHeight;
			}
		});
	};
	/** 分段器点击事件 */
	const segmentedControlClick = (e: { currentIndex: number; }) => {
		segmentedControlRef.value.current = e.currentIndex;
		getImages();
	};
	///////////////////////////////////////////////////life///////////////////////////////////////////////////
	onReady(() => {
		getImages();
		getScreenHeight();
	});

	onPullDownRefresh(() => {
		getImages().finally(() => uni.stopPullDownRefresh());
	});

	onPageScroll((e) => {
		showRightBtnsRef.value = !(screenHeight > e.scrollTop);
	});

	onReachBottom(() => {
		getImages(1)
	});
</script>

<style lang="scss" scoped>
	.segmentedControClass {
		padding: 10rpx;
	}

	.imagePanl {
		padding: 10rpx;
		text-align: center;

		>image {
			border: solid 1rpx $uni-text-color-grey;
			border-radius: $uni-border-radius-lg;
			width: 600rpx;
		}

		.imagePanl2 {
			width: 600rpx;
			display: inline-block;

			.imageContent {
				color: $uni-text-color;
				text-align: left;
				padding: 10rpx;
			}

			.imageAuthor {
				color: $uni-text-color-grey;
				text-align: right;
			}
		}
	}

	.floatTool {
		position: fixed;
		right: 30rpx;
		bottom: env(safe-area-inset-bottom);

		>view {
			color: white;
			width: 80rpx;
			height: 80rpx;
			background-color: rgba(0, 0, 0, 0.5);
			border-radius: 50%;
			margin-bottom: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border: solid 1px $uni-text-color-grey;
		}
	}
</style>