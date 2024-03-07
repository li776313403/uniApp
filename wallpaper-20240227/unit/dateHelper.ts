import numberHelper from './numberHelper';

/** @description: 日期相关帮助类 */
const dateTimeHelper = {
	/**
	 * @description: 日期格式化
	 * @param {Date} time 时间
	 * @param {string} pattern 格式:{y}-{m}-{d} {h}:{i}:{s}
	 * @return {*} 格式化后的日期
	 */
	parseTime: function (time: Date | string | number | null = null, pattern?: string): string {
		if (arguments.length === 0 || !time) {
			time = new Date();
		}
		const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
		let date: Date | string | number;
		if (typeof time === 'object') {
			date = time;
		} else {
			if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
				time = parseInt(time, 10);
			} else if (typeof time === 'string') {
				time = time
					.replace(/-/gm, '/')
					.replace('T', ' ')
					.replace(/\.[\d]{3}/gm, '');
			}
			if (typeof time === 'number' && time.toString().length === 10) {
				time = time * 1000;
			}
			date = new Date(time);
		}
		const formatObj = {
			y: date.getFullYear(),
			m: date.getMonth() + 1,
			d: date.getDate(),
			h: date.getHours(),
			i: date.getMinutes(),
			s: date.getSeconds(),
			a: date.getDay()
		};
		return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
			let value = formatObj[key];
			// Note: getDay() returns 0 on Sunday
			if (key === 'a') {
				return ['日', '一', '二', '三', '四', '五', '六'][value];
			}
			if (result.length > 0 && value < 10) {
				value = '0' + value;
			}
			return value || 0;
		});
	},
	/**
	 * @description: 通话时长换算
	 * @param {string} startTime 开始时间
	 * @return {*} 时间
	 */
	callTimes: (startTime: string): string => {
		const intervalTime = new Date().getTime() - new Date(startTime).getTime();
		const hours = Math.floor(parseFloat((intervalTime / 1000 / 60 / 60).toString()));
		const minute = Math.floor(parseFloat(((intervalTime - 1000 * 60 * 60 * hours) / 1000 / 60).toString()));
		const second = Math.floor(parseFloat((intervalTime - 1000 * 60 * 60 * hours - 1000 * 60 * minute).toString()) / 1000);
		return `${numberHelper.zeroFill(hours)}:${numberHelper.zeroFill(minute)}:${numberHelper.zeroFill(second)}`;
	},
	/**
	 * @description: 时间变化格式化展示
	 * @param {string} time 时间
	 * @param {string} option 格式:{y}-{m}-{d} {h}:{i}:{s}
	 * @return {*} 格式化时间数据
	 */
	formatTime: (time: string | number | Date, option: string = null): string => {
		if (String(time).length === 10) {
			time = parseInt(time.toString(), 10) * 1000;
		} else {
			time = Number(time);
		}
		const d = new Date(time);
		const now = Date.now();

		const diff = (now - d.getTime()) / 1000;

		if (diff < 30) {
			return '刚刚';
		} else if (diff < 3600) {
			return Math.ceil(diff / 60) + '分钟前';
		} else if (diff < 3600 * 24) {
			return Math.ceil(diff / 3600) + '小时前';
		} else if (diff < 3600 * 24 * 2) {
			return '1天前';
		} else if (diff < 3600 * 24 * 8) {
			return '1周前';
		} else if (diff < 3600 * 24 * 32) {
			return '1月前';
		}

		if (option) {
			const result = dateTimeHelper.parseTime(time, option);
			if (result) {
				return result;
			} else {
				return '';
			}
		} else {
			return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
		}
	}
};
export default dateTimeHelper;
