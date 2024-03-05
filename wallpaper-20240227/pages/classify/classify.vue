<template>
	<view class="classLayout pageBg">
		<CustomNavBar>分类</CustomNavBar>
		<view class="classify">
			<ThemeItem v-for="ite, in 15"></ThemeItem>
		</view>
	</view>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
	.classLayout {
		.classify {
			display: grid;
			padding: 30rpx;
			grid-template-columns: repeat(3, 1fr);
			gap: 15rpx;
		}
	}
</style>