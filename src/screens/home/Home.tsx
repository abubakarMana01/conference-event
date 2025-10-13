import { StyleSheet, ScrollView, View } from 'react-native';
import React from 'react';
import EventSchedule from './components/EventSchedule';
import LiveSession from './components/LiveSession';
import {
	fetchSessions,
	fetchSessionsForHome,
} from '@/services/sessions.service';
import { useQuery } from '@tanstack/react-query';
import { fetchAnnouncements } from '@/services/announcements.service';
import Announcement from './components/Announcement';

const EventHome = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['sessionsForHome'],
		// queryFn: () => fetchSessions({ pageParam: 1 }),
		queryFn: fetchSessionsForHome,
	});

	const {
		data: announcementsData,
		refetch,
		error,
	} = useQuery({
		queryKey: ['announcements'],
		queryFn: () => fetchAnnouncements({ pageParam: 1 }),
	});

	return (
		<ScrollView contentContainerStyle={styles.scrollView}>
			<View style={{ padding: 16, paddingBottom: 0, marginBottom: 16 }}>
				{announcementsData?.data?.map((announcement) => (
					<Announcement key={announcement.id} announcement={announcement} />
				))}
			</View>

			{data && <LiveSession session={data?.data[0]} />}

			<EventSchedule />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {},
});

export default EventHome;
