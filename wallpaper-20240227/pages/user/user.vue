<template>
	<view class="userLayout pageBg">
		<view class="userInfo">
			<view class="avatar">
				<image src="../../static/images/xxmLogo.png" mode="aspectFill"></image>
			</view>
			<view class="ip">192.168.0.1</view>
			<view class="address">来自于-山东</view>
		</view>
		<view class="section">
			<view class="list">
				<navigator class="row" url="/pages/classList/classList">
					<view class="left">
						<uni-icons type="download-filled" size="20"></uni-icons>
						<view class="text">我的下载</view>
					</view>
					<view class="right">
						<view class="text">0</view>
						<uni-icons type="right" size="15"></uni-icons>
					</view>
				</navigator>

				<navigator class="row" url="/pages/classList/classList">
					<view class="left">
						<uni-icons type="star-filled" size="20"></uni-icons>
						<view class="text">我的评分</view>
					</view>
					<view class="right">
						<view class="text">0</view>
						<uni-icons type="right" size="15"></uni-icons>
					</view>
				</navigator>

				<view class="row">
					<view class="left">
						<uni-icons type="chatboxes-filled" size="20"></uni-icons>
						<view class="text">联系客服</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="15"></uni-icons>
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<button class="contactService" type="default" open-type="contact">联系客服</button>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<button class="contactService" type="default" @click="telClick">拨打电话</button>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="section">
			<view class="list">
				<view class="row">
					<view class="left">
						<uni-icons type="notification-filled" size="20"></uni-icons>
						<view class="text">订阅更新</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="15"></uni-icons>
					</view>
				</view>

				<view class="row">
					<view class="left">
						<uni-icons type="flag-filled" size="20"></uni-icons>
						<view class="text">常见问题</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="15"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	/** 拨打电话 */
	const telClick = () : void => {
		uni.makePhoneCall({
			phoneNumber: '17600569176'
		})
	}
</script>

<style lang="scss" scoped>
	.userLayout {
		.userInfo {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 50rpx 0;

			.avatar {
				width: 160rpx;
				height: 160rpx;
				border-radius: $uni-border-radius-circle;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.ip {
				font-size: 40rpx;
				color: $uni-text-color;
				padding: 20rpx 0 5rpx;
			}

			.address {
				font-size: 28rpx;
				color: $text-font-color-3;
			}
		}

		.section {
			width: 690rpx;
			margin: 50rpx auto;
			border: solid 1px $text-font-color-4;
			border-radius: $uni-border-radius-lg;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);

			.list {
				.row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0px 30rpx;
					height: 100rpx;
					border-bottom: solid 1px $text-font-color-4;
					position: relative;
					background-color: $uni-text-color-inverse;

					:deep() {
						.uni-icons {
							color: $brand-theme-color !important;
						}
					}

					&:last-child {
						border-bottom: none;
					}

					.left {
						display: flex;
						align-items: center;

						.text {
							padding-left: 10rpx;
							color: $text-font-color-2;
						}
					}

					.right {
						display: flex;
						align-items: center;
						
						:deep() {
							.uni-icons {
								color: $text-font-color-3 !important;
							}
						}

						.text {
							font-size: 28rpx;
							color: $text-font-color-3;
						}
					}

					.contactService {
						position: absolute;
						top: 0;
						left: 0;
						height: 100rpx;
						width: 100%;
						opacity: 0;
					}
				}
			}
		}
	}
</style>