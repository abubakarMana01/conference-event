import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { IAbstract } from '@/types';
import { COLORS } from '@/constants/colors';

interface Props {
	abstract: IAbstract;
}

const Abstract = ({ abstract }: Props) => {
	const handleOpenPdf = (url: string) => {
		if (url) {
			const fullUrl = url.startsWith('http')
				? url
				: `${process.env.EXPO_PUBLIC_API_URL}${url}`;
			Linking.openURL(fullUrl).catch((err) =>
				console.error('Failed to open PDF:', err)
			);
		}
	};

	return (
		<Pressable
			style={styles.abstractCard}
			onPress={() => handleOpenPdf(abstract.abstract?.url)}
		>
			<Image
				source={require('@/assets/event-poster.png')}
				style={styles.abstractImage}
			/>
			<LinearGradient
				colors={['rgba(0,0,0,0.7)', 'transparent']}
				style={styles.imageGradient}
			/>
			<View style={styles.abstractContent}>
				<View style={styles.categoryTag}>
					<AppText style={styles.categoryText}>
						{abstract.category || 'Uncategorized'}
					</AppText>
				</View>
				<AppText style={styles.abstractTitle} numberOfLines={2}>
					{abstract.title}
				</AppText>
				<AppText style={styles.abstractAuthors}>{abstract.name}</AppText>
				<AppText style={styles.abstractSummary}>
					Document: {abstract.abstract?.name || 'N/A'}
				</AppText>
				<View style={styles.abstractFooter}>
					<AppText style={styles.abstractDate}>
						{new Date(abstract.createdAt).toDateString()}
					</AppText>
					<View style={styles.downloadButton}>
						<AppText style={styles.downloadText}>View PDF</AppText>
						<Ionicons name="download" size={16} color={COLORS.white} />
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default Abstract;

const styles = StyleSheet.create({
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
});
