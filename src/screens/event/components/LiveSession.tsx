import {
	Linking,
	Pressable,
	StyleSheet,
	View,
	ActivityIndicator,
} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components';
import { COLORS } from '@/constants/colors';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fetchSessions } from '@/services/sessions.service';

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

const LiveSession = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['sessions'],
		queryFn: fetchSessions,
	});

	if (isError || !data) return null;

	const liveSession = data.find(
		(session: any) =>
			session.state === 'live' ||
			session.state === 'upcoming' ||
			session.state === 'concluded'
	);

	if (!liveSession) return null;

	return (
		<Pressable
			style={styles.liveSessionCard}
			onPress={() => Linking.openURL(liveSession.link)}
		>
			{isLoading && (
				<View style={styles.loading}>
					<ActivityIndicator size="large" color={COLORS.primary} />
				</View>
			)}

			<LinearGradient
				colors={['rgba(0,0,0,0.3)', 'transparent']}
				style={styles.liveSessionGradient}
			/>

			<View style={styles.liveSessionHeader}>
				<View style={styles.liveIndicator}>
					<View style={[styles.livePulse, getPulseStyle(liveSession.state)]} />
					<AppText style={styles.liveText}>
						{liveSession.state === 'live'
							? 'LIVE NOW'
							: liveSession.state === 'upcoming'
							? 'UPCOMING'
							: 'CONCLUDED'}
					</AppText>
				</View>
				<Ionicons
					name={liveSession.link.includes('zoom') ? 'videocam' : 'logo-youtube'}
					size={20}
					color={COLORS.white}
				/>
			</View>

			<View style={styles.sessionContent}>
				<AppText style={styles.sessionTitle}>{liveSession.title}</AppText>
				<AppText style={styles.sessionSpeaker}>{liveSession.anchors}</AppText>
				<AppText style={styles.sessionTime}>
					{format(new Date(liveSession.time), 'p')} -{' '}
					{format(new Date(liveSession.endtime), 'p')}
				</AppText>
				<AppText style={styles.sessionDescription}>
					Join this session to engage with insightful discussions.
				</AppText>
			</View>

			<View style={styles.joinButton}>
				<AppText style={styles.joinText}>Join Now</AppText>
				<Ionicons name="arrow-forward" size={16} color={COLORS.white} />
			</View>
		</Pressable>
	);
};

export default LiveSession;

const styles = StyleSheet.create({
	liveSessionCard: {
		backgroundColor: COLORS.primary,
		borderRadius: 16,
		marginHorizontal: 16,
		overflow: 'hidden',
		minHeight: 180,
		justifyContent: 'space-between',
		marginTop: 20,
	},
	liveSessionGradient: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: '100%',
	},
	liveSessionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 16,
	},
	liveIndicator: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,0.2)',
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
		color: COLORS.white,
		fontWeight: '600',
		fontSize: 12,
	},
	sessionContent: {
		padding: 16,
		paddingTop: 0,
	},
	sessionTitle: {
		color: COLORS.white,
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	sessionSpeaker: {
		color: COLORS.white,
		opacity: 0.9,
		fontSize: 14,
		marginBottom: 8,
	},
	sessionTime: {
		color: COLORS.white,
		opacity: 0.8,
		fontSize: 14,
		marginBottom: 8,
	},
	sessionDescription: {
		color: COLORS.white,
		opacity: 0.8,
		fontSize: 14,
		lineHeight: 20,
	},
	joinButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255,0.2)',
		padding: 12,
		margin: 16,
		borderRadius: 8,
	},
	joinText: {
		color: COLORS.white,
		fontWeight: '600',
		fontSize: 16,
		marginRight: 8,
	},
	loading: {
		paddingVertical: 32,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
