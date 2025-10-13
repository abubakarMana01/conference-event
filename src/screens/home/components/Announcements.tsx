import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Announcement from './Announcement';
import { AppText } from '@/components';
import { COLORS } from '@/constants/colors';
import { useQuery } from '@tanstack/react-query';
import { fetchAnnouncements } from '@/services/announcements.service';

const Announcements = () => {
	const {
		data: announcementsData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['announcements'],
		queryFn: () => fetchAnnouncements({ pageParam: 1 }),
	});

	if (isLoading) return null;

	if (isError || !announcementsData?.data?.length) return null;

	return (
		<View style={styles.container}>
			<AppText
				style={{ marginTop: 12, fontWeight: '600', color: COLORS.primary }}
			>
				Announcements
			</AppText>
			{announcementsData?.data?.map((announcement, index) => (
				<Announcement
					key={announcement.id}
					announcement={announcement}
					isLastItem={announcementsData.data.length - 1 === index}
				/>
			))}
		</View>
	);
};

export default Announcements;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingTop: 2,
		paddingBottom: 4,
		backgroundColor: '#ebe2f9',
		borderRadius: 16,
		marginHorizontal: 16,
		marginBottom: 16,
		marginTop: 8,
	},
});
