import {
	Dimensions,
	Image,
	Linking,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components';
import { COLORS } from '@/constants/colors';
import { ISponsor } from '@/types';

interface Props {
	sponsor: ISponsor;
}

const Sponsor = ({ sponsor }: Props) => {
	const handleSponsorPress = (url: string) => {
		if (url) Linking.openURL(url).catch(console.error);
	};

	return (
		<TouchableOpacity
			key={sponsor.id}
			style={styles.sponsorCard}
			onPress={() => handleSponsorPress(sponsor.url)}
			activeOpacity={0.8}
		>
			<View style={styles.sponsorImageContainer}>
				{!sponsor.image ? (
					<Ionicons name="image-outline" size={80} color={COLORS.grey} />
				) : (
					<Image
						source={{
							uri:
								process.env.EXPO_PUBLIC_API_URL +
								(sponsor.image.formats.small?.url || sponsor.image.url),
						}}
						style={styles.sponsorImage}
						resizeMode="contain"
					/>
				)}
			</View>
			<AppText style={styles.sponsorName}>{sponsor.name}</AppText>
			<AppText numberOfLines={3} style={styles.sponsorDescription}>
				{sponsor.description}
			</AppText>
			<View style={styles.linkContainer}>
				<AppText style={styles.linkText}>Visit Website</AppText>
				<Ionicons name="open-outline" size={16} color={COLORS.primary} />
			</View>
		</TouchableOpacity>
	);
};

export default Sponsor;

const { width } = Dimensions.get('window');
const sponsorCardWidth = width / 2 - 24;

const styles = StyleSheet.create({
	sponsorCard: {
		width: sponsorCardWidth,
		backgroundColor: COLORS.white,
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
		alignItems: 'center',
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	sponsorImageContainer: {
		width: sponsorCardWidth - 32,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 12,
	},
	sponsorImage: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	sponsorName: {
		fontSize: 16,
		fontWeight: '600',
		color: COLORS.dark,
		marginBottom: 4,
		textAlign: 'center',
	},
	sponsorDescription: {
		fontSize: 13,
		color: COLORS.grey,
		textAlign: 'center',
		marginBottom: 8,
	},
	linkContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 'auto',
	},
	linkText: {
		fontSize: 14,
		color: COLORS.primary,
		marginRight: 4,
	},
});
