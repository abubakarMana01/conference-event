import {
	Dimensions,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
	ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { AppText } from '@/components';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { fetchSchedules } from '@/services/schedules.service'; // Make sure this exists and returns the data

const EventSchedule = () => {
	const [index, setIndex] = useState(0);

	const { data, isLoading } = useQuery({
		queryKey: ['schedules'],
		queryFn: fetchSchedules,
	});

	if (isLoading) {
		return (
			<View style={styles.loaderContainer}>
				<ActivityIndicator size="large" color={COLORS.primary} />
			</View>
		);
	}

	const routes = (data || []).map((day: any) => ({
		key: String(day.id),
		title: day.title,
	}));

	const renderScene = SceneMap(
		(data || []).reduce<Record<string, React.ComponentType>>(
			(acc: any, day: any) => {
				acc[String(day.id)] = () => <IDaySchedule dayData={day} />;
				return acc;
			},
			{}
		)
	);

	return (
		<View style={styles.scheduleContainer}>
			{/* <View style={styles.sectionHeader}>
				<AppText style={styles.sectionTitle}>Event Schedule</AppText>
			</View> */}

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
	);
};

export default EventSchedule;

const IDaySchedule = ({ dayData }: { dayData: any }) => {
	return (
		<ScrollView>
			<View style={styles.dayContainer}>
				{dayData.agenda.map((item: any, i: number) => (
					<Pressable
						key={item.id}
						style={[
							styles.agendaItem,
							i === dayData.agenda.length - 1 && { borderBottomWidth: 0 },
						]}
					>
						<View style={styles.timeContainer}>
							<View style={styles.timeDot} />
							<View
								style={[
									styles.timeLine,
									{ bottom: i !== dayData.agenda.length - 1 ? 0 : 20 },
								]}
							/>
							{i === dayData.agenda.length - 1 && (
								<View
									style={[styles.timeDot, { position: 'absolute', bottom: 0 }]}
								/>
							)}
						</View>
						<View style={styles.agendaContent}>
							<View style={styles.agendaTop}>
								<AppText style={styles.agendaTitle}>{item.title}</AppText>
								<AppText style={styles.agendaTime}>{item.time}</AppText>
							</View>
							{item.detail && (
								<View style={styles.locationTag}>
									{/* <Ionicons
										name="information-circle"
										size={14}
										color={COLORS.primary}
									/> */}
									<AppText style={styles.locationText}>
										{item.detail.replace(/# /g, '')}
									</AppText>
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
	scheduleContainer: {
		flex: 1,
		borderRadius: 16,
		margin: 16,
		shadowColor: COLORS.dark,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		borderWidth: 1,
		borderColor: COLORS.greyLight,
		elevation: 3,
		minHeight: 300,
		overflow: 'hidden',
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
		marginTop: -2,
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
		alignItems: 'flex-start',
		marginTop: 20,
	},
	locationText: {
		fontSize: 13,
		color: COLORS.primary,
		marginLeft: 4,
		marginTop: -1,
	},
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
