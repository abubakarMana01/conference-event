import {
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity,
	Platform,
	ActivityIndicator,
	RefreshControl,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { AppText, SearchBar } from '@/components';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSponsors } from '@/services/sponsors.service';
import Sponsor from './components/Sponsor';
import { ISponsor } from '@/types';

const SponsorsScreen = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		refetch,
	} = useInfiniteQuery({
		queryKey: ['sponsors'],
		queryFn: fetchSponsors,
		getNextPageParam: (lastPage) => {
			const { page, pageCount } = lastPage.meta.pagination;
			return page < pageCount ? page + 1 : undefined;
		},
		initialPageParam: 1,
	});

	const sponsors = useMemo(() => {
		return data?.pages.flatMap((page) => page.data) || [];
	}, [data]);

	// Group sponsors by category
	const groupedSponsors = useMemo(() => {
		const groups: Record<string, any[]> = {};
		for (const sponsor of sponsors) {
			const category = sponsor.category.toLowerCase(); // e.g. 'platinum'
			if (!groups[category]) groups[category] = [];
			groups[category].push(sponsor);
		}
		return groups;
	}, [sponsors]);

	const filteredSponsorTiers = Object.entries(groupedSponsors)
		.map(([level, sponsors]) => ({
			title: `${level[0].toUpperCase()}${level.slice(1)} Sponsors`,
			level,
			sponsors: sponsors.filter(
				(s) =>
					s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					s.description.toLowerCase().includes(searchQuery.toLowerCase())
			),
		}))
		.filter((tier) => tier.sponsors.length > 0);

	if (isLoading) {
		return (
			<ActivityIndicator
				size="large"
				color={COLORS.primary}
				style={{ marginTop: 40 }}
			/>
		);
	}

	return (
		<View style={styles.container}>
			<AppText style={styles.header}>
				These organizations help make our event possible
			</AppText>

			<ScrollView
				contentContainerStyle={styles.scrollViewContainer}
				refreshControl={
					<RefreshControl
						refreshing={isLoading}
						onRefresh={refetch}
						colors={[COLORS.primary]}
						tintColor={COLORS.primary}
					/>
				}
				onScroll={({ nativeEvent }) => {
					const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
					if (
						layoutMeasurement.height + contentOffset.y >=
						contentSize.height - 100
					) {
						hasNextPage && fetchNextPage();
					}
				}}
				scrollEventThrottle={400}
			>
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
					filteredSponsorTiers.map((tier) => (
						<View key={tier.title} style={styles.tierContainer}>
							<View style={[styles.tierHeader, styles[`${tier.level}Header`]]}>
								<AppText style={styles.tierTitle}>{tier.title}</AppText>
							</View>

							<View style={styles.sponsorsContainer}>
								{tier.sponsors.map((sponsor: ISponsor) => (
									<Sponsor sponsor={sponsor} key={sponsor.id} />
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

				{isFetchingNextPage && (
					<ActivityIndicator
						size="large"
						color={COLORS.primary}
						style={{ marginVertical: 20 }}
					/>
				)}
			</ScrollView>
		</View>
	);
};

export default SponsorsScreen;

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

// export default SponsorsScreen;
