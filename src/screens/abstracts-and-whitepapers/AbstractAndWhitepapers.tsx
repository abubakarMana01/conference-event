import {
	StyleSheet,
	View,
	FlatList,
	Image,
	Pressable,
	Linking,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { AppText, SearchBar } from '@/components';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export interface Abstract {
	id: string;
	title: string;
	authors: string;
	category: string;
	date: string;
	thumbnail: any;
	pdfUrl: string;
	summary: string;
}

const AbstractsAndWhitepapers = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');

	const categories = [
		'All',
		'Artificial Intelligence',
		'Blockchain',
		'Quantum Computing',
		'Sustainability',
	];

	const filteredAbstracts = ABSTRACTS_AND_WHITEPAPERS.filter((abstract) => {
		const matchesSearch =
			abstract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			abstract.authors.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory =
			selectedCategory === 'All' || abstract.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const handleOpenPdf = (url: string) => {
		Linking.openURL(url).catch((err) =>
			console.error('Failed to open PDF:', err)
		);
	};

	const renderItem = ({ item }: { item: Abstract }) => (
		<Pressable
			style={styles.abstractCard}
			onPress={() => handleOpenPdf(item.pdfUrl)}
		>
			<Image source={item.thumbnail} style={styles.abstractImage} />
			<LinearGradient
				colors={['rgba(0,0,0,0.7)', 'transparent']}
				style={styles.imageGradient}
			/>
			<View style={styles.abstractContent}>
				<View style={styles.categoryTag}>
					<AppText style={styles.categoryText}>{item.category}</AppText>
				</View>
				<AppText style={styles.abstractTitle}>{item.title}</AppText>
				<AppText style={styles.abstractAuthors}>{item.authors}</AppText>
				<AppText style={styles.abstractSummary}>{item.summary}</AppText>
				<View style={styles.abstractFooter}>
					<AppText style={styles.abstractDate}>{item.date}</AppText>
					<View style={styles.downloadButton}>
						<AppText style={styles.downloadText}>View PDF</AppText>
						<Ionicons name="download" size={16} color={COLORS.white} />
					</View>
				</View>
			</View>
		</Pressable>
	);

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

				{/* Category Filter */}
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

				{/* Abstracts List */}
				{filteredAbstracts.length > 0 ? (
					<FlatList
						data={filteredAbstracts}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						scrollEnabled={false}
						contentContainerStyle={styles.listContent}
						ItemSeparatorComponent={() => <View style={styles.separator} />}
					/>
				) : (
					<View style={styles.emptyState}>
						<Ionicons name="document-text" size={48} color={COLORS.greyLight} />
						<AppText style={styles.emptyText}>No abstracts found</AppText>
						<AppText style={styles.emptySubtext}>
							Try adjusting your search or filter criteria
						</AppText>
					</View>
				)}
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
	abstractCard: {
		backgroundColor: COLORS.white,
		borderRadius: 12,
		overflow: 'hidden',
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},
	abstractImage: {
		width: '100%',
		height: 160,
	},
	imageGradient: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: '30%',
	},
	abstractContent: {
		padding: 16,
	},
	categoryTag: {
		alignSelf: 'flex-start',
		backgroundColor: 'rgba(74, 144, 226, 0.1)',
		borderRadius: 4,
		paddingHorizontal: 8,
		paddingVertical: 4,
		marginBottom: 12,
	},
	categoryText: {
		fontSize: 12,
		fontWeight: '500',
		color: COLORS.primary,
	},
	abstractTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.dark,
		marginBottom: 8,
		lineHeight: 24,
	},
	abstractAuthors: {
		fontSize: 14,
		color: COLORS.primary,
		marginBottom: 12,
		fontStyle: 'italic',
	},
	abstractSummary: {
		fontSize: 14,
		color: COLORS.greyDark,
		lineHeight: 20,
		marginBottom: 16,
	},
	abstractFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	abstractDate: {
		fontSize: 12,
		color: COLORS.grey,
	},
	downloadButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.primary,
		borderRadius: 6,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	downloadText: {
		fontSize: 14,
		color: COLORS.white,
		marginRight: 8,
		fontWeight: '500',
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
		color: COLORS.greyLight,
		marginTop: 8,
		textAlign: 'center',
	},
});

export default AbstractsAndWhitepapers;

const ABSTRACTS_AND_WHITEPAPERS: Abstract[] = [
	{
		id: '1',
		title: 'Machine Learning in Healthcare',
		authors: 'Dr. Sarah Chen, Prof. James Wilson',
		category: 'Artificial Intelligence',
		date: '2023-10-15',
		thumbnail: require('@/assets/event-poster.png'),
		pdfUrl: 'https://example.com/abstract1.pdf',
		summary:
			'Exploring the applications of ML algorithms in diagnostic medicine and patient care optimization.',
	},
	{
		id: '2',
		title: 'Blockchain for Supply Chain',
		authors: 'Dr. Michael Brown, Dr. Emily Zhang',
		category: 'Blockchain',
		date: '2023-09-28',
		thumbnail: require('@/assets/event-poster.png'),
		pdfUrl: 'https://example.com/abstract2.pdf',
		summary:
			'Novel approaches to supply chain transparency using distributed ledger technology.',
	},
	{
		id: '3',
		title: 'Quantum Computing Breakthroughs',
		authors: 'Prof. Robert Johnson, Dr. Lisa Wang',
		category: 'Quantum Computing',
		date: '2023-11-02',
		thumbnail: require('@/assets/event-poster.png'),
		pdfUrl: 'https://example.com/abstract3.pdf',
		summary: 'Recent advances in qubit stability and error correction methods.',
	},
	{
		id: '4',
		title: 'Sustainable Urban Development',
		authors: 'Dr. Emma Davis, Prof. Carlos Mendez',
		category: 'Sustainability',
		date: '2023-08-17',
		thumbnail: require('@/assets/event-poster.png'),
		pdfUrl: 'https://example.com/abstract4.pdf',
		summary: 'Integrated approaches to creating eco-friendly smart cities.',
	},
];
