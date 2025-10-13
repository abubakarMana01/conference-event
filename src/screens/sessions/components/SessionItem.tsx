import { Linking, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components';
import { COLORS } from '@/constants/colors';
import { format } from 'date-fns';
import { ISession } from '@/types';

const getPulseStyle = (state: string) => {
	switch (state) {
		case 'live':
			return { backgroundColor: COLORS.danger };
		case 'upcoming':
			return { backgroundColor: COLORS.warning };
		case 'concluded':
			return { backgroundColor: COLORS.success };
		default:
			return { backgroundColor: COLORS.grey };
	}
};

interface Props {
	session: ISession;
}

const SessionItem = ({ session }: Props) => {
	return (
		<View style={styles.container}>
			<View style={styles.liveSessionHeader}>
				<View style={styles.liveIndicator}>
					<View style={[styles.livePulse, getPulseStyle(session.state)]} />
					<AppText style={styles.liveText}>
						{session.state === 'live'
							? 'LIVE NOW'
							: session.state === 'upcoming'
							? 'UPCOMING'
							: 'CONCLUDED'}
					</AppText>
				</View>
				<Ionicons
					name={session.link.includes('zoom') ? 'videocam' : 'logo-youtube'}
					size={20}
					color={COLORS.primary}
				/>
			</View>

			<AppText style={styles.sessionTitle}>{session.title}</AppText>
			<AppText style={styles.sessionSpeaker}>{session.anchors}</AppText>
			<AppText style={styles.sessionTime}>
				{format(new Date(session.time), 'p')} -{' '}
				{format(new Date(session.endtime), 'p')}
			</AppText>
		</View>

		// <Pressable
		// 	style={styles.liveSessionCard}
		// 	onPress={() => Linking.openURL(session.link)}
		// >
		// 	<LinearGradient
		// 		colors={['rgba(0,0,0,0.3)', 'transparent']}
		// 		style={styles.liveSessionGradient}
		// 	/>

		// 	<View style={styles.liveSessionHeader}>
		// 		<View style={styles.liveIndicator}>
		// 			<View style={[styles.livePulse, getPulseStyle(session.state)]} />
		// 			<AppText style={styles.liveText}>
		// 				{session.state === 'live'
		// 					? 'LIVE NOW'
		// 					: session.state === 'upcoming'
		// 					? 'UPCOMING'
		// 					: 'CONCLUDED'}
		// 			</AppText>
		// 		</View>
		// 		<Ionicons
		// 			name={session.link.includes('zoom') ? 'videocam' : 'logo-youtube'}
		// 			size={20}
		// 			color={COLORS.white}
		// 		/>
		// 	</View>

		// 	<View style={styles.sessionContent}>
		// 		<AppText style={styles.sessionTitle}>{session.title}</AppText>
		// 		<AppText style={styles.sessionSpeaker}>{session.anchors}</AppText>
		// 		<AppText style={styles.sessionTime}>
		// 			{format(new Date(session.time), 'p')} -{' '}
		// 			{format(new Date(session.endtime), 'p')}
		// 		</AppText>
		// 		<AppText style={styles.sessionDescription}>
		// 			Join this session to engage with insightful discussions.
		// 		</AppText>
		// 	</View>

		// 	<View style={styles.joinButton}>
		// 		<AppText style={styles.joinText}>Join Now</AppText>
		// 		<Ionicons name="arrow-forward" size={16} color={COLORS.white} />
		// 	</View>
		// </Pressable>
	);
};

export default SessionItem;

const styles = StyleSheet.create({
	container: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3,
		backgroundColor: COLORS.white,
		borderRadius: 16,
		marginHorizontal: 16,
		marginBottom: 16,
		paddingVertical: 16,
		paddingHorizontal: 16,
		borderWidth: 0.5,
		borderColor: COLORS.greyLightPlus,
	},
	sessionTitle: {
		color: COLORS.primary,
		fontSize: 16,
		fontWeight: '600',
	},
	sessionSpeaker: {
		color: COLORS.greyDark,
		fontWeight: '600',
		marginTop: 4,
	},
	sessionTime: {
		color: COLORS.grey,
		fontSize: 12,
		marginTop: 4,
	},
	liveSessionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	liveIndicator: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.greyLightPlus,
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
		color: COLORS.grey,
		fontWeight: '600',
		fontSize: 10,
	},
});

// const styles = StyleSheet.create({
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
// });
