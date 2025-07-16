import type { ISchedule, ISession, PaginatedResponse } from '@/types';
import api from 'api';

export const fetchSessions = async () => {
	const response = await api.get<Promise<PaginatedResponse<ISession[]>>>(
		'/sessions'
	);
	return (await response.data).data;
};
