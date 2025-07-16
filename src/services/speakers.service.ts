import { ISpeaker, PaginatedResponse } from '@/types';
import api from 'api';

export const fetchSpeakers = async () => {
	const response = await api.get<Promise<PaginatedResponse<ISpeaker[]>>>(
		'/speakers?populate=image'
	);
	return (await response.data).data;
};
