import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL + '/api',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

// Request Interceptor to attach JWT
api.interceptors.request.use(
	async (config) => {
		const saveAuthState = await AsyncStorage.getItem('auth');
		const parsedToken = saveAuthState ? JSON.parse(saveAuthState).jwt : null;
		if (parsedToken) {
			config.headers.Authorization = `Bearer ${parsedToken}`;
		}
		return config;
	},
	(error) => {
		console.error('Request error:', error);
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const message =
			error?.response?.data?.message ||
			error?.message ||
			'Something went wrong. Please try again.';

		console.error('API Error:', message);

		return Promise.reject(new Error(message));
	}
);

export default api;
