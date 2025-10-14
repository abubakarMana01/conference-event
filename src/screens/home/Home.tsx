import { StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import EventSchedule from './components/EventSchedule';
import LiveSession from './components/LiveSession';
import { fetchSessionsForHome } from '@/services/sessions.service';
import { useQuery } from '@tanstack/react-query';
import Announcements from './components/Announcements';

const EventHome = () => {
	const { data } = useQuery({
		queryKey: ['sessionsForHome'],
		queryFn: fetchSessionsForHome,
	});

	return (
		<ScrollView contentContainerStyle={styles.scrollView}>
			<Announcements />
			{!!data?.data.length && <LiveSession session={data?.data[0]} />}
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
