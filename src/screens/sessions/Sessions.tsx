import {
	ActivityIndicator,
	FlatList,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React from 'react';
import { AppText, Screen } from '@/components';
import { fetchSessions } from '@/services/sessions.service';
import { useQuery } from '@tanstack/react-query';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import SessionItem from './components/SessionItem';

const Sessions = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['sessions'],
		queryFn: () => fetchSessions({ pageParam: 1 }),
	});

	if (isLoading) {
		return (
			<View style={styles.loading}>
				<ActivityIndicator size="large" color={COLORS.primary} />
			</View>
		);
	}

	if (isError) {
		return (
			<View style={styles.emptyState}>
				<Ionicons name="alert-circle" size={48} color="red" />
				<AppText style={styles.emptyText}>Failed to load sessions</AppText>
			</View>
		);
	}

	return (
		<FlatList
			contentContainerStyle={{ padding: 16 }}
			keyExtractor={(item) => item.id.toString()}
			data={data?.data}
			renderItem={({ item }) => <SessionItem session={item} />}
			ListEmptyComponent={() => (
				<View style={styles.emptyState}>
					<Ionicons name="radio" size={48} color={COLORS.greyLight} />
					<AppText style={styles.emptyText}>No session found</AppText>
				</View>
			)}
			ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
		/>
	);
};

export default Sessions;

const styles = StyleSheet.create({
	loading: {
		paddingVertical: 32,
		justifyContent: 'center',
		alignItems: 'center',
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
