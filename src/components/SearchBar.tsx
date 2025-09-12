import {
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

interface Props {
	searchQuery: string;
	setSearchQuery: Dispatch<SetStateAction<Props['searchQuery']>>;
	placeholder?: string;
}

const SearchBar = ({ searchQuery, setSearchQuery, placeholder }: Props) => {
	return (
		<View style={styles.searchContainer}>
			<Ionicons
				name="search"
				size={20}
				color={COLORS.grey}
				style={styles.searchIcon}
			/>
			<TextInput
				style={styles.searchInput}
				placeholder={placeholder || 'Search...'}
				placeholderTextColor={COLORS.grey}
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>
			{searchQuery.length > 0 && (
				<TouchableOpacity
					onPress={() => setSearchQuery('')}
					style={styles.clearSearch}
				>
					<Ionicons name="close" size={20} color={COLORS.grey} />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.white,
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: Platform.select({
			ios: 12,
			android: 4,
		}),
		borderWidth: 1,
		borderColor: COLORS.greyLight,
		// shadowColor: COLORS.black,
		// shadowOffset: { width: 0, height: 2 },
		// shadowOpacity: 0.1,
		// shadowRadius: 4,
		// elevation: 2,
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		fontSize: 14,
		color: COLORS.dark,
	},
	clearSearch: {},
});
