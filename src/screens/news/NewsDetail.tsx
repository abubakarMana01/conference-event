import {
	StyleSheet,
	View,
	ScrollView,
	Image,
	Linking,
	TouchableOpacity,
	Share,
	Platform,
	Dimensions,
} from 'react-native';
import React from 'react';
import { AppText } from '@/components';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { INews } from './News';

const NewsDetailScreen = () => {
	const route = useRoute() as { params: { newsItem: INews } };
	const navigation = useNavigation();
	const { newsItem } = route.params || {};

	// Fallback if no newsItem is passed
	if (!newsItem) {
		return (
			<View style={styles.container}>
				<AppText>News item not found</AppText>
			</View>
		);
	}

	const handleShare = async () => {
		try {
			await Share.share({
				message: `Check out this event update: ${newsItem.title}\n\n${newsItem.content}`,
				title: newsItem.title,
				url: newsItem.link || 'https://our-event-website.com',
			});
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error sharing:', error.message);
			}
		}
	};

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			{/* Header with back button */}
			<LinearGradient
				colors={['rgba(0,0,0,0.7)', 'transparent']}
				style={styles.header}
			>
				<TouchableOpacity onPress={handleBack} style={styles.backButton}>
					<Ionicons name="arrow-back" size={24} color={COLORS.dark} />
				</TouchableOpacity>
			</LinearGradient>

			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				bounces={false}
			>
				{/* News Image */}
				{newsItem.image && (
					<Image
						source={newsItem.image}
						style={styles.newsImage}
						resizeMode="cover"
					/>
				)}

				{/* News Content */}
				<View style={styles.contentContainer}>
					{/* Category and Date */}
					<View style={styles.metaContainer}>
						<View
							style={[
								styles.categoryBadge,
								{ backgroundColor: getCategoryColor(newsItem.category) },
							]}
						>
							<AppText style={styles.categoryText}>{newsItem.category}</AppText>
						</View>
						<AppText style={styles.dateText}>
							{format(new Date(newsItem.date), 'MMMM d, yyyy • h:mm a')}
						</AppText>
					</View>

					{/* Title */}
					<AppText style={styles.title}>{newsItem.title}</AppText>

					{/* Content */}
					<AppText style={styles.content}>{newsItem.content}</AppText>

					{/* Link (if available) */}
					{newsItem.link && (
						<TouchableOpacity
							style={styles.linkContainer}
							onPress={() => Linking.openURL(newsItem.link || '')}
						>
							<Ionicons name="link" size={20} color={COLORS.primary} />
							<AppText style={styles.linkText}>Visit related link</AppText>
						</TouchableOpacity>
					)}
				</View>
			</ScrollView>

			{/* Footer with share button */}
			<View style={styles.footer}>
				<TouchableOpacity style={styles.shareButton} onPress={handleShare}>
					<Ionicons name="share-social" size={20} color={COLORS.white} />
					<AppText style={styles.shareText}>Share Update</AppText>
				</TouchableOpacity>
			</View>
		</View>
	);
};

// Helper function for category colors
const getCategoryColor = (category: string) => {
	switch (category.toLowerCase()) {
		case 'update':
			return '#4A90E2';
		case 'announcement':
			return '#7ED321';
		case 'reminder':
			return '#F5A623';
		case 'logistics':
			return '#BD10E0';
		default:
			return COLORS.primary;
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: Platform.OS === 'ios' ? 100 : 80,
		zIndex: 10,
		paddingTop: Platform.OS === 'ios' ? 50 : 30,
		paddingLeft: 16,
	},
	backButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'rgba(255,255,255,0.6)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	scrollContainer: {
		paddingBottom: 80,
	},
	newsImage: {
		width: '100%',
		height: Dimensions.get('window').height / 2.5,
		maxHeight: 270,
	},
	contentContainer: {
		padding: 24,
	},
	metaContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	categoryBadge: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
	},
	categoryText: {
		fontSize: 12,
		fontWeight: '600',
		color: COLORS.white,
		textTransform: 'uppercase',
	},
	dateText: {
		fontSize: 14,
		color: COLORS.grey,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: COLORS.dark,
		marginBottom: 20,
		lineHeight: 34,
	},
	content: {
		fontSize: 16,
		color: COLORS.greyDark,
		lineHeight: 24,
		marginBottom: 24,
	},
	linkContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 16,
		padding: 12,
		backgroundColor: 'rgba(74, 144, 226, 0.1)',
		borderRadius: 8,
	},
	linkText: {
		fontSize: 16,
		color: COLORS.primary,
		marginLeft: 8,
		fontWeight: '500',
	},
	footer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		padding: 16,
		backgroundColor: COLORS.white,
		borderTopWidth: 1,
		borderTopColor: COLORS.greyLight,
	},
	shareButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.primary,
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
	},
	shareText: {
		fontSize: 16,
		fontWeight: '600',
		color: COLORS.white,
		marginLeft: 8,
	},
});

export default NewsDetailScreen;
