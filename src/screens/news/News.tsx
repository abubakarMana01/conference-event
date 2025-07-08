import {
	StyleSheet,
	View,
	FlatList,
	RefreshControl,
	TouchableOpacity,
	Image,
	Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { AppText } from '@/components';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { ROUTES } from '@/navs/routes';
import { useNavigate } from '@/hooks/useNavigate';

export interface INews {
	link?: string;
	id: string;
	title: string;
	summary: string;
	content: string;
	category: string;
	date: Date;
	image: any;
	isImportant: boolean;
}

const NewsScreen = () => {
	const navigation = useNavigate();
	const [refreshing, setRefreshing] = useState(false);
	const [newsItems, setNewsItems] = useState<INews[]>([]);

	useEffect(() => {
		loadNews();
	}, []);

	const loadNews = () => {
		setRefreshing(true);

		// Simulate API call
		setTimeout(() => {
			setNewsItems(sampleNews);
			setRefreshing(false);
		}, 1000);
	};

	const renderNewsItem = ({ item }: { item: INews }) => (
		<TouchableOpacity
			style={[styles.newsCard, styles.importantCard]}
			onPress={() =>
				navigation.navigate(ROUTES.NEWS_DETAILS, { newsItem: item })
			}
			activeOpacity={0.8}
		>
			{item.image && (
				<Image
					source={item.image}
					style={styles.newsImage}
					resizeMode="cover"
				/>
			)}
			<View style={styles.newsContent}>
				<View style={styles.newsHeader}>
					<AppText style={styles.newsCategory}>{item.category}</AppText>
					<AppText style={styles.newsDate}>
						{formatDistanceToNow(item.date, { addSuffix: true })}
					</AppText>
				</View>
				<AppText style={styles.newsTitle}>{item.title}</AppText>
				<AppText style={styles.newsSummary}>{item.summary}</AppText>
				<View style={styles.readMoreContainer}>
					<AppText style={styles.readMoreText}>Read more</AppText>
					<Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<AppText style={styles.headerSubtitle}>
					Stay updated with the latest announcements
				</AppText>
			</View>

			<FlatList
				data={newsItems}
				renderItem={renderNewsItem}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.listContent}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={loadNews}
						colors={[COLORS.primary]}
						tintColor={COLORS.primary}
					/>
				}
				ListEmptyComponent={
					<View style={styles.emptyState}>
						<Ionicons name="newspaper" size={48} color={COLORS.greyLight} />
						<AppText style={styles.emptyText}>No news updates yet</AppText>
						<AppText style={styles.emptySubtext}>
							Check back later for event announcements
						</AppText>
					</View>
				}
			/>
		</View>
	);
};

export default NewsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		padding: 16,
		paddingTop: Platform.OS === 'web' ? 0 : 8,
		backgroundColor: COLORS.white,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.greyLight,
	},
	headerSubtitle: {
		fontSize: 14,
		color: COLORS.grey,
	},
	listContent: {
		padding: 16,
		paddingBottom: 32,
	},
	newsCard: {
		backgroundColor: COLORS.white,
		borderRadius: 12,
		overflow: 'hidden',
		marginBottom: 24,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	importantCard: {
		borderLeftWidth: 4,
		borderLeftColor: COLORS.primary,
	},
	newsImage: {
		width: '100%',
		height: 150,
	},
	newsContent: {
		padding: 16,
	},
	newsHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	newsCategory: {
		fontSize: 12,
		fontWeight: '600',
		color: COLORS.primary,
		textTransform: 'uppercase',
	},
	newsDate: {
		fontSize: 12,
		color: COLORS.grey,
	},
	newsTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: COLORS.dark,
		marginBottom: 8,
	},
	newsSummary: {
		fontSize: 14,
		color: COLORS.greyDark,
		marginBottom: 12,
		lineHeight: 20,
	},
	readMoreContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	readMoreText: {
		fontSize: 14,
		color: COLORS.primary,
		fontWeight: '500',
	},
	emptyState: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 40,
	},
	emptyText: {
		fontSize: 16,
		color: COLORS.grey,
		marginTop: 16,
		fontWeight: '500',
	},
	emptySubtext: {
		fontSize: 14,
		color: COLORS.greyLight,
		marginTop: 8,
		textAlign: 'center',
	},
});

const sampleNews = [
	{
		id: '1',
		title: 'Event Schedule Update',
		summary:
			'The keynote session has been moved to 10:30 AM in the Grand Ballroom.',
		content:
			"Due to overwhelming demand, we've moved the keynote session to the larger Grand Ballroom. Please arrive 15 minutes early as seating will be first-come, first-served.",
		category: 'Update',
		date: new Date('2023-11-15T09:00:00'),
		image: require('@/assets/event-poster.png'),
		isImportant: true,
	},
	{
		id: '2',
		title: 'Featured Speaker Announced',
		summary: 'Tech industry leader Sarah Chen confirmed as closing speaker.',
		content:
			'We\'re thrilled to announce that Sarah Chen, CEO of InnovateTech, will be our closing speaker on Day 3. Her session "The Future of AI" will provide valuable insights for all attendees.',
		category: 'Announcement',
		date: new Date('2023-11-10T14:30:00'),
		image: require('@/assets/event-poster.png'),
		isImportant: false,
	},
	{
		id: '3',
		title: 'Registration Now Open',
		summary: 'Early bird registration available until November 30th.',
		content:
			"Secure your spot at this year's premier industry event with our early bird pricing. Register before November 30th to save 20% on full conference passes.",
		category: 'Reminder',
		date: new Date('2023-11-05T08:00:00'),
		image: require('@/assets/event-poster.png'),
		isImportant: false,
	},
	{
		id: '4',
		title: 'Venue Parking Information',
		summary: 'Complimentary parking available for all attendees.',
		content:
			"We've arranged complimentary parking in the convention center garage. Simply show your event badge when exiting. Carpooling is encouraged as spaces are limited.",
		category: 'Logistics',
		date: new Date('2023-11-01T16:45:00'),
		image: require('@/assets/event-poster.png'),
		isImportant: false,
	},
];
