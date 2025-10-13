import { StyleSheet, View } from 'react-native';
import React from 'react';
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

const LiveSession = ({ session }: Props) => {
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
	);
};

export default LiveSession;

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
