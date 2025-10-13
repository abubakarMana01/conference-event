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
import { AppText } from '@/components';

const EventHome = () => {
	const { data } = useQuery({
		queryKey: ['sessionsForHome'],
		// queryFn: () => fetchSessions({ pageParam: 1 }),
		queryFn: fetchSessionsForHome,
	});

	const { data: announcementsData } = useQuery({
		queryKey: ['announcements'],
		queryFn: () => fetchAnnouncements({ pageParam: 1 }),
	});

	return (
		<ScrollView contentContainerStyle={styles.scrollView}>
			<View
				style={{
					paddingHorizontal: 16,
					paddingTop: 2,
					paddingBottom: 4,
					backgroundColor: '#ebe2f9',
					borderRadius: 16,
					marginHorizontal: 16,
					marginBottom: 16,
					marginTop: 8,
				}}
			>
				{announcementsData?.data?.map((announcement, index) => (
					<Announcement
						key={announcement.id}
						announcement={announcement}
						isLastItem={announcementsData.data.length - 1 === index}
					/>
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
