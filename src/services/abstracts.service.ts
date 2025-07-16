import { IAbstract, PaginatedResponse } from '@/types';
import api from 'api';

export const fetchAbstracts = async ({
	pageParam = 1,
}): Promise<PaginatedResponse<IAbstract[]>> => {
	const res = await api.get(
		`/abstracts?populate=*&pagination[page]=${pageParam}&pagination[pageSize]=10`
	);
	return res.data;
};
