import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import type { IAnnouncement } from '@/types';
import { AppText } from '@/components';
import { formatDistanceToNow } from 'date-fns';

interface Props {
	announcement: IAnnouncement;
	isLastItem?: boolean;
}

const DELIVERY_OPTION_STYLES: Record<
	string,
	{ backgroundColor: string; textColor: string }
> = {
	urgent: { backgroundColor: '#f75b5b', textColor: '#fff' },
	important: { backgroundColor: '#FFA726', textColor: '#fff' },
	standard: { backgroundColor: '#a0a4a6', textColor: '#fff' },
};

const Announcement = ({ announcement, isLastItem }: Props) => {
	return (
		<View
			style={[
				styles.container,
				{
					borderBottomWidth: isLastItem ? 0 : 0.5,
				},
			]}
		>
			{/* <LinearGradient
				colors={['rgb(233, 195, 247)', 'rgba(233, 195, 247, 0.185)']}
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
		paddingVertical: 12,
		borderColor: '#c49ce4',
	},
	gradientContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: '100%',
	},
	content: {},
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
		color: COLORS.black,
	},
	summary: {
		fontSize: 14,
		color: COLORS.black,
		lineHeight: 20,
	},
});
