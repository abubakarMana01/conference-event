// import { SectionList, StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { AppText } from '@/components';
// import ListSeparator from '@/components/ListSeparator';
// import { COLORS } from '@/constants/colors';

// const Agendas = () => {
// 	return (
// 		<View style={styles.wrapper}>
// 			<View style={styles.main}>
// 				<SectionList
// 					bounces={false}
// 					sections={DATA}
// 					keyExtractor={(item, index) => item + index}
// 					renderItem={({ item }) => <Text style={styles.title}>- {item}</Text>}
// 					SectionSeparatorComponent={() => <ListSeparator size={16} />}
// 					ItemSeparatorComponent={() => <ListSeparator size={4} />}
// 					renderSectionHeader={({ section: { title } }) => (
// 						<Text style={styles.sectionHeader}>{title}</Text>
// 					)}
// 				/>
// 			</View>
// 		</View>
// 	);
// };

// const DATA = [
// 	{
// 		title: 'Day 1',
// 		data: ['Pizza', 'Burger', 'Risotto'],
// 	},
// 	{
// 		title: 'Day 2',
// 		data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
// 	},
// 	{
// 		title: 'Day 3',
// 		data: ['Water', 'Coke', 'Beer'],
// 	},
// 	{
// 		title: 'Day 4',
// 		data: ['Cheese Cake', 'Ice Cream'],
// 	},
// ];

// export default Agendas;

// const styles = StyleSheet.create({
// 	wrapper: {},
// 	header: {
// 		fontSize: 20,
// 		fontWeight: '600',
// 	},
// 	main: {
// 		marginTop: 10,
// 	},
// 	sectionHeader: {
// 		fontWeight: '500',
// 		fontSize: 16,
// 		color: COLORS.primary,
// 	},
// 	title: {},
// });

import {
	SectionList,
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Linking,
} from 'react-native';
import React from 'react';
import { AppText } from '@/components';
import ListSeparator from '@/components/ListSeparator';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

const Agendas = () => {
	const user = {
		name: 'Alex Johnson',
		country: 'United States',
		category: 'Premium Attendee',
		avatar: require('@/assets/event-poster.png'),
		checkedIn: true,
	};

	const liveSession = {
		title: 'Keynote: Future of Technology',
		time: '10:00 AM - 11:30 AM',
		link: 'https://zoom.us/j/123456789',
		platform: 'zoom', // or 'youtube'
	};

	return (
		<View style={styles.container}>
			{/* User Profile Section */}
			<View style={styles.profileCard}>
				<View style={styles.profileHeader}>
					<Image source={user.avatar} style={styles.avatar} />
					<View style={styles.userInfo}>
						<AppText style={styles.userName}>{user.name}</AppText>
						<AppText style={styles.userDetail}>{user.country}</AppText>
						<AppText style={styles.userDetail}>{user.category}</AppText>
					</View>
				</View>

				{/* Check-in Status */}
				<View
					style={[
						styles.checkInStatus,
						user.checkedIn ? styles.checkedIn : styles.notCheckedIn,
					]}
				>
					<Ionicons
						name={user.checkedIn ? 'checkmark-circle' : 'time'}
						size={20}
						color={COLORS.white}
					/>
					<AppText style={styles.checkInText}>
						{user.checkedIn ? 'Checked In' : 'Not Checked In'}
					</AppText>
				</View>
			</View>

			{/* Live Session Card */}
			{liveSession && (
				<TouchableOpacity
					style={styles.liveSessionCard}
					onPress={() => Linking.openURL(liveSession.link)}
				>
					<View style={styles.liveSessionHeader}>
						<View style={styles.liveIndicator}>
							<View style={styles.livePulse} />
							<AppText style={styles.liveText}>LIVE NOW</AppText>
						</View>
						<Ionicons
							name={
								liveSession.platform === 'zoom' ? 'videocam' : 'logo-youtube'
							}
							size={24}
							color={COLORS.white}
						/>
					</View>
					<AppText style={styles.sessionTitle}>{liveSession.title}</AppText>
					<AppText style={styles.sessionTime}>{liveSession.time}</AppText>
					<AppText style={styles.joinText}>Tap to join →</AppText>
				</TouchableOpacity>
			)}

			{/* Agenda/Schedule Section */}
			<View style={styles.scheduleContainer}>
				<AppText style={styles.sectionHeader}>Event Schedule</AppText>
				<SectionList
					bounces={false}
					sections={DATA}
					keyExtractor={(item, index) => `${item} ${index}`}
					renderItem={({ item }) => (
						<View style={styles.agendaItem}>
							<View style={styles.timeIndicator}>
								<View style={styles.timeDot} />
								<View style={styles.timeLine} />
							</View>
							<AppText style={styles.agendaTitle}>{item.title}</AppText>
							<AppText style={styles.agendaTime}>{item.time}</AppText>
							{item.location && (
								<View style={styles.locationTag}>
									<Ionicons name="location" size={14} color={COLORS.primary} />
									<AppText style={styles.locationText}>{item.location}</AppText>
								</View>
							)}
						</View>
					)}
					SectionSeparatorComponent={() => <ListSeparator size={16} />}
					ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
					renderSectionHeader={({ section: { title } }) => (
						<View style={styles.dayHeader}>
							<AppText style={styles.dayTitle}>{title}</AppText>
						</View>
					)}
				/>
			</View>
		</View>
	);
};

