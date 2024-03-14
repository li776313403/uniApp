<template>
	<view class="noticeLayout">
		<view class="title">
			<view class="tag" v-if="detailRef.select">
				<uni-tag inverted text="置顶" type="error" />
			</view>
			<view class="font">{{ detailRef.title }}</view>
		</view>

		<view class="info">
			<view class="item">{{ detailRef.author }}</view>
			<view class="item">
				<uni-dateformat :date="detailRef.publish_date" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>

		<view class="content">
			<mp-html :content="detailRef.content" />
		</view>

		<view class="count">阅读 {{ detailRef.view_count }}</view>
	</view>
</template>

<script lang="ts" setup>
// //////////////////////////////////////////////////import//////////////////////////////////////////////////
import * as api from '@/api/wallpaper';
import { ref } from 'vue';
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { WallNewsDetailI } from '../../interface/wallpaper';
import basicData from '../../unit/basicData';
// ///////////////////////////////////////////////////refs///////////////////////////////////////////////////
/** 壁纸详情数据 */
const detailRef = ref<WallNewsDetailI>({
	view_count: 0,
	publish_date: '',
	article_status: 0,
	title: '',
	author: '',
	content: '',
	select: false,
	_id: ''
});
/** 请求参数 */
const params = { id: '' };
// ///////////////////////////////////////////////////func///////////////////////////////////////////////////
/** 获取壁纸详情数据 */
const getNoticeDetail = () => {
	api.getWallNewsDetail(params)
		.then((res) => {
			if (res.errCode === 0) {
				detailRef.value = res.data;

				uni.setNavigationBarTitle({
					title: detailRef.value.title
				});
			} else {
				uni.showToast({
					title: '获取公告详情失败',
					icon: 'error'
				});
			}
		})
		.catch(() => {
			uni.showToast({
				title: '获取公告详情失败',
				icon: 'error'
			});
		});
};
// ///////////////////////////////////////////////////life///////////////////////////////////////////////////
onLoad((e) => {
	params.id = e.id;
	getNoticeDetail();
});

onShareAppMessage(() => {
	return {
		title: `${basicData.title}-公告-${detailRef.value.title}`,
		path: '/pages/notice/detail?id=' + detailRef.value._id
	};
});
// #ifdef MP-WEIXIN
onShareTimeline(() => {
	return {
		title: `${basicData.title}-公告-${detailRef.value.title}`,
		query: 'id=' + detailRef.value._id
	};
});
// #endif
</script>

<style lang="scss" scoped>
.noticeLayout {
	padding: 30rpx;
	.title {
		font-size: 40rpx;
		color: #111;
		line-height: 1.6em;
		padding-bottom: 30rpx;
		display: flex;
		.tag {
			transform: scale(0.8);
			transform-origin: left center;
			flex-shrink: 0;
		}
		.font {
			padding-left: 6rpx;
		}
	}
	.info {
		display: flex;
		align-items: center;
		color: #999;
		font-size: 28rpx;
		.item {
			padding-right: 20rpx;
		}
	}
	.content {
		padding: 50rpx 0;
	}
	.count {
		color: #999;
		font-size: 28rpx;
	}
}
</style>
