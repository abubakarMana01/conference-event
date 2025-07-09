import {
	StyleSheet,
	View,
	Pressable,
	Linking,
	ScrollView,
	Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { AppText } from '@/components';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const EventHome = () => {
	const [index, setIndex] = useState(0);
	const [routes] = useState(
		DATA.map((day) => ({ key: day.title, title: day.title.split(' - ')[0] }))
	);

	const renderScene = SceneMap(
		DATA.reduce<Record<string, React.ComponentType>>((acc, day) => {
			acc[day.title] = () => <DaySchedule dayData={day} />;
			return acc;
		}, {})
	);

	return (
		<ScrollView bounces={false} contentContainerStyle={styles.scrollView}>
			{liveSession && (
				<Pressable
					style={styles.liveSessionCard}
					onPress={() => Linking.openURL(liveSession.link)}
				>
					<LinearGradient
						colors={['rgba(0,0,0,0.3)', 'transparent']}
						style={styles.liveSessionGradient}
					/>

					<View style={styles.liveSessionHeader}>
						<View style={styles.liveIndicator}>
							<View style={styles.livePulse} />
							<AppText style={styles.liveText}>LIVE NOW</AppText>
						</View>
						<Ionicons
							name={
								liveSession.platform === 'zoom' ? 'videocam' : 'logo-youtube'
							}
							size={20}
							color={COLORS.white}
						/>
					</View>

					<View style={styles.sessionContent}>
						<AppText style={styles.sessionTitle}>{liveSession.title}</AppText>
						<AppText style={styles.sessionSpeaker}>
							{liveSession.speaker}
						</AppText>
						<AppText style={styles.sessionTime}>{liveSession.time}</AppText>
						<AppText style={styles.sessionDescription}>
							{liveSession.description}
						</AppText>
					</View>

					<View style={styles.joinButton}>
						<AppText style={styles.joinText}>Join Now</AppText>
						<Ionicons name="arrow-forward" size={16} color={COLORS.white} />
					</View>
				</Pressable>
			)}

			{/* Schedule Section with Tab View */}
			<View style={styles.scheduleContainer}>
				<View style={styles.sectionHeader}>
					<AppText style={styles.sectionTitle}>Event Schedule</AppText>
				</View>

				<TabView
					navigationState={{ index, routes }}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={{ width: Dimensions.get('window').width }}
					renderTabBar={(props) => (
						<TabBar
							{...props}
							indicatorStyle={styles.tabIndicator}
							style={styles.tabBar}
							activeColor={COLORS.primary}
							inactiveColor={COLORS.grey}
							pressColor={COLORS.primaryLight}
						/>
					)}
				/>
			</View>
		</ScrollView>
	);
};

const DaySchedule = ({ dayData }: { dayData: DaySchedule }) => {
	return (
		<ScrollView>
			<View style={styles.dayContainer}>
				{dayData.data.map((item, i) => (
					<Pressable
						key={i}
						style={[
							styles.agendaItem,
							i === dayData.data.length - 1 && { borderBottomWidth: 0 },
						]}
					>
						<View style={styles.timeContainer}>
							<View style={styles.timeDot} />
							{i !== dayData.data.length - 1 && (
								<View style={styles.timeLine} />
							)}
						</View>
						<View style={styles.agendaContent}>
							<View style={styles.agendaTop}>
								<AppText style={styles.agendaTitle}>{item.title}</AppText>
								<AppText style={styles.agendaTime}>{item.time}</AppText>
							</View>
							{item.location && (
								<View style={styles.locationTag}>
									<Ionicons name="location" size={14} color={COLORS.primary} />
									<AppText style={styles.locationText}>{item.location}</AppText>
								</View>
							)}
						</View>
					</Pressable>
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},

	liveSessionCard: {
		backgroundColor: COLORS.primary,
		borderRadius: 16,
		marginHorizontal: 16,
		overflow: 'hidden',
		minHeight: 180,
		justifyContent: 'space-between',
		marginTop: 20,
	},
	liveSessionGradient: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: '100%',
	},
	liveSessionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 16,
	},
	liveIndicator: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,0.2)',
		borderRadius: 20,
		paddingHorizontal: 10,
		paddingVertical: 4,
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
		fontWeight: '600',
		fontSize: 12,
	},
	sessionContent: {
		padding: 16,
		paddingTop: 0,
	},
	sessionTitle: {
		color: COLORS.white,
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	sessionSpeaker: {
		color: COLORS.white,
		opacity: 0.9,
		fontSize: 14,
		marginBottom: 8,
	},
	sessionTime: {
		color: COLORS.white,
		opacity: 0.8,
		fontSize: 14,
		marginBottom: 8,
	},
	sessionDescription: {
		color: COLORS.white,
		opacity: 0.8,
		fontSize: 14,
		lineHeight: 20,
	},
	joinButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255,0.2)',
		padding: 12,
		margin: 16,
		borderRadius: 8,
	},
	joinText: {
		color: COLORS.white,
		fontWeight: '600',
		fontSize: 16,
		marginRight: 8,
	},
	scheduleContainer: {
		flex: 1,

		borderRadius: 16,
		margin: 16,
		// overflow: 'hidden',
		shadowColor: COLORS.dark,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 3,
		minHeight: 300,
	},
	sectionHeader: {
		padding: 16,
		paddingBottom: 8,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.dark,
	},
	tabBar: {
		backgroundColor: COLORS.white,
		elevation: 0,
		shadowOpacity: 0,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.greyLight,
	},
	tabIndicator: {
		backgroundColor: COLORS.primary,
		height: 3,
	},
	dayContainer: {
		padding: 16,
	},
	agendaItem: {
		flexDirection: 'row',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.greyLight,
	},
	timeContainer: {
		width: 24,
		alignItems: 'center',
		marginRight: 12,
	},
	timeDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: COLORS.primary,
		zIndex: 2,
	},
	timeLine: {
		width: 2,
		flex: 1,
		backgroundColor: COLORS.greyLight,
		marginTop: 4,
		position: 'absolute',
		top: 16,
		bottom: 0,
	},
	agendaContent: {
		flex: 1,
	},
	agendaTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
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
		marginLeft: 8,
	},
	locationTag: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 16,
	},
	locationText: {
		fontSize: 13,
		color: COLORS.primary,
		marginLeft: 4,
	},
});

