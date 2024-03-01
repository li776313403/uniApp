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
 * 定义返回数据的接口
 */
interface Response<T = any> {
	data: T; // 服务器返回的数据
	statusCode: number; // 服务器返回的 HTTP 状态码
	header: any; // 服务器返回的头信息
}

/**
 * 封装uni.request请求类
 */
class Request {
	/** 访问前缀 */
	private baseUrl: string;

	/** 访问前缀 */
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	/**
	 * 发起GET请求
	 * @param options 请求参数
	 * @returns Promise<Response>
	 */
	get<T = any>(options: RequestOptions): Promise<Response<T>> {
		return this.request({ ...options, method: 'GET' });
	}

	/**
	 * 发起POST请求
	 * @param options 请求参数
	 * @returns Promise<Response>
	 */
	post<T = any>(options: RequestOptions): Promise<Response<T>> {
		return this.request({ ...options, method: 'POST' });
	}

	/**
	 * 发起网络请求
	 * @param options 请求参数
	 * @returns Promise<Response>
	 */
	private request<T>(options: RequestOptions): Promise<Response<T>> {
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.baseUrl + options.url,
				data: options.data,
				method: options.method,
				header: options.header,
				dataType: options.dataType,
				responseType: options.responseType,
				success: (response) => {
					// 成功处理
					resolve(response as unknown as Response<T>);
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
