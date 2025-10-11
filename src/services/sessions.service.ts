import type { ISession, PaginatedResponse } from '@/types';
import api from 'api';

export const fetchSessions = async ({
	pageParam = 1,
}): Promise<PaginatedResponse<ISession[]>> => {
	const response = await api.get(
		'/sessions?pagination[page]=${pageParam}&pagination[pageSize]=10'
	);
	return response.data;
};

export const fetchSessionsForHome = async () => {
	const response = await api.get<Promise<PaginatedResponse<ISession[]>>>(
		'/sessions?filters[$or][state][$eq]=live&filters[$or][state][$eq]=upcoming&sort[0]=state:asc&pagination[page]=1&pagination[pageSize]=1'
	);
	return (await response.data).data;
};
