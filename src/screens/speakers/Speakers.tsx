import {
	FlatList,
	StyleSheet,
	View,
	Platform,
	ActivityIndicator,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AppText, Screen, SearchBar } from '@/components';
import Speaker from './components/Speaker';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { fetchSpeakers } from '@/services/speakers.service';

const Speakers = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const {
		data: speakers = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['speakers'],
		queryFn: fetchSpeakers,
		staleTime: 1000 * 60 * 5, // cache for 5 minutes
	});

	const filteredSpeakers = useMemo(() => {
		return speakers.filter((speaker) => {
			const query = searchQuery.toLowerCase();
			return (
				speaker.fullname.toLowerCase().includes(query) ||
				speaker.title.toLowerCase().includes(query)
			);
		});
	}, [searchQuery, speakers]);

	if (isLoading) {
		return (
			<Screen noPadding>
				<ActivityIndicator
					size="large"
					color={COLORS.primary}
					style={{ marginTop: 40 }}
				/>
			</Screen>
		);
	}

	if (isError) {
		return (
			<Screen noPadding>
				<View style={styles.emptyState}>
					<Ionicons name="alert-circle-outline" size={48} color="red" />
					<AppText style={styles.emptyText}>Failed to load</AppText>
					<AppText style={styles.emptySubtext}>{error.message}</AppText>
				</View>
			</Screen>
		);
	}

	return (
		<Screen noPadding>
			<AppText style={styles.header}>
				Learn from industry leaders and innovators
			</AppText>

			<FlatList
				contentContainerStyle={styles.flatlist}
				numColumns={2}
				data={filteredSpeakers}
				columnWrapperStyle={styles.columnWrapperStyle}
				renderItem={({ item }) => <Speaker speaker={item} />}
				keyExtractor={(item) => item.documentId}
				ListFooterComponent={<View style={styles.footer} />}
				ListHeaderComponent={
					<SearchBar
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						placeholder="Search speakers, organizations, topics..."
					/>
				}
				ListHeaderComponentStyle={{ marginBottom: 16 }}
				ListEmptyComponent={
					<View style={styles.emptyState}>
						<Ionicons name="people" size={48} color={COLORS.greyLight} />
						<AppText style={styles.emptyText}>No speakers found</AppText>
						<AppText style={styles.emptySubtext}>
							Try adjusting your search or filter
						</AppText>
					</View>
				}
			/>
		</Screen>
	);
};

const styles = StyleSheet.create({
	header: {
		fontSize: 14,
		color: COLORS.grey,
		padding: 16,
		paddingTop: Platform.OS === 'web' ? 0 : 8,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.greyLight,
	},
	flatlist: {
		padding: 16,
		paddingBottom: 32,
	},
	columnWrapperStyle: {
		justifyContent: 'space-between',
		marginBottom: 16,
	},
	footer: {
		height: 40,
	},
	emptyState: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 40,
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

export default Speakers;

// import { FlatList, StyleSheet, View, Platform } from 'react-native';
// import React, { useState, useMemo } from 'react';
// import { AppText, Screen, SearchBar } from '@/components';
// import Speaker from './components/Speaker';
// import { COLORS } from '@/constants/colors';
// import { Ionicons } from '@expo/vector-icons';

// export interface ISpeaker {
// 	id: string;
// 	name: string;
// 	position: string;
// 	organization: string;
// 	image: any;
// 	topics: string[];
// 	isFeatured: boolean;
// }

// const Speakers = () => {
// 	const [searchQuery, setSearchQuery] = useState('');

// 	// Filter speakers based on search query
// 	const filteredSpeakers = useMemo(() => {
// 		return speakerData.filter((speaker) => {
// 			const matchesSearch =
// 				speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// 				speaker.organization
// 					.toLowerCase()
// 					.includes(searchQuery.toLowerCase()) ||
// 				speaker.topics.some((topic) =>
// 					topic.toLowerCase().includes(searchQuery.toLowerCase())
// 				);

// 			return matchesSearch;
// 		});
// 	}, [searchQuery]);

// 	return (
// 		<Screen noPadding>
// 			<AppText style={styles.header}>
// 				Learn from industry leaders and innovators
// 			</AppText>

// 			<FlatList
// 				contentContainerStyle={styles.flatlist}
// 				numColumns={2}
// 				data={filteredSpeakers}
// 				columnWrapperStyle={styles.columnWrapperStyle}
// 				renderItem={({ item }) => <Speaker speaker={item} />}
// 				keyExtractor={(item) => item.id}
// 				ListFooterComponent={<View style={styles.footer} />}
// 				ListHeaderComponent={
// 					<SearchBar
// 						searchQuery={searchQuery}
// 						setSearchQuery={setSearchQuery}
// 						placeholder="Search speakers, organizations, topics..."
// 					/>
// 				}
// 				ListHeaderComponentStyle={{ marginBottom: 16 }}
// 				ListEmptyComponent={
// 					<View style={styles.emptyState}>
// 						<Ionicons name="people" size={48} color={COLORS.greyLight} />
// 						<AppText style={styles.emptyText}>No speakers found</AppText>
// 						<AppText style={styles.emptySubtext}>
// 							Try adjusting your search or filter
// 						</AppText>
// 					</View>
// 				}
// 			/>
// 		</Screen>
// 	);
// };

// const styles = StyleSheet.create({
// 	header: {
// 		fontSize: 14,
// 		color: COLORS.grey,
// 		padding: 16,
// 		paddingTop: Platform.OS === 'web' ? 0 : 8,
// 		borderBottomWidth: 1,
// 		borderBottomColor: COLORS.greyLight,
// 	},
// 	searchContainer: {
// 		paddingHorizontal: 16,
// 		paddingTop: 12,
// 		paddingBottom: 8,
// 		backgroundColor: COLORS.white,
// 	},
// 	flatlist: {
// 		padding: 16,
// 		paddingBottom: 32,
// 	},
// 	columnWrapperStyle: {
// 		justifyContent: 'space-between',
// 		marginBottom: 16,
// 	},
// 	footer: {
// 		height: 40,
// 	},
// 	emptyState: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		padding: 40,
// 	},
// 	emptyText: {
// 		fontSize: 18,
// 		color: COLORS.grey,
// 		marginTop: 16,
// 		fontWeight: '500',
// 	},
// 	emptySubtext: {
// 		fontSize: 14,
// 		color: COLORS.greyLight,
// 		marginTop: 8,
// 		textAlign: 'center',
// 	},
// });

// export default Speakers;

// const speakerData: ISpeaker[] = [
// 	{
// 		id: '1',
// 		name: 'Dr. Sarah Chen',
// 		position: 'AI Research Director',
// 		organization: 'Tech Innovations Inc.',
// 		image: require('@/assets/event-poster.png'),
// 		topics: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks'],
// 		isFeatured: true,
// 	},
// 	{
// 		id: '2',
// 		name: 'Dr. Sarah Chen',
// 		position: 'AI Research Director',
// 		organization: 'Tech Innovations Inc.',
// 		image: require('@/assets/event-poster.png'),
// 		topics: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks'],
// 		isFeatured: false,
// 	},
// 	{
// 		id: '3',
// 		name: 'Dr. Sarah Chen',
// 		position: 'AI Research Director',
// 		organization: 'Tech Innovations Inc.',
// 		image: require('@/assets/event-poster.png'),
// 		topics: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks'],
// 		isFeatured: true,
// 	},
// ];