// Enhanced sample data
const DATA = [
	{
		title: 'Day 1 - June 10',
		data: [
			{
				title: 'Registration & Breakfast',
				time: '8:00 AM - 9:00 AM',
				location: 'Main Lobby',
			},
			{
				title: 'Opening Keynote',
				time: '9:30 AM - 11:00 AM',
				location: 'Grand Ballroom',
			},
			{ title: 'Lunch Break', time: '12:00 PM - 1:30 PM' },
		],
	},
	{
		title: 'Day 2 - June 11',
		data: [
			{
				title: 'Workshop: Advanced Techniques',
				time: '9:00 AM - 12:00 PM',
				location: 'Room A',
			},
			{
				title: 'Panel Discussion',
				time: '2:00 PM - 3:30 PM',
				location: 'Grand Ballroom',
			},
		],
	},
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	profileCard: {
		backgroundColor: COLORS.white,
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},
	profileHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	avatar: {
		width: 64,
		height: 64,
		borderRadius: 32,
		marginRight: 16,
	},
	userInfo: {
		flex: 1,
	},
	userName: {
		fontSize: 18,
		fontWeight: '600',
		color: COLORS.dark,
		marginBottom: 4,
	},
	userDetail: {
		fontSize: 14,
		color: COLORS.grey,
		marginBottom: 2,
	},
	checkInStatus: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 20,
		alignSelf: 'flex-start',
	},
	checkedIn: {
		backgroundColor: COLORS.success,
	},
	notCheckedIn: {
		backgroundColor: COLORS.warning,
	},
	checkInText: {
		color: COLORS.white,
		marginLeft: 6,
		fontWeight: '500',
	},
	liveSessionCard: {
		backgroundColor: COLORS.primary,
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
	},
	liveSessionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
	},
	liveIndicator: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	livePulse: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: COLORS.danger,
		marginRight: 8,
	},
	liveText: {
		color: COLORS.white,
		fontWeight: 'bold',
		fontSize: 14,
	},
	sessionTitle: {
		color: COLORS.white,
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 4,
	},
	sessionTime: {
		color: COLORS.white,
		opacity: 0.9,
		fontSize: 14,
		marginBottom: 8,
	},
	joinText: {
		color: COLORS.white,
		fontWeight: '500',
		fontSize: 14,
		textAlign: 'right',
	},
	scheduleContainer: {
		flex: 1,
		backgroundColor: COLORS.white,
		borderRadius: 16,
		padding: 16,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},
	sectionHeader: {
		fontSize: 18,
		fontWeight: '600',
		color: COLORS.dark,
		marginBottom: 16,
	},
	dayHeader: {
		backgroundColor: COLORS.greyLightPlus,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 8,
		marginBottom: 8,
	},
	dayTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: COLORS.primary,
	},
	agendaItem: {
		flexDirection: 'row',
		paddingVertical: 12,
		paddingLeft: 8,
	},
	timeIndicator: {
		width: 24,
		alignItems: 'center',
		marginRight: 12,
	},
	timeDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: COLORS.primary,
	},
	timeLine: {
		width: 2,
		flex: 1,
		backgroundColor: COLORS.greyLight,
		marginTop: 4,
	},
	agendaTitle: {
		fontSize: 15,
		fontWeight: '500',
		color: COLORS.dark,
		flex: 1,
	},
	agendaTime: {
		fontSize: 13,
		color: COLORS.grey,
		marginTop: 4,
	},
	locationTag: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 4,
	},
	locationText: {
		fontSize: 13,
		color: COLORS.primary,
		marginLeft: 4,
	},
	itemSeparator: {
		height: 1,
		backgroundColor: COLORS.greyLight,
		marginLeft: 36,
	},
});

export default Agendas;
