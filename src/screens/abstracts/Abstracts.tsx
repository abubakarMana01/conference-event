import {
	View,
	FlatList,
	Pressable,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AppText, SearchBar } from '@/components';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { fetchAbstracts } from '@/services/abstracts.service';
import Abstract from './components/Abstract';

const Abstracts = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useInfiniteQuery({
		queryKey: ['abstracts'],
		queryFn: fetchAbstracts,
		getNextPageParam: (lastPage) => {
			const nextPage = lastPage.meta.pagination.page + 1;
			return nextPage <= lastPage.meta.pagination.pageCount
				? nextPage
				: undefined;
		},
		initialPageParam: 1,
	});

	const categories = useMemo(() => {
		const uniqueCategories = new Set<string>();
		data?.pages.forEach((page) => {
			page.data.forEach((item) => {
				if (item.category) {
					uniqueCategories.add(item.category);
				}
			});
		});
		return ['All', ...Array.from(uniqueCategories)];
	}, [data]);

	const allAbstracts = useMemo(() => {
		const flat = data?.pages.flatMap((page) => page.data) || [];
		return flat.filter((abstract) => {
			const matchesSearch =
				abstract.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				abstract.name?.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory =
				selectedCategory === 'All' || abstract.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}, [data, searchQuery, selectedCategory]);

	if (isLoading) {
		return (
			<ActivityIndicator
				size="large"
				color={COLORS.primary}
				style={{ marginTop: 40 }}
			/>
		);
	}

	if (isError) {
		return (
			<View style={styles.emptyState}>
				<Ionicons name="alert-circle-outline" size={48} color="red" />
				<AppText style={styles.emptyText}>Error loading abstracts</AppText>
				<AppText style={styles.emptySubtext}>{(error as any).message}</AppText>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={{ margin: 16, marginBottom: 12 }}>
					<SearchBar
						{...{
							searchQuery,
							setSearchQuery,
							placeholder: 'Search Abstracts...',
						}}
					/>
				</View>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.categoriesContainer}
				>
					{categories.map((category) => (
						<Pressable
							key={category}
							style={[
								styles.categoryButton,
								selectedCategory === category && styles.selectedCategoryButton,
							]}
							onPress={() => setSelectedCategory(category)}
						>
							<AppText
								style={[
									styles.categoryButtonText,
									selectedCategory === category && styles.selectedCategoryText,
								]}
							>
								{category}
							</AppText>
						</Pressable>
					))}
				</ScrollView>

				<FlatList
					data={allAbstracts}
					renderItem={({ item }) => <Abstract abstract={item} />}
					keyExtractor={(item) => String(item.id)}
					scrollEnabled={false}
					contentContainerStyle={styles.listContent}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
					onEndReached={() => hasNextPage && fetchNextPage()}
					onEndReachedThreshold={0.8}
					ListFooterComponent={
						isFetchingNextPage ? (
							<ActivityIndicator
								size="large"
								color={COLORS.primary}
								style={{ marginVertical: 20 }}
							/>
						) : null
					}
					ListEmptyComponent={
						<View style={styles.emptyState}>
							<Ionicons
								name="document-text"
								size={48}
								color={COLORS.greyLight}
							/>
							<AppText style={styles.emptyText}>No abstracts found</AppText>
							<AppText style={styles.emptySubtext}>
								Try adjusting your search or filter criteria
							</AppText>
						</View>
					}
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 120,
		zIndex: 10,
	},
	headerGradient: {
		flex: 1,
		paddingTop: 60,
		paddingHorizontal: 24,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: COLORS.white,
	},
	scrollView: {
		flex: 1,
	},
	categoriesContainer: {
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	categoryButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: COLORS.greyLightPlus,
		marginRight: 8,
	},
	selectedCategoryButton: {
		backgroundColor: COLORS.primary,
	},
	categoryButtonText: {
		fontSize: 14,
		color: COLORS.greyDark,
	},
	selectedCategoryText: {
		color: COLORS.white,
		fontWeight: '500',
	},
	listContent: {
		padding: 16,
		paddingBottom: 32,
	},
	separator: {
		height: 16,
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
		color: COLORS.grey2,
		marginTop: 8,
		textAlign: 'center',
	},
});

export default Abstracts;