const liveSession = {
	title: 'Keynote: Future of Technology',
	time: '10:00 AM - 11:30 AM',
	link: 'https://zoom.us/j/123456789',
	platform: 'zoom',
	speaker: 'Dr. Sarah Chen',
	description: 'Exploring the next decade of technological innovation',
};

interface DaySchedule {
	title: string;
	data: (
		| {
				title: string;
				time: string;
				location: string;
		  }
		| {
				title: string;
				time: string;
				location?: undefined;
		  }
	)[];
}

const DATA: DaySchedule[] = [
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
			{
				title: 'Lunch Break',
				time: '12:00 PM - 1:30 PM',
			},
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
	{
		title: 'Day 3 - June 12',
		data: [
			{
				title: 'Networking Breakfast',
				time: '8:00 AM - 9:00 AM',
				location: 'Main Hall',
			},
			{
				title: 'Closing Ceremony',
				time: '10:00 AM - 12:00 PM',
				location: 'Grand Ballroom',
			},
		],
	},
];

export default EventHome;

// import {
// 	StyleSheet,
// 	View,
// 	Pressable,
// 	Linking,
// 	ScrollView,
// 	SectionList,
// } from 'react-native';
// import React from 'react';
// import { AppText } from '@/components';
// import { COLORS } from '@/constants/colors';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// const EventHome = () => {
// 	return (
// 		<View style={styles.container}>
// 			<ScrollView style={styles.scrollView}>
// 				{liveSession && (
// 					<Pressable
// 						style={styles.liveSessionCard}
// 						onPress={() => Linking.openURL(liveSession.link)}
// 					>
// 						<LinearGradient
// 							colors={['rgba(0,0,0,0.3)', 'transparent']}
// 							style={styles.liveSessionGradient}
// 						/>

// 						<View style={styles.liveSessionHeader}>
// 							<View style={styles.liveIndicator}>
// 								<View style={styles.livePulse} />
// 								<AppText style={styles.liveText}>LIVE NOW</AppText>
// 							</View>
// 							<Ionicons
// 								name={
// 									liveSession.platform === 'zoom' ? 'videocam' : 'logo-youtube'
// 								}
// 								size={20}
// 								color={COLORS.white}
// 							/>
// 						</View>

// 						<View style={styles.sessionContent}>
// 							<AppText style={styles.sessionTitle}>{liveSession.title}</AppText>
// 							<AppText style={styles.sessionSpeaker}>
// 								{liveSession.speaker}
// 							</AppText>
// 							<AppText style={styles.sessionTime}>{liveSession.time}</AppText>
// 							<AppText style={styles.sessionDescription}>
// 								{liveSession.description}
// 							</AppText>
// 						</View>

// 						<View style={styles.joinButton}>
// 							<AppText style={styles.joinText}>Join Now</AppText>
// 							<Ionicons name="arrow-forward" size={16} color={COLORS.white} />
// 						</View>
// 					</Pressable>
// 				)}

