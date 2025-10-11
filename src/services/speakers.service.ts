import { ISpeaker, PaginatedResponse } from '@/types';
import api from 'api';

export const fetchSpeakers = async () => {
	const response = await api.get<Promise<PaginatedResponse<ISpeaker[]>>>(
		'/speakers?populate=image&sort[0]=order:asc'
	);
	return (await response.data).data;
};
