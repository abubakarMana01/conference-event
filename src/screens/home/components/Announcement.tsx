import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import type { IAnnouncement } from '@/types';
import { AppText } from '@/components';
import { formatDistanceToNow } from 'date-fns';

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

const Announcement = ({ announcement }: Props) => {
	return (
		<View style={styles.container}>
			{/* <LinearGradient
				colors={['rgba(0,0,0,0.3)', 'transparent']}
				style={styles.gradientContainer}
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

				<AppText style={styles.summary}>{announcement.description}</AppText>
			</View>
		</View>
	);
};

export default Announcement;

const styles = StyleSheet.create({
	container: {
		// backgroundColor: COLORS.primary,
		borderRadius: 16,
		overflow: 'hidden',
		justifyContent: 'space-between',
		borderLeftWidth: 6,
		borderLeftColor: COLORS.primary,
		borderWidth: 0.5,
		borderColor: COLORS.greyLight,
	},
	gradientContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: '100%',
	},
	content: {
		paddingHorizontal: 12,
		paddingVertical: 12,
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
		fontSize: 10,
		fontWeight: '600',
		textTransform: 'uppercase',
	},
	date: {
		fontSize: 12,
		color: COLORS.primary,
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		color: COLORS.dark,
		marginBottom: 8,
	},
	summary: {
		fontSize: 14,
		color: COLORS.primary,
		marginBottom: 12,
		lineHeight: 20,
	},
});
