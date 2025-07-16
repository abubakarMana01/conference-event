import { StyleSheet, View, Pressable, Linking, ScrollView } from 'react-native';
import React from 'react';
import { AppText } from '@/components';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import EventSchedule from './components/EventSchedule';
import LiveSession from './components/LiveSession';

const EventHome = () => {
	return (
		<ScrollView bounces={false} contentContainerStyle={styles.scrollView}>
			<LiveSession />

			<EventSchedule />
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
});

export default EventHome;