// 				{/* Schedule Section */}
// 				<View style={styles.scheduleContainer}>
// 					<View style={styles.sectionHeader}>
// 						<AppText style={styles.sectionTitle}>Event Schedule</AppText>
// 						<Pressable>
// 							<AppText style={styles.viewAll}>View All</AppText>
// 						</Pressable>
// 					</View>

// 					<SectionList
// 						scrollEnabled={false}
// 						sections={DATA}
// 						keyExtractor={(item, index) => `${item.title}-${index}`}
// 						renderItem={({ item }) => (
// 							<Pressable style={styles.agendaItem}>
// 								<View style={styles.timeContainer}>
// 									<View style={styles.timeDot} />
// 									{!item.isLast && <View style={styles.timeLine} />}
// 								</View>
// 								<View style={styles.agendaContent}>
// 									<View style={styles.agendaTop}>
// 										<AppText style={styles.agendaTitle}>{item.title}</AppText>
// 										<AppText style={styles.agendaTime}>{item.time}</AppText>
// 									</View>
// 									{item.location && (
// 										<View style={styles.locationTag}>
// 											<Ionicons
// 												name="location"
// 												size={14}
// 												color={COLORS.primary}
// 											/>
// 											<AppText style={styles.locationText}>
// 												{item.location}
// 											</AppText>
// 										</View>
// 									)}
// 								</View>
// 							</Pressable>
// 						)}
// 						SectionSeparatorComponent={() => (
// 							<View style={styles.daySeparator} />
// 						)}
// 						ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
// 						renderSectionHeader={({ section: { title } }) => (
// 							<View style={styles.dayHeader}>
// 								<AppText style={styles.dayTitle}>{title}</AppText>
// 							</View>
// 						)}
// 					/>
// 				</View>
// 			</ScrollView>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},
// 	header: {
// 		position: 'absolute',
// 		top: 0,
// 		left: 0,
// 		right: 0,
// 		height: 120,
// 		zIndex: 10,
// 	},
// 	headerGradient: {
// 		flex: 1,
// 		paddingTop: 60,
// 		paddingHorizontal: 24,
// 	},
// 	headerTitle: {
// 		fontSize: 24,
// 		fontWeight: 'bold',
// 		color: COLORS.white,
// 	},
// 	scrollView: {
// 		flex: 1,
// 	},
// 	profileCard: {
// 		backgroundColor: COLORS.white,
// 		borderRadius: 16,
// 		padding: 20,
// 		margin: 16,
// 		marginBottom: 0,
// 		shadowColor: COLORS.black,
// 		shadowOffset: { width: 0, height: 4 },
// 		shadowOpacity: 0.1,
// 		shadowRadius: 8,
// 		elevation: 3,
// 	},
// 	liveSessionCard: {
// 		backgroundColor: COLORS.primary,
// 		borderRadius: 16,
// 		marginHorizontal: 16,
// 		overflow: 'hidden',
// 		minHeight: 180,
// 		justifyContent: 'space-between',
// 		marginTop: 20,
// 	},
// 	liveSessionGradient: {
// 		position: 'absolute',
// 		top: 0,
// 		left: 0,
// 		right: 0,
// 		height: '100%',
// 	},
// 	liveSessionHeader: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		padding: 16,
// 	},
// 	liveIndicator: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		backgroundColor: 'rgba(255,255,255,0.2)',
// 		borderRadius: 20,
// 		paddingHorizontal: 10,
// 		paddingVertical: 4,
// 	},
// 	livePulse: {
// 		width: 8,
// 		height: 8,
// 		borderRadius: 4,
// 		backgroundColor: COLORS.danger,
// 		marginRight: 8,
// 	},
// 	liveText: {
// 		color: COLORS.white,
// 		fontWeight: '600',
// 		fontSize: 12,
// 	},
// 	sessionContent: {
// 		padding: 16,
// 		paddingTop: 0,
// 	},
// 	sessionTitle: {
// 		color: COLORS.white,
// 		fontSize: 18,
// 		fontWeight: 'bold',
// 		marginBottom: 4,
// 	},
// 	sessionSpeaker: {
// 		color: COLORS.white,
// 		opacity: 0.9,
// 		fontSize: 14,
// 		marginBottom: 8,
// 	},
// 	sessionTime: {
// 		color: COLORS.white,
// 		opacity: 0.8,
// 		fontSize: 14,
// 		marginBottom: 8,
// 	},
// 	sessionDescription: {
// 		color: COLORS.white,
// 		opacity: 0.8,
// 		fontSize: 14,
// 		lineHeight: 20,
// 	},
// 	joinButton: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		backgroundColor: 'rgba(255,255,255,0.2)',
// 		padding: 12,
// 		margin: 16,
// 		borderRadius: 8,
// 	},
// 	joinText: {
// 		color: COLORS.white,
// 		fontWeight: '600',
// 		fontSize: 16,
// 		marginRight: 8,
// 	},
// 	scheduleContainer: {
// 		backgroundColor: COLORS.white,
// 		borderRadius: 16,
// 		margin: 16,
// 		padding: 16,
// 		shadowColor: COLORS.black,
// 		shadowOffset: { width: 0, height: 4 },
// 		shadowOpacity: 0.1,
// 		shadowRadius: 8,
// 		elevation: 3,
// 	},
// 	sectionHeader: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		alignItems: 'center',
// 		marginBottom: 16,
// 	},
// 	sectionTitle: {
// 		fontSize: 18,
// 		fontWeight: 'bold',
// 		color: COLORS.dark,
// 	},
// 	viewAll: {
// 		fontSize: 14,
// 		color: COLORS.primary,
// 		fontWeight: '500',
// 	},
// 	dayHeader: {
// 		backgroundColor: COLORS.greyLightPlus,
// 		paddingVertical: 10,
// 		paddingHorizontal: 16,
// 		borderRadius: 8,
// 		marginBottom: 12,
// 	},
// 	dayTitle: {
// 		fontSize: 16,
// 		fontWeight: '600',
// 		color: COLORS.primary,
// 	},
// 	daySeparator: {
// 		height: 16,
// 	},
// 	agendaItem: {
// 		flexDirection: 'row',
// 		paddingVertical: 12,
// 	},
// 	timeContainer: {
// 		width: 24,
// 		alignItems: 'center',
// 		marginRight: 12,
// 	},
// 	timeDot: {
// 		width: 12,
// 		height: 12,
// 		borderRadius: 6,
// 		backgroundColor: COLORS.primary,
// 		zIndex: 2,
// 	},
// 	timeLine: {
// 		width: 2,
// 		flex: 1,
// 		backgroundColor: COLORS.greyLight,
// 		marginTop: 4,
// 		position: 'absolute',
// 		top: 16,
// 		bottom: 0,
// 	},
// 	agendaContent: {
// 		flex: 1,
// 	},
// 	agendaTop: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 	},
// 	agendaTitle: {
// 		fontSize: 15,
// 		fontWeight: '500',
// 		color: COLORS.dark,
// 		flex: 1,
// 	},
// 	agendaTime: {
// 		fontSize: 13,
// 		color: COLORS.grey,
// 		marginLeft: 8,
// 	},
// 	locationTag: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		marginTop: 8,
// 	},
// 	locationText: {
// 		fontSize: 13,
// 		color: COLORS.primary,
// 		marginLeft: 4,
// 	},
// 	itemSeparator: {
// 		height: 1,
// 		backgroundColor: COLORS.greyLight,
// 		marginLeft: 36,
// 		marginVertical: 12,
// 	},
// });

