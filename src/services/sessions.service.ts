import type { ISession, PaginatedResponse } from '@/types';
import api from 'api';

export const fetchSessions = async ({
	pageParam = 1,
}): Promise<PaginatedResponse<ISession[]>> => {
	const response = await api.get(
		`/sessions?pagination[page]=${pageParam}&pagination[pageSize]=10`
	);
	return response.data;
};

export const fetchSessionsForHome = async () => {
	const response = await api.get<Promise<PaginatedResponse<ISession[]>>>(
		'/sessions?filters[$or][0][state][$eq]=live&filters[$or][1][state][$eq]=live&pagination[pageSize]=2&pagination[page]=1&sort[0]=state:asc'
	);
	return (await response.data).data;
};
