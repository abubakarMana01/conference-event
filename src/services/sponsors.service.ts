import { ISponsor, PaginatedResponse } from '@/types';
import api from 'api';

export const fetchSponsors = async () => {
	const response = await api.get<Promise<PaginatedResponse<ISponsor[]>>>(
		'/sponsors?populate=image'
	);
	return response.data;
};
