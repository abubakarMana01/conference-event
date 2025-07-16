import api from 'api';

export const loginUser = async (email: string, passcode: string) => {
	const response = await api.post('/auth/local', {
		identifier: email,
		password: passcode,
	});
	return response.data;
};
