import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AppText } from '@/components';
import { formatDistanceToNow } from 'date-fns';
import { COLORS } from '@/constants/colors';
import { IAnnouncement } from '@/types';

interface Props {
	announcement: IAnnouncement;
}

const DELIVERY_OPTION_STYLES: Record<
	string,
	{ backgroundColor: string; textColor: string }
> = {
	urgent: { backgroundColor: '#f75b5b', textColor: '#fff' },
	important: { backgroundColor: '#FFA726', textColor: '#fff' },
	standard: { backgroundColor: '#a0a4a6', textColor: '#fff' },
};

const AnnouncementItem = ({ announcement }: Props) => {
	return (
		<TouchableOpacity
			style={[styles.card, styles.importantCard]}
			// onPress={() =>
			// 	navigation.navigate(ROUTES.NEWS_DETAILS, { newsItem: announcement })
			// }
			activeOpacity={0.8}
		>
			{/* <Image
				source={require('@/assets/event-poster.png')}
				style={styles.newsImage}
				resizeMode="cover"
			/> */}
			<View style={styles.content}>
				<View style={styles.header}>
					<View
						style={[
							styles.badge,
							{
								backgroundColor:
									DELIVERY_OPTION_STYLES[announcement.delivery_option]
										?.backgroundColor || COLORS.greyLight,
							},
						]}
					>
						<AppText
							style={[
								styles.badgeText,
								{
									color:
										DELIVERY_OPTION_STYLES[announcement.delivery_option]
											?.textColor || COLORS.dark,
								},
							]}
						>
							{announcement.delivery_option?.toUpperCase()}
						</AppText>
					</View>
					<AppText style={styles.date}>
						{formatDistanceToNow(new Date(announcement.createdAt), {
							addSuffix: true,
						})}
					</AppText>
				</View>
				<AppText style={styles.title}>
					Announcement #{announcement.order}
				</AppText>
				<AppText style={styles.summary}>{announcement.description}</AppText>
			</View>
		</TouchableOpacity>
	);
};

export default AnnouncementItem;

const styles = StyleSheet.create({
	card: {
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
	image: {
		width: '100%',
		height: 150,
	},
	content: {
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	badge: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
		alignSelf: 'flex-start',
	},
	badgeText: {
		fontSize: 12,
		fontWeight: '600',
		textTransform: 'uppercase',
	},
	date: {
		fontSize: 12,
		color: COLORS.grey,
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		color: COLORS.dark,
		marginBottom: 8,
	},
	summary: {
		fontSize: 14,
		color: COLORS.greyDark,
		marginBottom: 12,
		lineHeight: 20,
	},
});
