import { COLORS } from '@/constants/colors';
import { useNavigate } from '@/hooks/useNavigate';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	StatusBar,
} from 'react-native';
import Markdown from 'react-native-markdown-display';

// Event interface
interface Event {
	title: string;
	detail: string;
}

type EventDetailsRouteParams = {
	event: Event;
};

const EventDetailsScreen = () => {
	const route = useRoute<RouteProp<{ params: EventDetailsRouteParams }>>();
	const event = route.params?.event;
	const { goBack, setOptions } = useNavigate();

	console.log('Event Details Route Params:', event.detail);

	setOptions({
		headerTitle: event?.title || 'Event Details',
	});

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
				{/* <View style={styles.header}>
					<Text style={styles.title}>{event.title}</Text>
				</View> */}

				{/* Details Section */}
				<View style={styles.detailsSection}>
					{/* <Markdown
						style={{
							body: {
								fontSize: 16,
								color: COLORS.grey,
								lineHeight: 24,
								textAlign: 'justify',
							},
						}}
					>
						{event.detail}
					</Markdown> */}
					<Markdown
						style={{
							body: {
								fontSize: 16,
								color: COLORS.grey,
								lineHeight: 24,
							},
							bullet_list_icon: {
								fontWeight: 'bold',
								fontSize: 36,
								top: 6,
								color: COLORS.primary, // You can change color to make the bullet stand out
							},
						}}
					>
						{event.detail}
					</Markdown>
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
	detailsLabel: {
		fontSize: 18,
		fontWeight: '600',
		color: '#495057',
		marginBottom: 15,
	},
	detailsSection: {
		marginBottom: 16,
	},
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
		marginTop: 20,
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
