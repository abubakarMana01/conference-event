import {
	StyleSheet,
	View,
	ScrollView,
	Image,
	TouchableOpacity,
	Linking,
	Dimensions,
	Platform,
	TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { AppText, SearchBar } from '@/components';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

const SponsorsScreen = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSponsorPress = (url: string) => {
		Linking.openURL(url).catch((err) =>
			console.error('Failed to open URL:', err)
		);
	};

	// Filter sponsors based on search query
	const filteredSponsorTiers = sponsorTiers
		.map((tier) => ({
			...tier,
			sponsors: tier.sponsors.filter(
				(sponsor) =>
					sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					sponsor.description.toLowerCase().includes(searchQuery.toLowerCase())
			),
		}))
		.filter((tier) => tier.sponsors.length > 0); // Remove empty tiers

	return (
		<View style={styles.container}>
			<AppText style={styles.header}>
				These organizations help make our event possible
			</AppText>

			<ScrollView contentContainerStyle={styles.scrollViewContainer}>
				<View style={styles.searchContainer}>
					<SearchBar
						{...{
							searchQuery,
							setSearchQuery,
							placeholder: 'Search Sponsors...',
						}}
					/>
				</View>
				
				{filteredSponsorTiers.length > 0 ? (
					filteredSponsorTiers.map((tier, index) => (
						<View key={index} style={styles.tierContainer}>
							<View style={[styles.tierHeader, styles[`${tier.level}Header`]]}>
								<AppText style={styles.tierTitle}>{tier.title}</AppText>
							</View>

							<View style={styles.sponsorsContainer}>
								{tier.sponsors.map((sponsor, sponsorIndex) => (
									<TouchableOpacity
										key={sponsorIndex}
										style={styles.sponsorCard}
										onPress={() => handleSponsorPress(sponsor.url)}
										activeOpacity={0.8}
									>
										<View style={styles.sponsorImageContainer}>
											<Image
												source={sponsor.logo}
												style={styles.sponsorImage}
												resizeMode="contain"
											/>
										</View>
										<AppText style={styles.sponsorName}>{sponsor.name}</AppText>
										<AppText style={styles.sponsorDescription}>
											{sponsor.description}
										</AppText>
										<View style={styles.linkContainer}>
											<AppText style={styles.linkText}>Visit Website</AppText>
											<Ionicons
												name="open-outline"
												size={16}
												color={COLORS.primary}
											/>
										</View>
									</TouchableOpacity>
								))}
							</View>
						</View>
					))
				) : (
					<View style={styles.emptyState}>
						<Ionicons name="business" size={48} color={COLORS.greyLight} />
						<AppText style={styles.emptyText}>No sponsors found</AppText>
						<AppText style={styles.emptySubtext}>
							Try adjusting your search query
						</AppText>
					</View>
				)}

				<View style={styles.becomeSponsorContainer}>
					<AppText style={styles.becomeSponsorText}>
						Interested in becoming a sponsor?
					</AppText>
					<TouchableOpacity style={styles.contactButton}>
						<AppText style={styles.contactButtonText}>Contact Us</AppText>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};

const { width } = Dimensions.get('window');
const sponsorCardWidth = width / 2 - 24;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollViewContainer: {
		paddingTop: 16,
		paddingBottom: 40,
	},
	header: {
		fontSize: 14,
		color: COLORS.grey,
		padding: 16,
		paddingTop: Platform.OS === 'web' ? 0 : 8,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.greyLight,
	},
	searchContainer: {
		marginHorizontal: 16,
		marginBottom: 16,
	},
	tierContainer: {
		marginBottom: 24,
	},
	tierHeader: {
		paddingVertical: 12,
		paddingHorizontal: 24,
		marginBottom: 16,
		borderTopRightRadius: 12,
		borderBottomRightRadius: 12,
		width: '80%',
	},
	platinumHeader: {
		backgroundColor: '#ebebeb',
	},
	goldHeader: {
		backgroundColor: '#ebebeb',
	},
	silverHeader: {
		backgroundColor: '#ebebeb',
	},
	tierTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.primary,
	},
	sponsorsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
	},
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
	becomeSponsorContainer: {
		backgroundColor: COLORS.white,
		borderRadius: 12,
		padding: 24,
		marginHorizontal: 16,
		marginTop: 16,
		alignItems: 'center',
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	becomeSponsorText: {
		fontSize: 16,
		color: COLORS.dark,
		textAlign: 'center',
		marginBottom: 16,
	},
	contactButton: {
		backgroundColor: COLORS.primary,
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 24,
	},
	contactButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: COLORS.white,
	},
	emptyState: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 40,
		marginTop: 40,
	},
	emptyText: {
		fontSize: 18,
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

const sponsorTiers = [
	{
		title: 'Platinum Sponsors',
		level: 'platinum',
		sponsors: [
			{
				name: 'TechCorp',
				logo: require('@/assets/sponsors/event-poster.png'),
				url: 'https://techcorp.com',
				description: 'Leading technology solutions provider',
			},
			{
				name: 'GlobalBank',
				logo: require('@/assets/sponsors/event-poster.png'),
				url: 'https://globalbank.com',
				description: 'Worldwide financial services',
			},
		],
	},
	{
		title: 'Gold Sponsors',
		level: 'gold',
		sponsors: [
			{
				name: 'InnovateX',
				logo: require('@/assets/sponsors/event-poster.png'),
				url: 'https://innovatex.io',
				description: 'Driving innovation forward',
			},
		],
	},
	{
		title: 'Silver Sponsors',
		level: 'silver',
		sponsors: [
			{
				name: 'GreenEnergy',
				logo: require('@/assets/sponsors/event-poster.png'),
				url: 'https://greenenergy.org',
				description: 'Sustainable energy solutions',
			},
			{
				name: 'DataSystems',
				logo: require('@/assets/sponsors/event-poster.png'),
				url: 'https://datasystems.ai',
				description: 'AI-powered data analytics',
			},
			{
				name: 'FutureTech',
				logo: require('@/assets/sponsors/event-poster.png'),
				url: 'https://futuretech.dev',
				description: "Building tomorrow's technology",
			},
		],
	},
];

export default SponsorsScreen;
