/** uni.request配置信息 */
interface HttpRequestI {
	url : string;
	timeout ?: number;
	method ?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	data ?: AnyObject;
	header ?: AnyObject;
	complete ?: () => {};
}

class HttpRequest {
	/** 基础访问路径 */
	baseURL : string | null = '';

	constructor(base_url : string = '') {
		this.baseURL = base_url;
	}

	get<T>(params : HttpRequestI) {
		params.method = 'GET';
		return this.request<T>(params);
	}

	post(params : HttpRequestI) {
		params.method = 'POST';
		return this.request(params);
	}

	put(params : HttpRequestI) {
		params.method = 'PUT';
		return this.request(params);
	}

	delete(params : HttpRequestI) {
		params.method = 'DELETE';
		return this.request(params);
	}

	request<T>(params : HttpRequestI) {
		return new Promise<T>((resolve, reject) => {
			uni.request({
				url: this.baseURL + params.url,
				method: params.method || 'GET',
				data: params.data || {},
				timeout: params.timeout || 10 * 1000,
				header: {
					'content-type': 'application/json',
					...(params.header || {})
				},
				success: (res) => {
					if (res.statusCode === 200) {
						resolve(res.data as T);
					} else {
						reject(res.data);
					}
				},
				fail: (err) => {
					reject(err);
				},
				complete: params.complete
			})
		});
	}
}

export default HttpRequest;