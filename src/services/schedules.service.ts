import type { ISchedule, PaginatedResponse } from '@/types';
import api from 'api';

export const fetchSchedules = async () => {
	const response = await api.get<Promise<PaginatedResponse<ISchedule[]>>>(
		'/schedules?populate=*&sort=order:asc'
	);
	return (await response.data).data;
};
