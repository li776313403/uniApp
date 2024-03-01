<template>
	<view class="homeLayout pageBg">
		<CustomNavBar></CustomNavBar>
		
		<view class="bannerClass">
			<swiper :indicator-dots="true" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" :autoplay="true" :interval="3000" :duration="1000" circular="true">
				<swiper-item>
					<image src="../../common/images/wallpaper/banner1.jpg" mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../common/images/wallpaper/banner2.jpg" mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../common/images/wallpaper/banner3.jpg" mode="aspectFill"></image>
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
					<swiper-item>文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容</swiper-item>
					<swiper-item>文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容</swiper-item>
					<swiper-item>文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容</swiper-item>
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
					<view class="box" v-for="item in 8">
						<image src="../../common/images/wallpaper/preview_small.webp" mode="aspectFill"></image>
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
				<ThemeItem v-for="item in 8"></ThemeItem>
				<ThemeItem :isMore="true"></ThemeItem>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
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
