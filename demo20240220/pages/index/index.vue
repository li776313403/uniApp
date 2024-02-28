<!--
 * @Description: demo1页面
 * @Version: v1.0
 * @Author: LiWen
 * @Date: 2024-02-20 13:49:14
 * @LastEditors: LiWen
 * @LastEditTime: 2024-02-20 14:38:07
-->
<template>
	<view>
		首页
	</view>

	<view>
		<navigator url="/pages/classification/index" open-type="switchTab">跳转到分类</navigator>
	</view>

	<view>
		<button type="default" @click="showModal">showModal</button>
	</view>

	<view>
		<button type="primary" @click="showActionSheet">showActionSheet</button>
	</view>

	<view>
		<button type="warn" @click="setNavigationBarTitle">setNavigationBarTitle</button>
	</view>

	<view>
		<button type="default" @click="setTabBarBadge">setTabBarBadge</button>
		<button type="warn" @click="removeTabBarBadge">removeTabBarBadge</button>
		<button type="primary" @click="showTabBarRedDot">showTabBarRedDot</button>
		<button type="warn" @click="hideTabBarRedDot">hideTabBarRedDot</button>
	</view>

	<view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="messageRef" type="message">
			<uni-popup-message type="warning" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue"
	import { onReachBottom, onShow, onHide } from '@dcloudio/uni-app';

	const messageRef = ref<any | null>(null);
	const messageText = ref<string>('');

	onReachBottom(() => {
		messageText.value = '到底了';
		messageRef.value && messageRef.value.open();
	});

	const showModal = () => {
		uni.showModal({
			title: '是否跳转到分类？',
			content: '',
			placeholderText: '请输入分类名称',
			editable: true,
			success(res) {
				if (res.confirm) {
					if (res.content) {
						uni.switchTab({
							url: '/pages/classification/index'
						})
					}
				}
			}
		})
	};

	const showActionSheet = () => {
		uni.showActionSheet({
			itemList: ['分类1', '分类2', '分类3'],
			title: '请选择分类',
			itemColor: '#4cd964',
			alertText: '选择后会进行跳转',
			success(res) {
				uni.showToast({
					title: '跳转到分类' + res.tapIndex,
					icon: "success",
					success() {
						uni.switchTab({
							url: '/pages/classification/index'
						})
					}
				});
			}
		})
	};

	const setNavigationBarTitle = () => {
		uni.setNavigationBarTitle({
			title: '动态标题'
		});
		uni.setNavigationBarColor({
			frontColor: '#ffffff',
			backgroundColor: '#18bc37',
			animation: {
				duration: 3000,
				timingFunc: 'easeOut'
			}
		});

		uni.showNavigationBarLoading();
		setTimeout(() => uni.hideNavigationBarLoading(), 3000);
	};

	const setTabBarBadge = () => {
		uni.setTabBarBadge({
			index: 0,
			text: '1'
		})
	};

	const removeTabBarBadge = () => {
		uni.removeTabBarBadge({
			index: 0
		})
	};

	const showTabBarRedDot = () => {
		uni.showTabBarRedDot({
			index: 0
		})
	};
	
	const hideTabBarRedDot = () => {
		uni.hideTabBarRedDot({
			index: 0
		})
	};

	onShow(() => {
		uni.showToast({
			title: '进入首页',
			icon: 'success'
		})
	});

	onHide(() => {
		uni.showToast({
			title: '离开首页',
			icon: 'error'
		})
	});
</script>

<style lang="scss" scoped>
	view {
		color: black;
		text-align: center;
	}
</style>