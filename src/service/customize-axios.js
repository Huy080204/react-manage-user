import axios from "axios";

const instance = axios.create({
	baseURL: "https://reqres.in",
});

instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data ? response.data : { status: response.status };
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		if (error.response) {
			return {
				status: error.response.status,
				data: error.response.data,
				header: error.response.header,
			};
		} else if (error.request) {
			console.log(error.request);
		} else {
			console.log(">>> Error:", error.message);
		}
		return Promise.reject(error);
	}
);

export default instance;
