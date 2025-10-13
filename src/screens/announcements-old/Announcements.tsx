import {
	StyleSheet,
	View,
	FlatList,
	RefreshControl,
	Platform,
	ActivityIndicator,
} from 'react-native';
import React, { useMemo } from 'react';
import { AppText } from '@/components';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAnnouncements } from '@/services/announcements.service';
import AnnouncementItem from './components/AnnouncementItem';

const AnnouncementsScreen = () => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		refetch,
		error,
	} = useInfiniteQuery({
		queryKey: ['announcements'],
		queryFn: fetchAnnouncements,
		getNextPageParam: (lastPage) => {
			const { page, pageCount } = lastPage.meta.pagination;
			return page < pageCount ? page + 1 : undefined;
		},
		initialPageParam: 1,
	});

	const announcements_data = useMemo(() => {
		return data?.pages.flatMap((page) => page.data) || [];
	}, [data]);

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
				<Ionicons name="alert-circle" size={48} color="red" />
				<AppText style={styles.emptyText}>Failed to load announcements</AppText>
				<AppText style={styles.emptySubtext}>{(error as any).message}</AppText>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<AppText style={styles.headerSubtitle}>
					Stay updated with the latest announcements
				</AppText>
			</View>

			<FlatList
				data={announcements_data}
				renderItem={({ item }) => <AnnouncementItem announcement={item} />}
				keyExtractor={(item) => String(item.id)}
				contentContainerStyle={styles.listContent}
				refreshControl={
					<RefreshControl
						refreshing={isLoading}
						onRefresh={refetch}
						colors={[COLORS.primary]}
						tintColor={COLORS.primary}
					/>
				}
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
						<Ionicons name="newspaper" size={48} color={COLORS.greyLight} />
						<AppText style={styles.emptyText}>No news updates yet</AppText>
						<AppText style={styles.emptySubtext}>
							Check back later for event announcements
						</AppText>
					</View>
				}
			/>
		</View>
	);
};

export default AnnouncementsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		padding: 16,
		paddingTop: Platform.OS === 'web' ? 0 : 8,
		backgroundColor: COLORS.white,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.greyLight,
	},
	headerSubtitle: {
		fontSize: 14,
		color: COLORS.grey,
	},
	listContent: {
		padding: 16,
		paddingBottom: 32,
	},
	emptyState: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 40,
	},
	emptyText: {
		fontSize: 16,
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
