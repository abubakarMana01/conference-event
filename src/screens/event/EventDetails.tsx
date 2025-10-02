import { COLORS } from '@/constants/colors';
import { useNavigate } from '@/hooks/useNavigate';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	StatusBar,
} from 'react-native';

// Event interface
interface Event {
	title: string;
	detail: string;
}

const EventDetailsScreen = () => {
	const route = useRoute();
	const event = route.params?.event;
	const { goBack } = useNavigate();

	if (!event?.detail) goBack();

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Header Section */}
				<View style={styles.header}>
					<Text style={styles.title}>{event.title}</Text>
				</View>

				{/* Details Section */}
				<View style={styles.detailsSection}>
					<Text style={styles.detailsText}>{event.detail}</Text>
				</View>

				{/* Additional information section (optional) */}
				<View style={styles.additionalInfo}>
					<Text style={styles.additionalInfoText}>
						For more information, please contact the event organizer.
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f8f9fa',
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		padding: 20,
	},
	header: {
		paddingBottom: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: COLORS.primary,
	},
	detailsLabel: {
		fontSize: 18,
		fontWeight: '600',
		color: '#495057',
		marginBottom: 15,
	},
	detailsSection: { marginBottom: 16 },
	detailsText: {
		fontSize: 16,
		color: '#6c757d',
		lineHeight: 24,
		textAlign: 'justify',
	},
	additionalInfo: {
		backgroundColor: '#e7f3ff',
		borderRadius: 8,
		padding: 15,
		borderLeftWidth: 4,
		borderLeftColor: '#0d6efd',
	},
	additionalInfoText: {
		fontSize: 14,
		color: '#084298',
		fontStyle: 'italic',
		textAlign: 'center',
	},
});

export default EventDetailsScreen;
