import { IAbstract, IAnnouncement, PaginatedResponse } from '@/types';
import api from 'api';

export const fetchAnnouncements = async ({
	pageParam = 1,
}): Promise<PaginatedResponse<IAnnouncement[]>> => {
	const res = await api.get(
		`/announcements?pagination[page]=${pageParam}&pagination[pageSize]=100&sort[0]=order:asc`
	);
	return res.data;
};
