import basicData from '@/unit/basicData';

/**
 * 定义请求参数接口
 */
interface RequestOptions {
	url: string; // 请求URL
	data?: any; // 请求的参数
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; // 请求方法
	header?: any; // 设置请求的 header，header 中不能设置 Referer。
	dataType?: string; // 如果设为 json，会尝试对返回的数据做一次 JSON.parse
	responseType?: string; // 设置响应的数据类型。合法值：text、arraybuffer
}

/**
 * 封装uni.request请求类
 */
 class Request {
	/**
	 * 发起GET请求
	 * @param options 请求参数
	 * @returns Promise<Response>
	 */
	static get<T = any>(options: RequestOptions): Promise<T> {
		return this.request({ ...options, method: 'GET' });
	}

	/**
	 * 发起POST请求
	 * @param options 请求参数
	 * @returns Promise<Response>
	 */
	static post<T = any>(options: RequestOptions): Promise<T> {
		return this.request({ ...options, method: 'POST' });
	}

	/**
	 * 发起网络请求
	 * @param options 请求参数
	 * @returns Promise<Response>
	 */
	private static request<T>(options: RequestOptions): Promise<T> {
		return new Promise((resolve, reject) => {
			uni.request({
				url: basicData.network.baseApi + options.url,
				data: options.data,
				method: options.method,
				header: {
					'content-type': 'application/json',
					'access-key': '189871'
				},
				dataType: options.dataType,
				responseType: options.responseType,
				success: (response) => {
					// 成功处理
					resolve(response.data as unknown as T);
				},
				fail: (error) => {
					// 错误处理
					reject(error);
				}
			});
		});
	}
}

export default Request;