// export default EventHome;

// const liveSession = {
// 	title: 'Keynote: Future of Technology',
// 	time: '10:00 AM - 11:30 AM',
// 	link: 'https://zoom.us/j/123456789',
// 	platform: 'zoom',
// 	speaker: 'Dr. Sarah Chen',
// 	description: 'Exploring the next decade of technological innovation',
// };

// const DATA = [
// 	{
// 		title: 'Day 1 - June 10',
// 		data: [
// 			{
// 				title: 'Registration & Breakfast',
// 				time: '8:00 AM - 9:00 AM',
// 				location: 'Main Lobby',
// 				isLast: false,
// 			},
// 			{
// 				title: 'Opening Keynote',
// 				time: '9:30 AM - 11:00 AM',
// 				location: 'Grand Ballroom',
// 				isLast: false,
// 			},
// 			{
// 				title: 'Lunch Break',
// 				time: '12:00 PM - 1:30 PM',
// 				isLast: true,
// 			},
// 		],
// 	},
// 	{
// 		title: 'Day 2 - June 11',
// 		data: [
// 			{
// 				title: 'Workshop: Advanced Techniques',
// 				time: '9:00 AM - 12:00 PM',
// 				location: 'Room A',
// 				isLast: false,
// 			},
// 			{
// 				title: 'Panel Discussion',
// 				time: '2:00 PM - 3:30 PM',
// 				location: 'Grand Ballroom',
// 				isLast: true,
// 			},
// 		],
// 	},
// ];
