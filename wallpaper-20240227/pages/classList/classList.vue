<template>
	<view class="classListLayout">
		<view class="content">
			<navigator url="" class="item" v-for="item in 10">
				<image src="../../common/images/wallpaper/preview1.jpg" mode="aspectFill"></image>
			</navigator>
		</view>
	</view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.classListLayout {
	.content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5rpx;
		padding: 5rpx;
		
		.item{
			height: 440rpx;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>
